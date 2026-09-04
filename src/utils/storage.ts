import { AppData, AdminUser } from '../types';
import { defaultAdmins } from '../data/initialData';

const DB_NAME = 'projeto_aprender_db';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';
const STATE_KEY = 'current_data';
const STORAGE_KEY = 'projeto_aprender_db_v1';

// Open IndexedDB database instance
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Deduplicate any collection by unique entity_id
export function deduplicateById<T extends { entity_id: string }>(items: T[] | undefined): T[] {
  if (!items || !Array.isArray(items)) return [];
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    if (item && item.entity_id) {
      if (!seen.has(item.entity_id)) {
        seen.add(item.entity_id);
        result.push(item);
      }
    }
  }
  return result;
}

// Sanitize and deduplicate AppData to ensure uniqueness of keys across the entire application
export function sanitizeAppData(raw: any): AppData {
  if (!raw || typeof raw !== 'object') {
    return {
      schools: [],
      classes: [],
      students: [],
      activities: [],
      grades: [],
      posts: [],
      events: [],
      admins: defaultAdmins
    };
  }

  const rawAdmins = deduplicateById<AdminUser>(raw.admins).filter(
    (a): a is AdminUser => Boolean(a && a.username && a.password && a.name)
  );

  return {
    schools: deduplicateById(raw.schools),
    classes: deduplicateById(raw.classes),
    students: deduplicateById(raw.students),
    activities: deduplicateById(raw.activities),
    grades: deduplicateById(raw.grades),
    posts: deduplicateById(raw.posts),
    events: deduplicateById(raw.events),
    admins: rawAdmins && rawAdmins.length > 0 ? rawAdmins : defaultAdmins
  };
}

// Get stored data from IndexedDB
export async function getFromIndexedDB(): Promise<AppData | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getReq = store.get(STATE_KEY);

      getReq.onsuccess = () => {
        if (getReq.result && typeof getReq.result === 'object') {
          resolve(sanitizeAppData(getReq.result));
        } else {
          resolve(null);
        }
      };

      getReq.onerror = () => {
        console.warn('Could not read from IndexedDB, falling back.');
        resolve(null);
      };
    });
  } catch (err) {
    console.warn('IndexedDB read error:', err);
    return null;
  }
}

// Save stored data to IndexedDB
export async function saveToIndexedDB(data: AppData): Promise<boolean> {
  try {
    const sanitized = sanitizeAppData(data);
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const putReq = store.put(sanitized, STATE_KEY);

      putReq.onsuccess = () => resolve(true);
      putReq.onerror = () => {
        console.error('Failed to write to IndexedDB:', putReq.error);
        resolve(false);
      };
    });
  } catch (err) {
    console.error('IndexedDB save error:', err);
    return false;
  }
}

// Safely save to localStorage with quota-exceeded fallback handling
export function saveToLocalStorage(data: AppData): void {
  try {
    const sanitized = sanitizeAppData(data);
    const serialized = JSON.stringify(sanitized);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e: any) {
    // If quota exceeded, attempt to save a trimmed version without large base64 media
    // IndexedDB will maintain the full fidelity state
    console.warn('localStorage quota exceeded or write failed; attempting light-cache fallback.', e?.message || e);
    try {
      const sanitized = sanitizeAppData(data);
      const lightData: AppData = {
        ...sanitized,
        posts: sanitized.posts.map(p => {
          // If the post has a heavy base64 image (>10KB), omit it from localStorage
          if (p.post_image && p.post_image.length > 10000) {
            return { ...p, post_image: undefined };
          }
          return p;
        })
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lightData));
    } catch {
      // Even if localStorage fails completely, IndexedDB has the full copy
      console.warn('localStorage disabled or completely full. Persisting solely via IndexedDB.');
    }
  }
}

// Load from either IndexedDB or localStorage
export function loadFromLocalStorage(): AppData | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && parsed.schools && parsed.classes) {
        return sanitizeAppData(parsed);
      }
    }
  } catch (e) {
    console.warn('Failed to parse from localStorage:', e);
  }
  return null;
}

// Compress and scale down image file before saving in data context
export function compressImageFile(file: File, maxDimension = 1000, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (!file.type.startsWith('image/')) {
      reject(new Error('O arquivo selecionado não é uma imagem válida.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Erro ao ler o arquivo de imagem.'));
    reader.onload = (readerEvent) => {
      const img = new window.Image();
      img.onerror = () => reject(new Error('Erro ao processar a imagem.'));
      img.onload = () => {
        try {
          let { width, height } = img;

          // Scale down if larger than maxDimension
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            // Fallback to original data URL if canvas 2D context fails
            resolve(readerEvent.target?.result as string);
            return;
          }

          // Enable high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Use WebP if supported or JPEG
          let outputType = 'image/jpeg';
          if (file.type === 'image/webp' || file.type === 'image/png') {
            outputType = 'image/webp';
          }

          const compressedDataUrl = canvas.toDataURL(outputType, quality);
          resolve(compressedDataUrl);
        } catch {
          // Fallback to reader result if canvas processing fails
          resolve(readerEvent.target?.result as string);
        }
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
