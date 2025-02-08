import UserBtn from "@/features/users/components/UserBtn";
import Link from "next/link";
import Guide from "./(components)/Guide";
import { FaArrowDownLong } from "react-icons/fa6";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative">
      <nav className="absolute top-0 w-full flex flex-row items-center justify-between p-3">
        <b>Excursio</b>
        <UserBtn />
      </nav>
      <section className="flex flex-col justify-center items-center w-full h-screen p-3">
        <Image
          src="/images/logo-512x512.png"
          alt="Logo"
          width={150}
          height={150}
        />
        <h1 className="font-bold text-5xl my-2 uppercase">Excursio</h1>
        <p className="text-2xl mb-1">Excursion planning and management</p>
        <p className="max-w-full md:max-w-[80%] lg:max-w-[50%]"></p>
        <Link href="/create" className="rounded-md mt-8 p-button bg-accent">
          Create Excursion
        </Link>
        <span className="mt-20 flex flex-col items-center">
          <p>Scroll</p>
          <FaArrowDownLong className="size-5 mt-4 animate-bounce" />
        </span>
      </section>

      <Guide />

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
