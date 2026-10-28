import { Button } from '@/components/ui/button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Link from 'next/link';
import { expect, test, vi } from 'vitest';

test('a keyboard user can activate a named button once', async () => {
  const action = vi.fn();
  const user = userEvent.setup();
  render(<Button onClick={action}>Contact Sean</Button>);
  await user.tab();
  expect(screen.getByRole('button', { name: 'Contact Sean' })).toHaveFocus();
  await user.keyboard('{Enter}');
  expect(action).toHaveBeenCalledTimes(1);
});

test('a disabled action is unavailable to keyboard users', async () => {
  const action = vi.fn();
  const user = userEvent.setup();
  render(
    <Button disabled onClick={action}>
      Contact Sean
    </Button>,
  );
  await user.tab();
  expect(screen.getByRole('button')).not.toHaveFocus();
  await user.click(screen.getByRole('button'));
  expect(action).not.toHaveBeenCalled();
});

test('composed navigation retains native link semantics', () => {
  render(
    <Button asChild>
      <Link href="/en#projects">Explore projects</Link>
    </Button>,
  );
  expect(
    screen.getByRole('link', { name: 'Explore projects' }),
  ).toHaveAttribute('href', '/en#projects');
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

if (process.env.HARNESS_FAILURE === 'unit') {
  test('intentional unit failure artifact probe', () => {
    expect('intentional failure').toBe('passing');
  });
}
