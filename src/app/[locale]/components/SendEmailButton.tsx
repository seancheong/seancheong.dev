import { Button, ButtonProps } from '@/components/ui/button';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const SendEmailButton = (props: ButtonProps) => {
  const t = useTranslations('Common');

  return (
    <Button asChild {...props}>
      <Link href={`mailto:${process.env.SOURCE_EMAIL}?subject=${t('subject')}`}>
        <EnvelopeClosedIcon />
        {t('send-email')}
      </Link>
    </Button>
  );
};
