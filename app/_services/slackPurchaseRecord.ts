'use server';

import fetch from 'node-fetch';

import { CustomerType } from '@/_stores/customerState';

async function sendToSlack(purchaseData: CustomerType): Promise<void> {
  const slackWebhookURL = process.env.SLACK_PURCHASE_WEBHOOK_URL;

  if (!slackWebhookURL) {
    console.error('Slack webhook URL is not set.');
    return;
  }

  const message = {
    text: `New Purchase Record`,
    attachments: [
      {
        color: '#36a64f',
        fields: Object.entries(purchaseData).map(([key, value]) => ({
          title: key,
          value: value || 'N/A',
          short: true,
        })),
      },
    ],
  };

  try {
    const response = await fetch(slackWebhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error('Failed to send data to Slack:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending data to Slack:', error);
  }
}

export default sendToSlack;
