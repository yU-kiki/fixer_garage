'use server';

import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

import { CombinedPurchaseType } from '@/_stores/orderState';

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_PURCHASE_SPREADSHEET_ID ?? '',
  serviceAccountAuth,
);

export const saveToSpreadSheetPurchaseRecord = async (
  combinedPurchaseData: CombinedPurchaseType,
): Promise<{ status: number; message: string }> => {
  try {
    await doc.loadInfo();
    const sheetId = 0;

    const sheet = doc.sheetsById[sheetId];
    if (!sheet) {
      console.error('Sheet not found.');
      return { status: 404, message: 'Sheet not found.' };
    }

    await sheet.addRow(combinedPurchaseData);
    return { status: 200, message: 'Successfully save to SpreadSheet' };
  } catch (error) {
    console.error('Error saving data to SpreadSheet:', error);
    return {
      status: 500,
      message: `Error saving data to SpreadSheet: ${error}`,
    };
  }
};
