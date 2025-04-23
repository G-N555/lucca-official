import { vi } from 'vitest';

vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn(),
  }),
}));

vi.stubGlobal('process', {
  ...process,
  env: {
    ...process.env,
    NEXT_PUBLIC_HYPGRAPH_URL: 'https://mock-graphql-endpoint.com',
  },
});
