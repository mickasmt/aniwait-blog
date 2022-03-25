import { json, useLoaderData, Link } from "remix";
import type { LoaderFunction } from "remix";

import { getPosts } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json<LoaderData>({ posts });
};

export default function NewsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <main className="f-container py-5 min-h-screenex">

      {data.posts.length === 0 ? (
        <p className="p-4">Aucune news pour l'instant</p>
      ) : (
        <div>
          {data.posts.map((post) => (
            <li key={post.id}>
              <Link to={post.id}>
                {post.title}
              </Link>
            </li>
          ))}
        </div>
      )}

    </main>
  );
}
