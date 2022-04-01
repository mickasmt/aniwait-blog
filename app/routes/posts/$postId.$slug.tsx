import { LoaderFunction, Link, useCatch } from "remix";
import { json, useLoaderData } from "remix";

import { format } from "date-fns";
import frLocale from 'date-fns/locale/fr'
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";

type LoaderData = {
  post: Awaited<ReturnType<typeof getPost>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.postId, "expected params.id");
  const post = await getPost({ id: params.postId });

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ post });
};

export default function PostDetailsPage() {
  const data = useLoaderData() as LoaderData;
  const { post } = data;

  return (
    <div className="f-container">
      <div className="flex w-full columns-2 gap-3 py-4">
        {/* Display full post */}
        <div className="w-full md:w-4/6 md:flex-shrink-0">

          {post !== null ?
            <article className="pt-5">
              <Link className="text-blue-tron capitalize hover:underline" to={`/posts/${post.category.name}`}>
                {post.category.name}
              </Link>
              <h1 className="text-gray-900 text-3xl mt-3 md:text-4xl dark:text-white leading-12">{post.title}</h1>
              <div className="flex justify-between items-center mt-6 mb-4 text-gray-600 dark:text-gray-300">
                <span>Publié par {post.user.username}</span>
                <span v-else="v-else">{format(new Date(post.createdAt), 'dd MMMM yyyy', { locale: frLocale })}</span>
              </div>
              <img
                className="object-cover mb-7 w-full h-full"
                src={post.img_url}
                alt={post.title}
              />
              <div className="prose max-w-none prose-h2:mt-6 dark:prose-invert" dangerouslySetInnerHTML={{__html: post.body}}>
                {/* <p>{post.description}</p> */}
                {/* <p>{post.body}</p> */}
              </div>
            </article>
            :
            <div className="f-container">Aucune publication trouvée 😭</div>
          }

        </div>
        {/* Sidebar */}
        <div className="hidden sticky top-20 h-60 md:block md:w-2/6">
          <div className="p-4 rounded-lg">
            Sidebar
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div className="f-container">Aucune publication trouvée 😭</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
