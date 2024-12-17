import type { Metadata } from "next";
import Create from "./Create";

export const metadata: Metadata = {
  title: "Create excursion",
  description: "Create a new excursion.",
};

export default function Layout() {
  return <Create />;
}
