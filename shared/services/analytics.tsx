import { app } from "./firebase";
import { getAnalytics } from "firebase/analytics";

export const analytics = getAnalytics(app);
