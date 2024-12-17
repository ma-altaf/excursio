import type { Metadata } from "next";
import Email from "./Email";

export const metadata: Metadata = {
  title: "Enter Email",
  description: "Enter email to send sign up link.",
};

export default function Page() {
  return <Email />;
}
