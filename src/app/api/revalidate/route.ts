import { revalidatePath } from "next/cache";

/**
 * Called by the ERP after saving a project so the site updates immediately
 * (otherwise pages refresh on their own within a minute).
 *   POST /api/revalidate   header: x-revalidate-secret: <REVALIDATE_SECRET>
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ ok: false }, { status: 401 });
  }
  revalidatePath("/projects");
  revalidatePath("/projects/[slug]", "page");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  return Response.json({ ok: true });
}
