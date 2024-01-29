'use server';

import fetch from 'node-fetch';

interface ZipCloudResponse {
  message: string | null;
  results: Array<{
    address1: string;
    address2: string;
    address3: string;
    kana1: string;
    kana2: string;
    kana3: string;
    prefcode: string;
    zipcode: string;
  }> | null;
  status: number;
}

interface AddressResult {
  status: number;
  message: string;
  address1?: string;
  address2?: string;
  address3?: string;
}

export const getAddressFromZipCode = async (
  zipCode: string,
): Promise<AddressResult> => {
  const zipCloudApiURL = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`;

  try {
    const response = await fetch(zipCloudApiURL);
    const data = (await response.json()) as ZipCloudResponse;

    if (!response.ok || data.status !== 200) {
      console.error('Failed to get address from ZipCloud:', data.message);
      return {
        status: data.status || response.status,
        message: `Failed to get address from ZipCloud: ${data.message || 'Unknown Error'}`,
      };
    }

    if (data.results && data.results[0]) {
      const { address1, address2, address3 } = data.results[0];
      return {
        status: 200,
        message: 'Successfully retrieved address',
        address1,
        address2,
        address3,
      };
    } else {
      return {
        status: 404,
        message: 'No address found for the provided zip code',
      };
    }
  } catch (error) {
    console.error('Error fetching address from ZipCloud:', error);
    return {
      status: 500,
      message: `Error fetching address from ZipCloud: ${error instanceof Error ? error.message : 'Unknown Error'}`,
    };
  }
};
