import ArticleCard from "@/components/ui/article-card";

export default function ArticlesPage() {
  return (
    <main className="md:p-15 p-5 flex flex-col gap-10">
      <section className="flex md:justify-between md:flex-row flex-col justify-center items-center gap-2">
         <button className="self-center h-10 w-35 rounded-lg font-bold text-white bg-(--main-purple)">Créer un article</button>
        <button className="font-bold text-lg">Trier par</button>
      </section>

      <section className="grid md:grid-cols-2 grid-cols-1 gap-10">
        <ArticleCard
          name="Titre de l'article"
          date={new Date()}
          author="moi"
          description="Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled..."
        />
        <ArticleCard
          name="Titre de l'article"
          date={new Date()}
          author="moi"
          description="Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled..."
        />
        <ArticleCard
          name="Titre de l'article"
          date={new Date()}
          author="moi"
          description="Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled..."
        />
        <ArticleCard
          name="Titre de l'article"
          date={new Date()}
          author="moi"
          description="Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled..."
        />
      </section>
    </main>
  );
}
