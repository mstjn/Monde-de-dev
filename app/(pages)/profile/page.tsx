import { getProfile } from "@/lib/actions/user";
import UpdateProfileForm from "@/components/profile-form";
import { TopicCard } from "@/components/topic-card";
import { getTopicsByUser } from "@/lib/actions/topics";

export default async function ProfilePage() {
  const user = await getProfile();
  const topics = await getTopicsByUser(user?.id ?? "")
  return (
    <main className="md:p-15 p-5 flex flex-col gap-10 relative">
      <h1 className="font-bold text-2xl text-center">Profil utilisateur</h1>
      <UpdateProfileForm username={user?.username ?? ""} email={user?.email ?? ""} />
      <hr className="border-black" />
       <h2 className="font-bold text-2xl text-center">Abonnements</h2>
        <section className="grid md:grid-cols-2 grid-cols-1 gap-5">
               {topics.map((topic) => (
                 <TopicCard key={topic.id} topic={topic} isSubscribed={true} profileVariant />
               ))}
             </section>
    </main>
  );
}
