# Rama Front

├── node_modules
├── public
│   └── vite.svg
├── src
│   ├── assets
│   │   ├── fonts
│   │   ├── images
│   │   │   ├── corgi-4415649_1280.jpg
│   │   │   ├── dog-3344414_1280.jpg
│   │   │   └── gato01.jpg
│   │   └── styles
│   │       └── global.css
│   ├── components
│   │   ├── common         # Componentes compartidos en toda la app
│   │   │   ├── Header
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Header.module.css
│   │   │   ├── Footer
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Footer.module.css
│   │   │   └── CarouselBanner
│   │   │       ├── CarouselBanner.tsx
│   │   │       └── CarouselBanner.module.css
│   │   └── features      # Componentes específicos por característica
│   │       └── pets      # Componentes específicos para mascotas
│   ├── hooks             # Custom hooks reutilizables
│   ├── services          # Servicios (API, autenticación, etc.)
│   ├── utils             # Funciones de utilidad
│   ├── types             # Definiciones de tipos de TypeScript
│   ├── constants         # Constantes de la aplicación
│   ├── pages
│   │   ├── Home
│   │   │   ├── Home.tsx
│   │   │   └── Home.module.css
│   │   ├── Login
│   │   │   ├── Login.tsx
│   │   │   └── Login.module.css
│   │   ├── Register
│   │   │   ├── Register.tsx
│   │   │   └── Register.module.css
│   │   ├── User
│   │   │   ├── User.tsx
│   │   │   └── User.module.css
│   │   └── AddPet
│   │       ├── AddPet.tsx
│   │       └── AddPet.module.css
│   ├── context           # Contextos de React si los usas
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── vite.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .eslintrc.js
└── README.md