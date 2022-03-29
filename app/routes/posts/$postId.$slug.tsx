import { LoaderFunction, ActionFunction, Link } from "remix";
import { json, useLoaderData, useCatch, Form } from "remix";
// import { redirect } from "remix";
import invariant from "tiny-invariant";
// import { requireUserId } from "~/session.server";

import type { Post } from "~/models/post.server";
import { getPost } from "~/models/post.server";
// import { deletePost } from "~/models/post.server";

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

// export const action: ActionFunction = async ({ request, params }) => {
//   const userId = await requireUserId(request);
//   invariant(params.noteId, "noteId not found");

//   await deleteNote({ userId, id: params.noteId });

//   return redirect("/");
// };

export default function NoteDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="f-container">
      <div className="flex w-full columns-2 gap-3 py-4">
        {/* Display full post */}
        <div className="w-full md:w-4/6 md:flex-shrink-0">

          <article className="pt-5">
            <Link className="text-blue-tron capitalize hover:underline" to={`/news/category/${data.post?.category}`}>
                { data.post?.category.name }
              </Link>
            <h1 className="text-gray-900 text-3xl mt-3 mb-4 md:text-4xl dark:text-white leading-12">{data.post?.title}</h1>
            <div className="flex justify-between items-center mb-5 text-gray-600 text-sm dark:text-gray-300">
              <span v-else="v-else">Date</span>
              <span>Publié {data.post?.createdAt}</span>
            </div>
            <img className="object-cover mb-7 object-cover w-full h-full fill-inherit" src={data.post?.img_url} alt={data.post?.title} />
            <div className="prose max-w-none prose-h2:mt-6 dark:prose-invert">
              <p>{data.post?.body}</p>
              <p>{ }</p>
            </div>
          </article>
          
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
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
