import { json, useLoaderData } from "remix";
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
  const anime = data.Media;

  return (
    <div className="f-container">

      <div className="flex w-full md:inline-block sm:my-2 md:my-6 md:align-middle">
        <div className="w-full relative flex items-center">

          <div className="w-full grid grid-cols-1 gap-y-3 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">

            <div className="sm:col-span-4 lg:col-span-5 sm:sticky top-20 md:top-22">
              <img src={anime.coverImage.extraLarge} alt={anime.title.userPreferred} className="w-full rounded-lg overflow-hidden object-center object-cover" />
            </div>

            <div className="sm:col-span-8 lg:col-span-7 py-2 sm:py-4 md:py-0">
              <h2 className="text-2xl font-extrabold mb-4">{anime.title.userPreferred}</h2>

              {anime.description !== null ? 
              <div className="text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: anime.description }} />
              :
              <span className="text-gray-700 dark:text-gray-400">Aucune description pour le moment...</span>
              }

              <section className="mt-2 flex flex-col space-y-2" aria-describedby="Anime details">
                <span>Saison : {anime.season}</span>
                <span>Type : {anime.type}</span>
                <span>Format : {anime.format}</span>
                <span>{}</span>
              </section>

              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque incidunt, velit aperiam delectus doloribus ad? Ducimus quaerat repellat, omnis maxime nisi vero, praesentium quos eos pariatur nemo odio illum.</p>
            </div>
          </div>
        </div> 
      </div>

      {/* {
        "Media": {
          "id": 136226,
          "title": {
            "userPreferred": "Strike the Blood FINAL",
            "romaji": "Strike the Blood FINAL",
            "english": null,
            "native": "ストライク・ザ・ブラッドFINAL"
          },
          "coverImage": {
            "extraLarge": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx136226-P58frDKkgvTc.jpg",
            "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx136226-P58frDKkgvTc.jpg"
          },
          "bannerImage": null,
          "startDate": {
            "year": 2022,
            "month": 3,
            "day": 30
          },
          "endDate": {
            "year": 2022,
            "month": 6,
            "day": 29
          },
          "description": "The fifth season of <i>Strike the Blood</i>.",
          "season": "SPRING",
          "seasonYear": 2022,
          "type": "ANIME",
          "format": "OVA",
          "status": "NOT_YET_RELEASED",
          "episodes": 4,
          "duration": null,
          "chapters": null,
          "volumes": null,
          "genres": [
            "Action",
            "Ecchi",
            "Fantasy",
            "Supernatural"
          ],
          "synonyms": [
            "Strike the Blood V",
            "ราชันย์โลหิตรัตติกาล ภาค 5"
          ],
          "source": "LIGHT_NOVEL",
          "isAdult": false,
          "meanScore": null,
          "averageScore": null,
          "popularity": 4060,
          "hashtag": "#ストブラ",
          "countryOfOrigin": "JP",
          "isLicensed": true,
          "nextAiringEpisode": {
            "airingAt": 1648566000,
            "timeUntilAiring": 5364,
            "episode": 1
          },
          "studios": {
            "edges": [
              {
                "isMain": true,
                "node": {
                  "id": 957,
                  "name": "CONNECT"
                }
              }
            ]
          },
          "streamingEpisodes": [],
          "trailer": {
            "id": "CIdaOP8QIW4",
            "site": "youtube"
          }
        }
      } 
    */}
    </div>
  );
}

export default AnimeDetailPage;