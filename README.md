# Minha Saúde Mobile UNIFEBE

Aplicativo móvel desenvolvido como entrega de Curricularização da Extensão na UNIFEBE. O projeto organiza o versionamento do código, aplica boas práticas de desenvolvimento e entrega uma base inicial pronta para avanço em Android, iOS e Web.

## 📌 Visão Geral
Este repositório contém:
- Aplicação mobile híbrida com Capacitor + React + Vite
- Backend leve em `server/` com Express
- Integração Android e iOS usando Capacitor
- Estrutura inicial do projeto para iniciar o desenvolvimento com boas práticas

## 🚀 Tecnologias principais
- React 19
- Vite
- Capacitor
- TypeScript
- Tailwind CSS
- Express
- Node.js

## 📁 Estrutura do projeto

- `android/` — código nativo e configuração do projeto Android
- `ios/` — código nativo e configuração do projeto iOS
- `server/` — backend Express, banco de dados e rotas de API
  - `server/index.ts` — servidor principal
  - `server/db.ts` — configuração de banco de dados
- `src/` — aplicação React/Vite
  - `src/App.tsx` — componente principal
  - `src/main.tsx` — ponto de entrada da aplicação
  - `src/index.css` — estilos globais
  - `src/data/healthData.ts` — dados de exemplo
  - `src/types.ts` — tipagens TypeScript
- `capacitor.config.ts` — configuração do Capacitor
- `package.json` — dependências e scripts do projeto
- `tsconfig.json` — configuração TypeScript
- `vite.config.ts` — configuração Vite

## ⚙️ Configuração e execução
### Instalar dependências
```bash
npm install
```

### Sincronizar o projeto mobile
```bash
npm run mobile:sync
```

### Rodar em desenvolvimento (web)
```bash
npm run dev
```

## 📱 Android
### Abrir no Android Studio
```bash
npm run android:open
```

### Atualizar app Android após mudanças no React
```bash
npm run android:sync
```

## 🍎 iOS
### Abrir no Xcode (somente macOS)
```bash
npm run ios:open
```

### Atualizar app iOS após mudanças no React
```bash
npm run ios:sync
```

## 🧪 Scripts úteis
- `npm run dev` — inicia o servidor de desenvolvimento Vite
- `npm run build` — gera a build do projeto
- `npm run preview` — pré-visualiza a build gerada
- `npm run mobile:sync` — constrói e sincroniza os projetos Capacitor
- `npm run android:sync` — build + sincronização Android
- `npm run ios:sync` — build + sincronização iOS
- `npm run android:open` — abre o projeto Android no Android Studio
- `npm run ios:open` — abre o projeto iOS no Xcode
- `npm run lint` — validações TypeScript


## 👥 Contribuidores
- [https://github.com/CauaDePaula](https://github.com/CauaDePaula)
- [https://github.com/LeskeLense](https://github.com/LeskeLense)
- [https://github.com/Cascaum](https://github.com/Cascaum)
- [https://github.com/CristianoMafraJunior](https://github.com/CristianoMafraJunior)

## 📌 Observações
- Para desenvolver para iOS, é necessário usar macOS com Xcode instalado.
- Para Android, configure o Android Studio e o SDK adequadamente.
- Mantenha o `npm run build` atualizado antes de sincronizar o Capacitor.
