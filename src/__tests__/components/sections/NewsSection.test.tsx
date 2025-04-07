import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

vi.mock('@/hooks/getContents', () => ({
  useClient: () => ({
    getContents: vi.fn().mockResolvedValue({
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
    }),
  }),
}));

import { NewsSection } from '@/components/sections/NewsSection';

vi.mock('@graphcms/rich-text-react-renderer', () => ({
  RichText: ({ content }: any) => <div data-testid="rich-text">Mocked Rich Text</div>,
}));

describe('NewsSection', () => {
  it('renders correctly with news data', async () => {
    render(await NewsSection());
    
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByTestId('rich-text')).toBeInTheDocument();
  });
});
