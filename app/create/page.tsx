import { Suspense } from "react";
import Create from "./Create";

export default function page() {
  return (
    <Suspense>
      <Create />
    </Suspense>
  );
}
