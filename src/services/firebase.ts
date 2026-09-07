import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore, memoryLocalCache, setLogLevel, Firestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Silencia logs internos e avisos transitórios de handshake de conexão do SDK do Firestore
setLogLevel('silent');

// Inicializar Firebase App (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const dbId = firebaseConfig.firestoreDatabaseId || undefined;

// Inicializa o Firestore com cache em memória para prevenir conflitos de IndexedDB em iframes
// e utiliza multiplexação automática de transporte (evitando saturação do limite de conexões HTTP)
let firestoreDb: Firestore;
try {
  firestoreDb = initializeFirestore(
    app,
    {
      localCache: memoryLocalCache(),
    },
    dbId
  );
} catch (e) {
  firestoreDb = dbId ? getFirestore(app, dbId) : getFirestore(app);
}

export const db = firestoreDb;
export { app };

