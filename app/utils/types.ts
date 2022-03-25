
type DataResponse = {
  latestAiring: LatestAiring;
  futureAiring: FutureAiring;
  trending: Trending;
  season: Season;
  nextSeason: NextSeason;
}

type LatestAiring = {
  airingSchedules: AiringSchedule[];
}

type FutureAiring = {
  airingSchedules: AiringSchedule[];
}

type Trending = {
  media: Media[];
}

type NextSeason = {
  media: Media[];
}

type Season = {
  media: Media[];
}

type AiringSchedule = {
  id: number;
  episode: number;
  airingAt: number;
  media: Media;
}

type Media = {
  id: number;
  title: Title;
  coverImage: CoverImage;
  isAdult: boolean;
}

type Title = {
  userPreferred: string;
}

type CoverImage = {
  extraLarge: string;
  large: string;
}

export type {
  DataResponse,
  LatestAiring,
  FutureAiring,
  Trending,
  Season,
  NextSeason,
  AiringSchedule,
  Media,
  Title,
  CoverImage
}
