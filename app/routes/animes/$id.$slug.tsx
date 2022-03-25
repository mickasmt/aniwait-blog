import { json, Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { client } from '~/libs/graphql/client';
import { MEDIA_QUERY } from '~/libs/graphql/queries';
import invariant from "tiny-invariant";


export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "expected params.id");
  const data = await client.request(MEDIA_QUERY, { id: params.id });

  return json(data);
};

function AnimeDetailPage() {
  const data = useLoaderData();

  return (
    <div className="f-container py-5 min-h-screen">
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default AnimeDetailPage;