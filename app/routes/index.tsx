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
  const { animes} = data;
  
  const trending = animes.trending.media;
  const nextSeason = animes.nextSeason.media;
  const latestAiring = animes.latestAiring.airingSchedules.filter((airing) => airing.media.isAdult == false);
  const futureAiring = animes.futureAiring.airingSchedules.filter((airing) => airing.media.isAdult == false);
  // const season = animes.season.media;
  
  const fake_data = [                                                                               
    {                                                                             
      id: 'cl1dyffia0163ls559k3kpqx3',                                            
      title: 'Omnis maxime magni necessitatibus nisi quas illum mollitia at.',    
      img_url: 'http://placeimg.com/640/480',                                     
      createdAt: new Date('2022-03-30T19:21:55.291Z'),                                      
      category: {
        id: 'cl1dyfdqn0032ls55aihq94iw',
        name: 'trailers'
      }             
    },                                                                            
    {                                                                             
      id: 'cl1dyffex0157ls55oqedknmc',                                            
      title: 'Facere cumque nihil laborum voluptatibus culpa veniam iure sed.',   
      img_url: 'http://placeimg.com/640/480',                                     
      createdAt: new Date('2022-03-30T19:21:55.291Z'),                                      
      category: { id: 'cl1dyfdqn0032ls55aihq94iw', name: 'trailers' }             
    },                                                                            
    {                                                                             
      id: 'cl1dyffbv0150ls55ava1tgfa',                                            
      title: 'Aut suscipit repellendus earum neque necessitatibus quia.',         
      img_url: 'http://placeimg.com/640/480',                                     
      createdAt: new Date('2022-03-30T19:21:55.291Z'),                                      
      category: { id: 'cl1dyfdqn0032ls55aihq94iw', name: 'trailers' }             
    },                                                                            
    {                                                                             
      id: 'cl1dyff8x0143ls55abodyjnw',                                            
      title: 'Consequatur explicabo blanditiis rerum libero ea qui suscipit.',    
      img_url: 'http://placeimg.com/640/480',                                     
      createdAt: new Date('2022-03-30T19:21:55.291Z'),                                      
      category: { id: 'cl1dyfdo60025ls55uv2fi749', name: 'animes' }               
    }                                                                             
  ];

  return (
    <div>
      {/* <div className="f-container">
        Slider homepage here
      </div> */}

      <div className="pt-6 pb-12 bg-gray-50 dark:bg-gray-800/60">
        <TitleLinkSeparator title="Actualités" link="/news" />
        <div className="f-container overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 md:grid-cols-4">
            {fake_data.map((post, index) => (
              <NewsCard data={post} key={index} />
            ))}
          </div>
        </div>
      </div>

      <AiringHorList data={latestAiring} title="Sorties ces derniers 24H" />

      <AiringHorList data={futureAiring} title="Dans les heures à venir !" />

      <div className="pt-6 pb-12 bg-gray-50 dark:bg-gray-800/60">
        <TitleLinkSeparator title="Les derniers trailers" link="/posts/trailers" />
        <div className="f-container overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 md:grid-cols-4">
            {fake_data.map((post, index) => (
              <NewsCard data={post} key={index} />
            ))}
          </div>
        </div>
      </div>

      <MediaHorList data={trending} title="Tendances du moment" />

      <MediaHorList data={nextSeason} title="Saisons à venir" />
    </div >
  );
}
