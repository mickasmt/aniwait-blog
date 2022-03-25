import { gql } from "graphql-request";

const HOME_QUERY = gql`
  query getMedias($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextYear: Int, $latestAiringStart: Int, $latestAiringEnd: Int, $futureAiringStart: Int, $futureAiringEnd: Int) {
    latestAiring: Page(page: 1, perPage: 50) {
      # sort : TIME_DESC
      airingSchedules(airingAt_greater: $latestAiringStart, airingAt_lesser: $latestAiringEnd, sort: TIME_DESC) {
        id
        episode
        airingAt
        media {
          ...mediaFragment
        }
      }
    }
    futureAiring: Page(page: 1, perPage: 20) {
      # sort : TIME
      airingSchedules(airingAt_greater: $futureAiringStart, airingAt_lesser: $futureAiringEnd, sort: TIME) {
        id
        episode
        airingAt
        media {
          ...mediaFragment
        }
      }
    }
    trending: Page(page: 1, perPage: 10) {
      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
        ...mediaFragment
      }
    }
    season: Page(page: 1, perPage: 10) {
      media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...mediaFragment
      }
    }
    nextSeason: Page(page: 1, perPage: 10) {
      media(season: $nextSeason, seasonYear: $nextYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...mediaFragment
      }
    }
  }

  fragment mediaFragment on Media {
    id
    title {
      userPreferred
    }
    coverImage {
      extraLarge
      large
    }
    isAdult
  }
`;

const MEDIA_QUERY = gql`
  query getMedia($id: Int) {
    Media(id: $id, type: ANIME, isAdult: false) {
      id
      title {
        userPreferred
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
      }
      bannerImage
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      description
      season
      seasonYear
      type
      format
      status(version: 2)
      episodes
      duration
      chapters
      volumes
      genres
      synonyms
      source(version: 3)
      isAdult
      meanScore
      averageScore
      popularity
      hashtag
      countryOfOrigin
      isLicensed
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
          }
        }
      }
      streamingEpisodes {
        site
        title
        thumbnail
        url
      }
      trailer {
        id
        site
      }
    }
  }
`;

export { HOME_QUERY, MEDIA_QUERY };
