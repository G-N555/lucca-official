// THIS FILE IS NOT USED, IT IS JUST AN EXAMPLE OF HOW TO CREATE A GRAPHQL API ROUTE
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { gql } from 'graphql-tag';

// frontend request query
const typeDefs = gql`
  type Profile {
    id: String
    name: String
    age: Int
    isStudent: Boolean
  }

  type Query {
    hello: String
    profile: Profile
  }
`;

// backend resolver
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    profile: () => {
      return {
        id: '1',
        name: 'John Doe',
        age: 30,
        isStudent: false,
      };
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
