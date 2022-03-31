import { Form, json } from "remix";
// import {useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

// import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getPosts } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  // const userId = await requireUserId(request);
  const posts = await getPosts();
  return json<LoaderData>({ posts });
};

export default function ProfilPage() {
  // const data = useLoaderData() as LoaderData;
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col f-container">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="hidden md:flex text-xl font-semibold">
          Mon profil
        </h1>
        <p>{user.username}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full">
        {/* List all comments of user */}
        <div className="w-full mt-6 py-5 justify-center text-center">
          Vous n'avez pas encore de commentaires.
        </div>
      </main>
    </div>
  );
}
