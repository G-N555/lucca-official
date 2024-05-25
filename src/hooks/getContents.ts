import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const useClient = () => {
  const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: process.env.NEXT_PUBLIC_HYPGRAPH_URL,
        // you can disable result caching here if you want to
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        fetchOptions: { cache: 'no-store' },
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
