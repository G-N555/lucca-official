import { vi } from 'vitest';

export const mockNewsData = {
  data: {
    news_all: [
      {
        id: '1',
        publishedAt: '2023-01-01T12:00:00Z',
        updatedAt: '2023-01-02T12:00:00Z',
        content: {
          raw: {
            type: 'document',
            children: [
              {
                type: 'paragraph',
                children: [{ text: 'Test news content' }],
              },
            ],
          },
        },
      },
    ],
  },
};

vi.mock('@/hooks/getContents', () => ({
  useClient: () => ({
    getContents: vi.fn().mockImplementation((query) => {
      if (query.includes('News')) {
        return mockNewsData;
      }
      return { data: {} };
    }),
  }),
}));
