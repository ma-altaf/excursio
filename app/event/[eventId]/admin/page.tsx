import { Suspense } from "react";
import Admin from "./Admin";

export default function page() {
  return (
    <Suspense>
      <Admin />
    </Suspense>
  );
}
