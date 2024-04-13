'use client';

import { useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import parse from 'html-react-parser';

export default function Home() {
  const [htmlString, setHtmlString] = useState('');
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_HYPGRAPH_URL,
    cache: new InMemoryCache(),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client
    .query({
      query: gql`
        query MyQuery {
          news_all(first: 10) {
            id
            publishedAt
            title
            content {
              html
            }
          }
        }
      `,
    })
    .then((result) => {
      setHtmlString(result.data.news_all[0].content.html);
    });

  return <main>{parse(htmlString)}</main>;
}
