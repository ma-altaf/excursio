import UserBtn from "@/features/users/components/UserBtn";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="flex flex-col justify-center items-center w-full h-screen p-2 relative">
        <nav className="absolute top-0 w-full flex flex-row items-center justify-between p-1">
          <p>Excursio</p>
          <UserBtn />
        </nav>
        <h1 className="font-bold text-5xl mb-10">Excursio</h1>
        <p className="font-bold mb-1">Excursion planning and management</p>
        <p className="max-w-full md:max-w-[80%] lg:max-w-[50%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
          necessitatibus tenetur, eligendi quisquam delectus, magni vero rem
          eius laboriosam nemo dolorem, accusamus commodi nesciunt. Nostrum,
          officia porro. Distinctio, recusandae mollitia.
        </p>
        <Link href="/create" className="rounded-md mt-10 p-button bg-accent">
          Create Excursion
        </Link>
      </section>

      <footer className="w-full p-2">
        <p className="text-center">
          Developed by{" "}
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            href="https://altafagowun.web.app/"
            target="_blank"
          >
            A.Altaf
          </Link>
        </p>
      </footer>
    </main>
  );
}
