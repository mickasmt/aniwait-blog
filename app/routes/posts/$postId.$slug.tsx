import type { LoaderFunction, ActionFunction } from "remix";
import { json, useLoaderData, useCatch, Form } from "remix"; 
// import { redirect } from "remix";
import invariant from "tiny-invariant"; 
// import { requireUserId } from "~/session.server";

import type { Post } from "~/models/post.server";
import { getPost } from "~/models/post.server";
// import { deletePost } from "~/models/post.server";

type LoaderData = {
  post: Post;
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
      <h3 className="text-2xl font-bold">{data.post.title}</h3>
      <p className="py-6">{data.post.body}</p>

      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
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
