import { Suspense } from "react";
import Signin from "./Signin";

export default function page() {
  return (
    <Suspense>
      <Signin />
    </Suspense>
  );
}
