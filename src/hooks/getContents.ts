import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const useClient = () => {
  const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: process.env.NEXT_PUBLIC_HYPGRAPH_URL,
      }),
    });
  });

  const getContents = async (query: string) => {
    const response = await getClient().query({
      query: gql(query),
    });

    return response;
  };

  return {
    getContents,
  };
};
