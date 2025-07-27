# kwy's technical blog : Spring Boot + React (Vite)

Spring Boot와 React Vite를 이용한 기술 블로그 사이드 프로젝트 입니다.

- 🧩 **Backend**: Spring Boot (Java) / IDE: IntelliJ Community
- ⚛️ **Frontend**: React + Vite (TypeScript) / IDE: Visual Studio Code

## 📁 프로젝트 구조
```plaintext
technical-blog/  
├── backend/           # Spring Boot (Java)
│   ├── src/  
│   ├── build.gradle  
│   ├── settings.gradle  
│   └── ...  
├── frontend/          # React + Vite (TypeScript)
│   ├── src/  
│   ├── public/  
│   ├── package.json  
│   ├── vite.config.ts  
│   └── ...  
├── .gitignore  
└── README.md  
```

## 설치한 패키지들
```bash
yarn add axios
yarn add -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser

yarn add tailwindcss @tailwindcss/vite
yarn add -D @types/node
npx shadcn@latest init

yarn add react-router-dom
```

## 설치한 shadcn 컴포넌트
```bash
npx shadcn@latest add button
npx shadcn@latest add navigation-menu
```

## 개발 실행 환경
```bash
yarn install
yarn dev
```
