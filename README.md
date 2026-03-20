# minha-saude-mobile-unifebe
Projeto de Curricularização da Extensão – UNIFEBE

## Rodar no Mobile (Android e iOS)

### Pré-requisitos
- Node.js instalado
- Android Studio instalado
- SDK Android configurado
- Para iOS: macOS com Xcode instalado

### Primeira execução
```bash
npm install
npm run mobile:sync
```

## Android

### Abrir no Android Studio
```bash
npm run android:open
```

Depois de abrir o projeto no Android Studio, selecione um emulador/dispositivo e execute o app.

### Atualizar app Android após mudanças no React
```bash
npm run android:sync
```

## iOS

### Abrir no Xcode (somente macOS)
```bash
npm run ios:open
```

### Atualizar app iOS após mudanças no React
```bash
npm run ios:sync
```
