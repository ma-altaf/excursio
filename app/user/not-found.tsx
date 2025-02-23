import Link from "next/link";

export default function NoUser() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Could not find the User</h1>
      <p className="my-4">
        Check if the <b>link</b> contains the correct ../user/<b>User ID</b>.
      </p>
      <Link href="/" className="p-button rounded-full bg-accent">
        Go to Homepage
      </Link>
    </section>
  );
}
