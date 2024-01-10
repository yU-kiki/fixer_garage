'use server';

import fetch from 'node-fetch';

import { CombinedPurchaseType } from '@/_stores/orderState';

export const sendToSlackPurchaseRecord = async (
  purchaseData: CombinedPurchaseType,
): Promise<{ status: number; message: string }> => {
  const slackWebhookURL = process.env.SLACK_PURCHASE_WEBHOOK_URL;

  if (!slackWebhookURL) {
    console.error('Slack webhook URL is not set.');
    return { status: 500, message: 'Slack webhook URL is not set.' };
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
      return {
        status: response.status,
        message: `Failed to send data to Slack: ${response.statusText}`,
      };
    }

    return { status: 200, message: 'Successfully sent to Slack' };
  } catch (error) {
    console.error('Error sending data to Slack:', error);
    return {
      status: 500,
      message: `Error sending data to Slack: ${error}`,
    };
  }
};
