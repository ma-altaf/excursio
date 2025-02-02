import { Suspense } from "react";
import CompleteSignUp from "./CompleteSignUp";

export default function page() {
  return (
    <Suspense>
      <CompleteSignUp />
    </Suspense>
  );
}
