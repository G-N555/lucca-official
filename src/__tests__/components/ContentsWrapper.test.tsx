import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    className: 'mocked-font-class',
    style: { fontFamily: 'mocked-roboto' },
    variable: '--font-roboto',
    subsets: ['latin'],
  }),
}));

import { ContentsWrapper } from '@/components/ContentsWrapper';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

vi.useFakeTimers();

describe('ContentsWrapper', () => {
  it('does not show content initially', () => {
    render(
      <ContentsWrapper>
        <div data-testid="content">Test Content</div>
      </ContentsWrapper>
    );
    
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it.skip('shows content after timeout', () => {
    render(
      <ContentsWrapper>
        <div data-testid="content">Test Content</div>
      </ContentsWrapper>
    );
    
    vi.advanceTimersByTime(3100);
    
    const content = screen.queryByTestId('content');
    expect(content).not.toBeNull();
  });
});
