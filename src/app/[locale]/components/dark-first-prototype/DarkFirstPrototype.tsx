import { MotionLanguagePrototype } from './MotionLanguagePrototype';
import { PrototypeSwitcher } from './PrototypeSwitcher';
import { VariantEditorialDispatch } from './VariantEditorialDispatch';
import { VariantEvidenceSpine } from './VariantEvidenceSpine';
import { VariantProductLedger } from './VariantProductLedger';
import { type PrototypeVariant, normalizeVariant } from './prototype-content';

interface DarkFirstPrototypeProps {
  variant?: string;
  motion?: string;
}

// Three dark-first homepage compositions, switchable via ?variant=, on the existing /[locale] route.
export function DarkFirstPrototype({
  variant,
  motion,
}: DarkFirstPrototypeProps) {
  const current = normalizeVariant(variant);
  const variants: Record<PrototypeVariant, React.ReactNode> = {
    A: <VariantProductLedger />,
    B: <VariantEditorialDispatch />,
    C: (
      <MotionLanguagePrototype motion={motion}>
        <VariantEvidenceSpine />
      </MotionLanguagePrototype>
    ),
  };

  return (
    <>
      {variants[current]}
      {current !== 'C' && <PrototypeSwitcher current={current} />}
    </>
  );
}
