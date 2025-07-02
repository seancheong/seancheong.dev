'use client';

import {
  type IconProps,
  IconWrapper,
  getVariants,
  useAnimateIconContext,
} from '@/components/animate-ui/icons/icon';
import { type Variants, motion } from 'motion/react';
import * as React from 'react';

type UserRoundProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    path: {
      initial: {
        y: 0,
      },
      animate: {
        y: [0, 4, -2, 0],
        transition: {
          duration: 0.6,
          ease: 'easeInOut',
        },
      },
    },
    circle: {
      initial: {
        y: 0,
      },
      animate: {
        y: [0, 1, -2, 0],
        transition: {
          duration: 0.6,
          ease: 'easeInOut',
        },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: UserRoundProps) {
  const {
    controls,
    animation: animationType,
    loop,
    loopDelay,
  } = useAnimateIconContext();
  const variants = getVariants(animations, animationType, loop, loopDelay);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.path
        d="M20 21a8 8 0 0 0-16 0"
        variants={variants.path}
        initial="initial"
        animate={controls}
      />
      <motion.circle
        cx={12}
        cy={8}
        r={5}
        variants={variants.circle}
        initial="initial"
        animate={controls}
      />
    </motion.svg>
  );
}

function UserRound(props: UserRoundProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  UserRound,
  UserRound as UserRoundIcon,
  type UserRoundProps,
  type UserRoundProps as UserRoundIconProps,
};
