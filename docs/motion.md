# Portfolio Motion

Import `Reveal`, `PointerSpotlight`, and `MotionPolicy` from
`@/portfolio-motion`. The locale layout loads `@/portfolio-motion/styles.css`
once, places `MotionPolicy` around the shell, and mounts one `PointerSpotlight`.
Motion has no content, routing or journey dependencies.

The public CSS tokens are `--motion-fast` (120ms), `--motion-standard` (220ms),
`--motion-ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`), and
`--motion-reveal-travel` (12px). Use fast timing for immediate pointer feedback
and standard timing for a one-time reveal. Reduced motion sets both durations
and travel to zero, disables CSS animations/transitions, and configures retained
Motion consumers to respect the user's preference. `motion` is the sole Motion
runtime; do not add a direct `framer-motion` dependency.

`Reveal` accepts ordinary div props and children. Keep the native section,
heading, link or button inside it; it introduces no role or tab stop. Server HTML
is fully visible, with opacity 1 and no initial transform. An observer starts a
220ms transform-only 12px reveal on the first intersection. Content already in
the viewport at hydration stays still. There is no fade, hidden/armed state,
stagger, delay or reading-progress UI. Keyboard focus immediately cancels motion.
Reduced-motion changes cancel it permanently for that mounted region. Missing
IntersectionObserver leaves content static. Animation completion disconnects and
removes the enhancement state. Journeys should opt in only at meaningful section
boundaries, avoiding the header, introduction and critical text on initial load.

The spotlight is a decorative, aria-hidden, pointer-transparent clipped viewport
layer with a 1.1%-opacity violet radial gradient. Only a real mouse on a
hover-capable fine-pointer device enables it. Pointer coordinates update the
transform once per animation frame without React renders. Touch, pen, keyboard
input, window blur, pointer exit and reduced motion hide it. Preference/capability
changes update listeners; unmount cancels pending work. It cannot create a tab
stop, intercept a click or widen the page.

The retained homepage uses Reveal for Experience and Projects. It keeps its
existing content and section semantics until the journey replacements. Its old
location-icon loop is removed. Contextual legacy icon/project effects remain
owned by the homepage replacement, not exported as motion policy. The accepted
career-timeline progress rail is a homepage-specific treatment under #44, separate
from the rejected page reading-progress bar.

Run `pnpm test:unit`, `pnpm build`, `pnpm test:browser`, `pnpm test:axe` and
`pnpm test:performance` using the locked toolchain. Browser contracts exercise
normal/reduced motion, live preference changes, focus, touch, pen, passive
spotlight behavior, once-only replay prevention and JavaScript-disabled content
in Chromium, Firefox and WebKit. Engine emulation does not replace physical-device
or VoiceOver/NVDA release checks. Performance collection reports existing legacy
budget failures; strict release acceptance remains required by #48.
