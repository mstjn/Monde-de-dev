export interface Topic {
  id: string;
  name: string;
  description: string | null;
  _count: { posts: number; subscriptions: number };
};

export interface Article {
  name : string, 
  date : Date, 
  author: string,
  description : string
}