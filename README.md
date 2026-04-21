# MDD - Monde de Dév

Réseau social pour développeurs

## Description

MDD (Monde de Dév) est une plateforme permettant aux développeurs de s'abonner à des sujets de programmation, publier des articles et échanger via des commentaires.

## Getting Started

### Prerequisites

- Node.js 22+
- npm ou yarn
- PostgreSQL

### Installation

```bash
git clone <repository-url>
cd P5-DFSJS
npm install
```

### Base de données (Docker)

Lancer une instance PostgreSQL en local avec Docker :

```bash
docker run --name mdd-postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mdd_db -p 5432:5432 -d postgres:17
```

Pour arrêter / relancer le conteneur :

```bash
docker stop mdd-postgres
docker start mdd-postgres
```

### Configuration

1. Copier le fichier d'environnement :
```bash
cp .env.example .env
```

2. Les variables par défaut dans `.env` correspondent au conteneur Docker ci-dessus :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mdd_db?schema=public"
AUTH_SECRET="your-secret-key-here-change-in-production"
AUTH_URL="http://localhost:3000"
```

3. Initialiser la base de données :
```bash
npx prisma generate
npx prisma db push
```

### Lancement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Langage**: TypeScript 5
- **UI**: shadcn/ui + Tailwind CSS 4
- **Base de données**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod

## Features

- Authentification utilisateur (inscription/connexion)
- Gestion de profil
- Abonnement à des thèmes
- Publication d'articles
- Commentaires sur articles
- Fil d'actualité personnalisé

## Project Structure

```
P5-DFSJS/
├── app/               # App Router (Next.js 16)
│   ├── layout.tsx
│   └── page.tsx
├── components/        # Composants UI (shadcn/ui)
│   └── ui/
├── lib/               # Utilitaires
│   └── utils.ts
├── prisma/            # Database schema
│   └── schema.prisma
├── public/            # Static files
└── package.json
```

## Tests

```bash
npm run test           # lance les tests
npm run test:coverage  # lance les tests avec rapport de couverture
```

Couverture minimale requise : **80%** sur les actions et validations.

## Server Actions

Toutes les actions sont dans `lib/actions/`. Elles s'exécutent côté serveur via le mécanisme `"use server"` de Next.js.

### Authentification — `lib/actions/auth.ts`

| Action | Paramètres | Auth requise | Retour |
|--------|-----------|--------------|--------|
| `register` | `formData` — username, email, password | Non | `{ errors }` ou redirect `/articles` |
| `login` | `formData` — emailOrUsername, password | Non | `{ error }` ou redirect `/articles` |
| `logout` | — | Oui | redirect `/` |

**Validation `register`** : email valide, username 3–20 caractères, password 8 caractères minimum.

---

### Articles — `lib/actions/articles.ts`

| Action | Paramètres | Auth requise | Retour |
|--------|-----------|--------------|--------|
| `getPosts` | `sort?` — `date_desc` \| `date_asc` \| `title_asc` \| `title_desc` | Non | Liste d'articles avec auteur et thème |
| `getPost` | `id` — identifiant de l'article | Non | Article avec auteur, thème et commentaires, ou `null` |
| `createPost` | `formData` — topic, title, content | Oui | `{ errors }` ou redirect `/articles` |

**Validation `createPost`** : titre 1–150 caractères, contenu 1–5000 caractères, topicId requis.

---

### Commentaires — `lib/actions/comments.ts`

| Action | Paramètres | Auth requise | Retour |
|--------|-----------|--------------|--------|
| `createComment` | `postId`, `content` | Oui | `void` ou throw |

**Validation** : contenu 1–1000 caractères. Revalide automatiquement la page de l'article.

---

### Souscriptions — `lib/actions/subscriptions.ts`

| Action | Paramètres | Auth requise | Retour |
|--------|-----------|--------------|--------|
| `newSubscription` | `topicId` | Oui | `void` ou throw |
| `removeSubscription` | `topicId` | Oui | `void` ou throw |
| `getUserSubscribedTopicIds` | — | Oui | `string[]` |

---

### Thèmes — `lib/actions/topics.ts`

| Action | Paramètres | Auth requise | Retour |
|--------|-----------|--------------|--------|
| `getTopics` | — | Non | Liste de thèmes avec compteurs posts/abonnés |
| `getTopicsByUser` | `userId` | Non | Liste de thèmes souscrits par l'utilisateur |

---

### Profil — `lib/actions/user.ts`

| Action | Paramètres | Auth requise | Retour |
|--------|-----------|--------------|--------|
| `getProfile` | — | Oui | `{ id, username, email }` ou `null` |
| `updateProfile` | `formData` — username, email, password | Oui | `{ error }` ou `{ success: true }` |

**Validation `updateProfile`** : username et email non vides, mot de passe actuel obligatoire pour confirmer la modification.

---

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## License

MIT License
