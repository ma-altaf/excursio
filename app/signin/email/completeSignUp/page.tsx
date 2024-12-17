import type { Metadata } from "next";
import CompleteSignUp from "./CompleteSignUp";

export const metadata: Metadata = {
  title: "Complete Sign up",
  description: "Complete sign up from email authentication link",
};

export default function Page() {
  return <CompleteSignUp />;
}
