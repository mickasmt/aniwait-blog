import { json, useLoaderData } from "remix";
import { client } from '~/libs/graphql/client';
import { HOME_QUERY } from '~/libs/graphql/queries';
import { getUnixTime, addDays, subDays } from "date-fns";
import { DataResponse } from "~/utils/types";
import { getLatestPosts, getTrailers } from "~/models/home.server";

import TitleLinkSeparator from "~/components/title-link-separator";
import { NewsCard } from "~/components/news-card";
import { AiringHorList } from "~/components/airing-horizontal-list";
import { MediaHorList } from "~/components/media-horizontal-list";


const VARIABLES = {
  season: "WINTER",
  seasonYear: 2022,
  nextSeason: "SPRING",
  nextYear: 2022,
  latestAiringStart: getUnixTime(subDays(new Date(), 1)),
  latestAiringEnd: getUnixTime(new Date()),
  futureAiringStart: getUnixTime(new Date()),
  futureAiringEnd: getUnixTime(addDays(new Date(), 1)),
};

type LoaderData = {
  animes: Awaited<DataResponse>;
  trailers: Awaited<ReturnType<typeof getTrailers>>;
  latestNews: Awaited<ReturnType<typeof getLatestPosts>>;
};

export const loader = async () => {
  const animes = await client.request(HOME_QUERY, VARIABLES);
  const trailers = await getTrailers();
  const latestNews = await getLatestPosts();

  return json<LoaderData>({
    animes,
    trailers,
    latestNews
  });
};

export default function Index() {
  const data = useLoaderData() as LoaderData;

  const trending = data.animes.trending.media;
  const nextSeason = data.animes.nextSeason.media;
  const latestAiring = data.animes.latestAiring.airingSchedules.filter((airing) => airing.media.isAdult == false);
  const futureAiring = data.animes.futureAiring.airingSchedules.filter((airing) => airing.media.isAdult == false);
  // const season = data.animes.season.media;

  return (
    <div>
      <TitleLinkSeparator title="Actualités" link="/news" />
      <div className="f-container overflow-hidden">
        <div className="grid grid-cols-2 gap-x-4  gap-y-8 md:grid-cols-4">
          {data.latestNews.map((post, index) => (
            <NewsCard data={post} key={index} />
          ))}
        </div>
      </div>

      <AiringHorList data={latestAiring} title="Dernières sorties" />

      <AiringHorList data={futureAiring} title="Dans les heures à venir" />

      <div className="mt-12 pt-0.5 pb-16 bg-sky-100 dark:bg-sky-900/30">
        <TitleLinkSeparator title="Les derniers trailers" link="/news/trailers" />
        <div className="f-container overflow-hidden">
          <div className="grid grid-cols-2 gap-x-4  gap-y-8 md:grid-cols-4">
            {data.trailers.map((post, index) => (
              <NewsCard data={post} key={index} />
            ))}
          </div>
        </div>
      </div>

      <MediaHorList data={trending} title="Tendances du moment" />

      <MediaHorList data={nextSeason} title="Saisons à venir" />
    </div>
  );
}
