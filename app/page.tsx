import Image from "next/image";
import Link from "next/link";

export const Home = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-8 flex flex-col items-center">
        <div className="flex justify-center">
          <Image src="/logo.png" width={412} height={238} alt="Logo MDD" />
        </div>

        <div className="flex md:flex-row flex-col gap-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            S&apos;inscrire
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
