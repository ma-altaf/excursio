import type { Metadata } from "next";
import Account from "./Account";

export const metadata: Metadata = {
  title: "Edit Account",
  description: "Change account deatils.",
};

export default function Page() {
  return <Account />;
}
