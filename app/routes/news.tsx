import { json, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import { getPosts } from "~/models/post.server";
import { NewsCard } from "~/components/news-card";
import TitleLinkSeparator from "~/components/title-link-separator";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json<LoaderData>({ posts });
};

export default function NewsPage() {
  const data = useLoaderData() as LoaderData;
  const { posts } = data;

  return (
    <main className="py-5">
      {posts.length === 0
        ? (
          <div className="f-container">
            <p className="p-4">Aucunes actualités pour le moment...</p>
          </div>
        )
        : (
          <div>
            <TitleLinkSeparator title="Actualités" />
            <div className="f-container">
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
                {posts.map((post, index) => (
                  <NewsCard data={post} key={index} />
                ))}
              </div>
            </div>
            <div className="mt-6 py-5 justify-center text-center">
              Pagination
            </div>
          </div>
        )
      }
    </main >
  );
}
