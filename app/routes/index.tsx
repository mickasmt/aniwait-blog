import { json, useLoaderData } from "remix";
import { client } from '~/libs/graphql/client';
import { HOME_QUERY } from '~/libs/graphql/queries';
import { getUnixTime, addDays, subDays } from "date-fns";
import { DataResponse } from "~/utils/types";
import { getLatestPosts, getTrailers } from "~/models/home.server";

import { NewsCard } from "~/components/news-card";
import TitleLinkSeparator from "~/components/title-link-separator";
import { AiringHorList } from "~/components/airing-horizontal-list";
import { MediaHorList } from "~/components/media-horizontal-list";
import { BannerHomepage } from "~/components/banner-homepage";


type LoaderData = {
  animes: Awaited<DataResponse>;
  trailers: Awaited<ReturnType<typeof getTrailers>>;
  latestNews: Awaited<ReturnType<typeof getLatestPosts>>;
};

export const loader = async () => {
  const animes = await client.request(HOME_QUERY, {
    season: "WINTER",
    seasonYear: 2022,
    nextSeason: "SPRING",
    nextYear: 2022,
    latestAiringStart: getUnixTime(subDays(new Date(), 1)),
    latestAiringEnd: getUnixTime(new Date()),
    futureAiringStart: getUnixTime(new Date()),
    futureAiringEnd: getUnixTime(addDays(new Date(), 1)),
  });

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
  const { animes, trailers, latestNews } = data;

  const trending = animes.trending.media;
  const nextSeason = animes.nextSeason.media;
  const latestAiring = animes.latestAiring.airingSchedules.filter((airing) => airing.media.isAdult == false);
  const futureAiring = animes.futureAiring.airingSchedules.filter((airing) => airing.media.isAdult == false);
  // const season = animes.season.media;

  return (
    <div>
      {/* <BannerHomepage /> */}

      {latestNews.length ? (
        <div className="pt-6 pb-12 bg-gray-50 dark:bg-[#1A1A1A]">
          <TitleLinkSeparator title="Actualités" link="/news" />
          <div className="f-container overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 md:grid-cols-4">
              {latestNews.map((post, index) => (
                <NewsCard data={post} key={index} />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <AiringHorList data={latestAiring} title="Sorties ces derniers 24h" />

      <AiringHorList data={futureAiring} title="Dans les heures à venir !" />

      {trailers.length ? (
        <div className="pt-6 pb-12 bg-gray-50 dark:bg-[#1A1A1A]">
          <TitleLinkSeparator title="Les derniers trailers" link="/posts/trailers" />
          <div className="f-container overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 md:grid-cols-4">
              {trailers.map((post, index) => (
                <NewsCard data={post} key={index} />
              ))}
            </div>
          </div>
        </div>
      ) : null}



      <MediaHorList data={trending} title="Tendances du moment" />

      <MediaHorList data={nextSeason} title="Saisons à venir" />
    </div >
  );
}
