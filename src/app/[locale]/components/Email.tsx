'use client';

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
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil1Icon } from '@radix-ui/react-icons';
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
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // TODO: implement the send email function
    console.log(values);

    form.reset();
    toast(t('Email.toast.success'));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border bg-container"
      >
        <div className="flex flex-col gap-6 p-6">
          <div className="h-fit w-fit rounded-xl border bg-icon p-3">
            <Pencil1Icon className="h-6 w-6" />
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

          <Button type="submit" className="w-full md:ml-auto md:w-fit">
            {t('Common.send-message')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
