import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const useClient = () => {
  const getContents = (query: string) => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_HYPGRAPH_URL,
      cache: new InMemoryCache(),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return client.query({
      query: gql(query),
    });
  };

  return {
    getContents,
  };
};
