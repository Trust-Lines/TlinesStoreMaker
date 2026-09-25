import { redirect } from "next/navigation";

// "News" in the nav and footer shares the Blog & News page.
export default function NewsPage() {
  redirect("/blog");
}
