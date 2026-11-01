import { Reveal } from '@/portfolio-motion';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

afterEach(() => vi.restoreAllMocks());

let intersect: (entries: { isIntersecting: boolean }[]) => void;
let preference: () => void;
let reduced = false;
const disconnect = vi.fn();

beforeEach(() => {
  reduced = false;
  disconnect.mockClear();
  vi.stubGlobal('matchMedia', () => ({
    get matches() {
      return reduced;
    },
    addEventListener: (_: string, listener: () => void) => {
      preference = listener;
    },
    removeEventListener: vi.fn(),
  }));
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: typeof intersect) {
        intersect = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    top: 2000,
    bottom: 2500,
    left: 0,
    right: 100,
    width: 100,
    height: 500,
    x: 0,
    y: 2000,
    toJSON() {},
  });
});

test('server content and native controls are visible before enhancement', () => {
  const html = renderToString(
    <Reveal>
      <a href="#depth">Read depth</a>
      <button>Open</button>
    </Reveal>,
  );
  expect(html).toContain('href="#depth"');
  expect(html).toContain('<button>Open</button>');
  expect(html).not.toMatch(/hidden|opacity|data-revealing|tabindex/);
});

test('a reveal runs once and keeps native focus order', () => {
  render(
    <Reveal>
      <a href="#depth">Read depth</a>
    </Reveal>,
  );
  const link = screen.getByRole('link');
  const region = link.parentElement!;
  act(() => intersect([{ isIntersecting: true }]));
  expect(region).toHaveAttribute('data-revealing');
  fireEvent.animationEnd(region);
  act(() => intersect([{ isIntersecting: true }]));
  expect(region).not.toHaveAttribute('data-revealing');
  link.focus();
  expect(link).toHaveFocus();
  expect(link).not.toHaveAttribute('tabindex');
});

test('keyboard focus cancels travel immediately and prevents replay', () => {
  render(
    <Reveal>
      <button>Open depth</button>
    </Reveal>,
  );
  const button = screen.getByRole('button');
  act(() => intersect([{ isIntersecting: true }]));
  button.focus();
  expect(button.parentElement).not.toHaveAttribute('data-revealing');
  act(() => intersect([{ isIntersecting: true }]));
  expect(button.parentElement).not.toHaveAttribute('data-revealing');
});

test('changing reduced-motion preference stops an in-flight reveal permanently', () => {
  render(<Reveal>Evidence</Reveal>);
  act(() => intersect([{ isIntersecting: true }]));
  reduced = true;
  act(() => preference());
  expect(screen.getByText('Evidence')).not.toHaveAttribute('data-revealing');
  reduced = false;
  act(() => intersect([{ isIntersecting: true }]));
  expect(screen.getByText('Evidence')).not.toHaveAttribute('data-revealing');
});

test('initial reduced-motion preference never arms a reveal', () => {
  reduced = true;
  render(<Reveal>Evidence</Reveal>);
  act(() => intersect([{ isIntersecting: true }]));
  expect(screen.getByText('Evidence')).not.toHaveAttribute('data-revealing');
});

test('content remains usable without IntersectionObserver', () => {
  vi.stubGlobal('IntersectionObserver', undefined);
  // Older browsers omit the property entirely.
  Reflect.deleteProperty(window, 'IntersectionObserver');
  render(
    <Reveal>
      <button>Open depth</button>
    </Reveal>,
  );
  expect(screen.getByRole('button')).toBeVisible();
});

test('content already on screen skips entrance motion on hydration', () => {
  vi.mocked(HTMLElement.prototype.getBoundingClientRect).mockReturnValue({
    top: 100,
    bottom: 200,
    left: 0,
    right: 100,
    width: 100,
    height: 100,
    x: 0,
    y: 100,
    toJSON() {},
  });
  render(<Reveal>Visible introduction</Reveal>);
  act(() => intersect([{ isIntersecting: true }]));
  expect(screen.getByText('Visible introduction')).not.toHaveAttribute(
    'data-revealing',
  );
});
