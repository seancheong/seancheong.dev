'use client';

import { Send } from '@/components/animate-ui/icons/send';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { sendEmail } from '@/features/email/actions/emailAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const Email = () => {
  const t = useTranslations();

  const formSchema = z.object({
    name: z.string().min(3, t('Email.inputs.name.error')),
    email: z.string().email(t('Email.inputs.email.error')),
    message: z.string().min(3, t('Email.inputs.message.error')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, email, message } = values;

    try {
      await sendEmail(name, email, message);

      form.reset();
      toast.success(t('Email.toast.success'));
    } catch (error) {
      console.error(error);

      toast.error(t('Email.toast.error'));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-container rounded-lg border"
      >
        <div className="flex flex-col gap-6 p-6">
          <div className="bg-icon h-fit w-fit rounded-xl border p-3">
            <Send animateOnHover animateOnTap className="h-6 w-6" />
          </div>

          <div className="flex flex-col gap-3">
            <h2>{t('Email.title')}</h2>

            <p>{t('Email.description')}</p>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4 p-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Email.inputs.name.label')}</FormLabel>

                <FormControl>
                  <Input
                    placeholder={t('Email.inputs.name.placeholder')}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Email.inputs.email.label')}</FormLabel>

                <FormControl>
                  <Input
                    placeholder={t('Email.inputs.email.placeholder')}
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  {t('Email.inputs.email.description')}
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Email.inputs.message.label')}</FormLabel>

                <FormControl>
                  <Textarea
                    placeholder={t('Email.inputs.message.placeholder')}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full gap-2 hover:cursor-pointer md:ml-auto md:w-fit"
          >
            <PaperPlaneIcon />
            {t('Common.send-message')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
