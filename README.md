# EdMoney Frontend

EdMoney es una aplicación web moderna para la gestión de finanzas personales, construida con Next.js y React. Lo que hace especial a EdMoney es su integración con Inteligencia Artificial para facilitar el registro de transacciones. Los usuarios pueden:

- 🎙️ Dictar sus transacciones usando reconocimiento de voz (Whisper API)
- 💬 Escribir sus transacciones en lenguaje natural

La IA procesa el texto o audio y lo convierte en una transacción estructurada, haciendo el registro de gastos más rápido y natural.

## Características Principales

- 📊 Dashboard interactivo con resumen de gastos e ingresos
- 💰 Registro y seguimiento de transacciones
- 📈 Visualización de gastos por categorías
- 📅 Seguimiento mensual de gastos
- 🔐 Autenticación de usuarios
- 🎯 Gestión de presupuestos
- 📱 Diseño responsive y moderno
- 🤖 Asistente IA para registro de transacciones
- 🎙️ Reconocimiento de voz para dictar transacciones

## Prerequisites

This project uses [Volta](https://volta.sh) to manage Node.js and Yarn versions. Make sure you have Volta installed:

```bash
# Install Volta
curl https://get.volta.sh | bash

# Restart your terminal or run
source ~/.bashrc  # or source ~/.zshrc if you use zsh
```

## Getting Started

First, install dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Estructura del Proyecto

```
src/
├── app/                    # Rutas y páginas de la aplicación
│   ├── dashboard/         # Panel principal
│   ├── login/            # Autenticación
│   ├── registro/         # Registro de usuarios
│   └── transacciones/    # Gestión de transacciones
├── components/            # Componentes reutilizables
│   ├── auth/            # Componentes de autenticación
│   ├── dashboard/       # Componentes del panel
│   ├── layout/          # Componentes de estructura
│   └── ui/              # Componentes de interfaz
├── services/             # Servicios y llamadas API
├── types/               # Definiciones de TypeScript
└── utils/               # Utilidades y helpers
```

## Tech Stack

- Node.js v20.10.0 (managed by Volta)
- Yarn v1.22.19 (managed by Volta)
- Next.js 15.3.1
- React 19
- TypeScript
- Tailwind CSS
- ESLint + Prettier
- React Query
- React Hook Form
- Zod (validación)

## Scripts Disponibles

- `yarn dev` - Inicia el servidor de desarrollo
- `yarn build` - Construye la aplicación para producción
- `yarn start` - Inicia la aplicación en modo producción
- `yarn lint` - Ejecuta el linter
- `yarn prettier` - Formatea el código

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Aprende Más

Para aprender más sobre las tecnologías utilizadas en este proyecto, consulta los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre las características y API de Next.js
- [Tutorial de Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js
- [Documentación de OpenAI](https://platform.openai.com/docs) - aprende sobre la API de OpenAI
- [Documentación de React Query](https://tanstack.com/query/latest) - aprende sobre la gestión de estado y caché

## Despliegue

La forma más sencilla de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
