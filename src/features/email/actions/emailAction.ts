'use server';

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const client = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
});

const ccEmail = 'sean21cheong@msn.com';

const sourceEmail = process.env.SOURCE_EMAIL ?? '';

export const sendEmail = async (
  name: string,
  sender: string,
  bodyText: string,
) => {
  const input = {
    Source: sourceEmail,
    Destination: { ToAddresses: [sender], CcAddresses: [ccEmail] },
    Message: {
      Subject: { Data: `Thank you for connecting, ${name}`, Charset: 'UTF-8' },
      Body: {
        Html: {
          Data: `Hope you are doing well. I am writing this email to thank you for connecting me. <br /><br /> Below is your message: <br /> <cite>${bodyText}</cite>`,
          Charset: 'UTF-8',
        },
      },
    },
  };

  const command = new SendEmailCommand(input);

  const response = await client.send(command);
  console.log('Send Email Response:', response);
};
