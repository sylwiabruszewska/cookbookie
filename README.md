# CookBookie

## 🌟 Introduction

Welcome to the CookBookie App. This application aims to provide a modern user-friendly platform for storing and managing recipes. It empowers users to easily organize their favorite recipes, discover new ones and creating shopping list. The goal is to create a recipe repository that enhances culinary experiences and simplifies meal planning.

## 🔍 Key Features

- **Add Recipes:** Easily add your favorite recipes with details like ingredients, instructions, steps and photos.
- **Search & Filter:** Quickly find the recipe you're looking for.
- **Favorites:** Mark recipes as favorites for quick access.
- **User Accounts:** Create an account to save and sync your recipes across devices.
- **Organize Recipes:** Categorize your recipes by meal type.
- **Favorites:** Mark recipes as favorites for quick access.
- **Shopping List:** Add ingredients on your personal shopping list.
- **Internationalization:** Support for multiple languages, allowing users to interact with the application in their preferred language.
- **Theme Change:** Option to switch between light and dark themes to match user preferences.

## 🛠️ Tech Stack

**Frontend**

- **Next.js 14** - A React framework for server-side rendering.
- **React 18** - A JavaScript library for building user interfaces.
- **Tailwind CSS** - Utility-first CSS framework.
- **Formik** - Form handling in React.
- **Framer Motion** - Animations in React.
- **React Dropzone** - File upload component.
- **React Select** - Select component for React.
- **React Hot Toast** - Notifications.
- **Gravatar** - Avatar images based on email addresses.

**Backend**

- **Node.js 20** - JavaScript runtime.
- **NextAuth.js** - Authentication for Next.js.
- **Vercel Postgres** - PostgreSQL integration.
- **Bcrypt.js** - Password hashing.

**Utilities**

- **i18next** - Internationalization framework.
- **React i18next** - Internationalization for React.
- **Zod** - TypeScript-first schema validation on the backend.
- **Yup** - Schema validation on the frontend.
- **UUID** - Unique identifiers.

**Developer Tools**

- **TypeScript** - Typed JavaScript at scale.
- **ESLint** - Linting utility.

**Deployment**

- **Vercel**

## Installation

To set up the project locally, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/sylwiabruszewska/cookbookie.git
```

### 2. Navigate to the project directory:

```bash
cd cookbookie
```

### 3. Install dependencies:

```bash
npm install
```

### 4. Set up environment variables:

```bash
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
POSTGRES_URL=your_postgres_url
POSTGRES_PRISMA_URL=your_postgres_prisma_url
POSTGRES_URL_NO_SSL=your_postgres_url_no_ssl
POSTGRES_URL_NON_POOLING=your_postgres_url_non_pooling
POSTGRES_USER=your_postgres_user
POSTGRES_HOST=your_postgres_host
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DATABASE=your_postgres_database
NEXTAUTH_URL=your_nextauth_url
EDGE_STORE_ACCESS_KEY=your_edge_store_access_key
EDGE_STORE_SECRET_KEY=your_edge_store_secret_key
I18NEXUS_API_KEY=your_i18nexus_api_key
```

### 5. Create tables in the database:

```bash
npm run init
```

### 6. Start the development server:

```bash
npm run dev
```

## Usage

After starting the development server, open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to start using CookBookie.
