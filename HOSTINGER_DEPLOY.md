# 🚀 Guia de Implantação na Hostinger via GitHub (Repositório dyon-90/RGG-2-DOIS)
**Projeto 2+DOIS= Aprender!**

---

## 🔍 Entendendo o Registro da Hostinger (O que aconteceu?)

Você visualizou este log no painel da Hostinger:
```
INFORMAÇÃO: Clonando https://github.com/dyon-90/RGG-2-DOIS.git (branch: main)
INFO: → commit 5227bf8 por dyon-90: "Commit inicial"
INFORMAÇÃO: Clonagem concluída (1,0s)
INFORMAÇÃO: Instalando dependências do Composer
INFORMAÇÃO: Instalação concluída (0,0s)
INFORMAÇÃO: Publicação
INFORMAÇÃO: Publicação concluída (0,3s)
```

### Por que isso aconteceu e como foi corrigido:
1. **O que é o Composer na Hostinger?**
   - O recurso **Avançado > Git** da Hostinger foi desenvolvido originariamente para servidores Apache/LiteSpeed com suporte a PHP. Por padrão, ele verifica se existe um arquivo `composer.json`. Como não existia, ele concluiu a checagem em `0,0s` e publicou os arquivos na pasta do site (`public_html`).
2. **Por que o site não abriu ou deu tela branca no primeiro commit?**
   - Projetos React com Vite e TypeScript precisam dos arquivos estáticos compilados em JavaScript (`dist/assets/*.js`).
   - O arquivo `.gitignore` original estava bloqueando o envio da pasta `dist/` para o GitHub. Logo, o seu repositório no GitHub continha apenas o código-fonte em TypeScript (`.tsx`), que os navegadores não conseguem interpretar sozinhos sem compilação prévia.
   - Não havia um arquivo `index.php` e `.htaccess` na raiz do repositório para instruir o servidor Apache da Hostinger a direcionar o tráfego para a aplicação compilada.

---

## ✅ Correções Realizadas no Código

1. **Remoção do Bloqueio da Pasta `dist/` no `.gitignore`**:
   - Agora a pasta `dist/` e `build/` com todo o JavaScript e CSS otimizados são versionados e enviados para o seu repositório GitHub.
2. **Criação do `index.php` na Raiz**:
   - Como os servidores Web da Hostinger priorizam `index.php` (`DirectoryIndex index.php index.html`), criamos um arquivo `index.php` inteligente que carrega imediatamente a aplicação compilada em `dist/index.html`.
3. **Criação do `.htaccess` na Raiz**:
   - Configurado para o servidor Apache/LiteSpeed da Hostinger, garantindo suporte a módulos ES6 (`.js`, `.mjs`), fontes WOFF2, compressão Gzip e roteamento SPA sem erros 404 ao recarregar a página.
4. **Sincronização de Assets**:
   - Os arquivos de scripts e estilos são mantidos tanto em `dist/assets/` quanto em `assets/` na raiz, garantindo que nenhum arquivo retorne erro 404.
5. **Criação do `composer.json`**:
   - Incluído para que a etapa "Instalando dependências do Composer" da Hostinger seja concluída de forma 100% limpa e válida.

---

## 🚀 Como Atualizar seu Repositório e Publicar na Hostinger

Siga estes 3 passos simples no seu computador para enviar a versão corrigida ao seu GitHub:

### Passo 1: Atualizar os arquivos no seu computador
Se você clonou o repositório na sua máquina:
1. Baixe os arquivos atualizados do projeto (ou copie para a pasta do repositório local).
2. Execute no terminal:
   ```bash
   npm run build
   ```
   *(Isso garantirá que a pasta `dist/` e os arquivos de produção estejam gerados e sincronizados).*

### Passo 2: Enviar as alterações para o GitHub
No terminal da pasta do seu projeto, execute:
```bash
git add .
git commit -m "Correção de compatibilidade Hostinger: inclusão do build de produção, index.php e .htaccess"
git push origin main
```

### Passo 3: Re-publicar no painel da Hostinger
1. Acesse o **hPanel da Hostinger** > seu domínio > menu **Avançado** > **Git**.
2. Na lista de repositórios conectados, ao lado de `https://github.com/dyon-90/RGG-2-DOIS.git`, clique no botão **"Implantar"** (ou **"Deploy"**).
3. O log será executado novamente e, ao terminar a publicação em poucos segundos, **o seu site estará imediatamente no ar e funcionando perfeitamente!**

---

## 💾 Gestão do Banco de Dados no Servidor & Acessos

- **Acessos Administrativos Iniciais**:
  - **Dyon Gomes**: login `dyon.gomes` | senha `@gomes2026`
  - **Terliane Sara**: login `terliane.sara` | senha `@sara2026`
  - **Alberto Deyson**: login `alberto.deyson` | senha `@deyson2026`
- **Cadastro de Novos Administradores**:
  - Pelo painel administrativo, acesse a nova aba **"Administradores"** para cadastrar novos gestores, trocar credenciais ou redefinir senhas.
- **Primeiro Acesso & Limpeza para Produção**:
  - O sistema iniciará imediatamente com dados de teste organizados (2 escolas, turmas, alunos, notas, avisos no mural e calendário letivo).
  - Para começar do zero com as escolas da sua instituição:
    1. Acesse o sistema como **Administrador** (ex: usuário `dyon.gomes` / senha `@gomes2026`).
    2. Vá na aba **Backup & Dados** e clique no botão **"Zerar para Produção"**.
    3. O sistema ficará limpo e pronto para cadastrar as escolas reais (os logins administrativos permanecem salvos).
- **Segurança e Cópia de Segurança**:
  - Regularmente, clique em **Exportar Backup JSON** para salvar uma cópia completa de todos os dados da instituição em seu computador.

---

## 🔒 Recomendações de SSL e Segurança na Hostinger
- Ative o **SSL Grátis** no hPanel da Hostinger em **Segurança** > **SSL**.
- Se desejar forçar HTTPS automaticamente, você pode descomentar as seguintes linhas no arquivo `public/.htaccess`:
  ```apache
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  ```
