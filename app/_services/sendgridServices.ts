'use server';

import sgMail from '@sendgrid/mail';

const sendGridApiKey = process.env.SENDGRID_PURCHASE_API_KEY;
const sendGridFromEmail = process.env.SENDGRID_THANKS_FROM_EMAIL;

if (!sendGridApiKey || !sendGridFromEmail) {
  throw new Error(
    'SendGrid API key or from email is not set in environment variables',
  );
}

sgMail.setApiKey(sendGridApiKey);

export const sendEmailWithSendGrid = async (
  to: string,
  subject: string,
  text: string,
): Promise<{ status: number; message: string }> => {
  const msg = {
    to,
    from: sendGridFromEmail,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    return { status: 200, message: 'Successfully sent Email' };
  } catch (error) {
    console.error('Error sent Email:', error);
    return {
      status: 500,
      message: `Error sent Email: ${error}`,
    };
  }
};
