'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { PropsWithChildren, useEffect, useRef } from 'react';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  hiddentop: { opacity: 0, y: -50 },
  visibletop: { opacity: 1, y: 0 },
  hiddenbottom: { opacity: 0, y: 50 },
  visiblebottom: { opacity: 1, y: 0 },
  hiddenleft: { opacity: 0, x: -50 },
  visibleleft: { opacity: 1, x: 0 },
  hiddenright: { opacity: 0, x: 50 },
  visibleright: { opacity: 1, x: 0 },
};

interface Props {
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Reveal = ({
  children,
  direction,
  delay = 0.5,
}: PropsWithChildren<Props>) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start(`visible${direction || ''}`);
    }
  }, [isInView, controls, direction]);

  return (
    <div ref={ref}>
      <motion.div
        variants={variants}
        initial={`hidden${direction || ''}`}
        animate={controls}
        transition={{ duration: 0.6, delay }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
