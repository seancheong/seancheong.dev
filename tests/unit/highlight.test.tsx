import {
  MotionHighlight,
  MotionHighlightItem,
} from '@/components/animate-ui/effects/motion-highlight';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

test('decorative project highlighting does not invent a selectable link role', () => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
      unobserve() {}
    },
  );
  render(
    <MotionHighlight mode="parent" hover>
      <div>
        <MotionHighlightItem asChild>
          <a href="https://example.com/project">View project</a>
        </MotionHighlightItem>
      </div>
    </MotionHighlight>,
  );
  const link = screen.getByRole('link', { name: 'View project' });
  expect(link).not.toHaveAttribute('aria-selected');
  expect(link).toHaveAttribute('href', 'https://example.com/project');
});
