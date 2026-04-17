import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Topics
  const topics = await Promise.all([
    prisma.topic.upsert({
      where: { name: "JavaScript" },
      update: {},
      create: { name: "JavaScript", description: "Tout sur JS, ES2024, frameworks et outils front-end." },
    }),
    prisma.topic.upsert({
      where: { name: "TypeScript" },
      update: {},
      create: { name: "TypeScript", description: "Typage statique, interfaces, génériques et bonnes pratiques." },
    }),
    prisma.topic.upsert({
      where: { name: "React" },
      update: {},
      create: { name: "React", description: "Composants, hooks, state management et Server Components." },
    }),
    prisma.topic.upsert({
      where: { name: "Node.js" },
      update: {},
      create: { name: "Node.js", description: "Backend JavaScript, APIs REST, performances et sécurité." },
    }),
    prisma.topic.upsert({
      where: { name: "DevOps" },
      update: {},
      create: { name: "DevOps", description: "CI/CD, Docker, Kubernetes et déploiement cloud." },
    }),
  ]);

  // Users
  const alice = await prisma.user.upsert({
    where: { email: "alice@mdd.dev" },
    update: {},
    create: {
      email: "alice@mdd.dev",
      username: "alice_dev",
      password: "hashed_password_alice",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@mdd.dev" },
    update: {},
    create: {
      email: "bob@mdd.dev",
      username: "bob_codes",
      password: "hashed_password_bob",
    },
  });

  const charlie = await prisma.user.upsert({
    where: { email: "charlie@mdd.dev" },
    update: {},
    create: {
      email: "charlie@mdd.dev",
      username: "charlie42",
      password: "hashed_password_charlie",
    },
  });

  // Subscriptions
  await Promise.all([
    prisma.subscription.upsert({
      where: { userId_topicId: { userId: alice.id, topicId: topics[0].id } },
      update: {},
      create: { userId: alice.id, topicId: topics[0].id },
    }),
    prisma.subscription.upsert({
      where: { userId_topicId: { userId: alice.id, topicId: topics[2].id } },
      update: {},
      create: { userId: alice.id, topicId: topics[2].id },
    }),
    prisma.subscription.upsert({
      where: { userId_topicId: { userId: bob.id, topicId: topics[1].id } },
      update: {},
      create: { userId: bob.id, topicId: topics[1].id },
    }),
    prisma.subscription.upsert({
      where: { userId_topicId: { userId: bob.id, topicId: topics[3].id } },
      update: {},
      create: { userId: bob.id, topicId: topics[3].id },
    }),
    prisma.subscription.upsert({
      where: { userId_topicId: { userId: charlie.id, topicId: topics[4].id } },
      update: {},
      create: { userId: charlie.id, topicId: topics[4].id },
    }),
  ]);

  // Posts
  const post1 = await prisma.post.upsert({
    where: { id: "seed-post-1" },
    update: {},
    create: {
      id: "seed-post-1",
      title: "Les nouveautés d'ES2024",
      content:
        "ES2024 apporte plusieurs fonctionnalités intéressantes comme Object.groupBy(), Promise.withResolvers() et Array.fromAsync(). Ces ajouts simplifient des patterns courants en JavaScript...",
      authorId: alice.id,
      topicId: topics[0].id,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: "seed-post-2" },
    update: {},
    create: {
      id: "seed-post-2",
      title: "Pourquoi migrer vers TypeScript en 2025 ?",
      content:
        "TypeScript est devenu incontournable dans l'écosystème JavaScript. Le typage statique permet de détecter les erreurs à la compilation, améliore l'autocomplétion et facilite la maintenance sur des projets de grande envergure...",
      authorId: bob.id,
      topicId: topics[1].id,
    },
  });

  const post3 = await prisma.post.upsert({
    where: { id: "seed-post-3" },
    update: {},
    create: {
      id: "seed-post-3",
      title: "React Server Components : ce que ça change",
      content:
        "Avec Next.js 13+, les Server Components permettent de rendre des composants côté serveur sans JavaScript côté client. Cela réduit le bundle size et améliore les performances initiales de chargement...",
      authorId: alice.id,
      topicId: topics[2].id,
    },
  });

  const post4 = await prisma.post.upsert({
    where: { id: "seed-post-4" },
    update: {},
    create: {
      id: "seed-post-4",
      title: "Dockeriser une app Node.js",
      content:
        "Créer une image Docker pour une application Node.js est simple : un Dockerfile bien écrit avec un multi-stage build permet de réduire drastiquement la taille de l'image finale...",
      authorId: charlie.id,
      topicId: topics[4].id,
    },
  });

  // Comments
  await Promise.all([
    prisma.comment.create({
      data: {
        content: "Super article, j'attendais ce récap des nouveautés ES2024 !",
        authorId: bob.id,
        postId: post1.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: "Object.groupBy() va vraiment me simplifier la vie, merci.",
        authorId: charlie.id,
        postId: post1.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: "On peut ajouter que le mode strict de TS évite beaucoup de bugs runtime.",
        authorId: alice.id,
        postId: post2.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: "Les Server Components c'est un changement de paradigme, il faut du temps pour s'y habituer.",
        authorId: bob.id,
        postId: post3.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: "Tu peux montrer un exemple de multi-stage build ?",
        authorId: alice.id,
        postId: post4.id,
      },
    }),
  ]);

  console.log("Seed terminé : 3 users, 5 topics, 4 posts, 5 comments.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
