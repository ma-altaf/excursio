import type { Metadata } from "next";
import Signin from "./Signin";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Choose method of signing in",
};

export default function Page() {
  return <Signin />;
}
