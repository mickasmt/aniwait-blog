import { LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";

import invariant from "tiny-invariant";
import { getPostsByCategory } from "~/models/post.server";
import { NewsCard } from "~/components/news-card";

type LoaderData = {
  category_name: string;
  posts: Awaited<ReturnType<typeof getPostsByCategory>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.categoryName, "expected params.categoryName");
  const category_name = params.categoryName;
  const posts = await getPostsByCategory({ categoryName: category_name });

  return json<LoaderData>({ posts, category_name });
};

export default function PostsByCategoryPage() {
  const data = useLoaderData() as LoaderData;
  const { posts, category_name } = data;

  return (
    <main className="f-container">
      {posts.length === 0
        ? (
          <p className="p-4">Aucunes publications pour le moment...</p>
        )
        : (
          <div>
            <h1 className="capitalize text-bold text-2xl py-3">
              {category_name}
            </h1>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
              {posts.map((post, index) => (
                <NewsCard data={post} key={index} />
              ))}
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

// export function ErrorBoundary({ error }: { error: Error }) {
//   console.error(error);

//   return <div>An unexpected error occurred: {error.message}</div>;
// }

// export function CatchBoundary() {
//   const caught = useCatch();

//   if (caught.status === 404) {
//     return <div className="f-container">Post not found</div>;
//   }

//   throw new Error(`Unexpected caught response with status: ${caught.status}`);
// }
