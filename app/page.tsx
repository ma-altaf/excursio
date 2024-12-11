import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center w-full h-screen p-2">
      <h1 className="font-bold text-5xl mb-10">Excursio</h1>
      <p className="font-bold mb-1">Excursion planning and management</p>
      <p className="max-w-full md:max-w-[80%] lg:max-w-[50%]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
        necessitatibus tenetur, eligendi quisquam delectus, magni vero rem eius
        laboriosam nemo dolorem, accusamus commodi nesciunt. Nostrum, officia
        porro. Distinctio, recusandae mollitia.
      </p>
      <Link href="/create" className="rounded-md mt-10 p-button bg-accent">
        Get Started
      </Link>
    </section>
  );
}
