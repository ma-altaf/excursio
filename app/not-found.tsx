import Link from "next/link";

export default function Error() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="my-4">Page Not Found!</p>
      <Link href="/" className="p-button rounded-full bg-accent">
        Go to Homepage
      </Link>
    </main>
  );
}
