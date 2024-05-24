import { ApolloClient, InMemoryCache, TypePolicies, gql } from '@apollo/client';

export const useClient = () => {
  const getContents = (query: string, typePolicies: TypePolicies) => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_HYPGRAPH_URL,
      cache: new InMemoryCache({
        typePolicies,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return client.query({
      query: gql(query),
      fetchPolicy: 'network-only',
    });
  };

  return {
    getContents,
  };
};
