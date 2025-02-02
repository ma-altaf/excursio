import { Suspense } from "react";
import Email from "./Email";

export default function page() {
  return (
    <Suspense>
      <Email />
    </Suspense>
  );
}
