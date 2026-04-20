export interface Topic {
  id: string;
  name: string;
  description: string | null;
  _count: { posts: number; subscriptions: number };
}

export interface Post {
  id: string;
  title: string;
  date: Date;
  author: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  topic: Topic;
  topicId: string;
  comments: Comment[];
}

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  comments: Comment[];
  subscription: Subscription[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  post: Post;
  postId: string;
}

export interface Subscription {
  id: string;
  createdAt: Date;
  user: User;
  userId: string;
  topic: Topic;
  topicId: string;
}
