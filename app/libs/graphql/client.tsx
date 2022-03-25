import { GraphQLClient } from 'graphql-request'

const url = process.env.URL_API_ANILIST ? process.env.URL_API_ANILIST : 'https://graphql.anilist.co/url';

export const client = new GraphQLClient(url);