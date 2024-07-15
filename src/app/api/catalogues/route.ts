import { API_ENDPOINTS } from '@/constants/api';
import { getFromStorage } from '@/utils/localstorage';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const { client_secret } = process.env;
  if (!client_secret) {
    return NextResponse.json({
      error: 'Secret key is missing. Check .env variables.',
    });
  }

  // const access_resp = getFromStorage('logInResp');
  // const access_token: string = access_resp !== null ? JSON.parse(access_resp).access_token : '';
  // if (!access_token) {
  //   return NextResponse.json({
  //     error: 'Access Token is missing. Check .env variables.',
  //   });
  // }
  console.log(client_secret);

  const response = await fetch(`${API_ENDPOINTS.CATALOGUES}?${searchParams}`, {
    headers: {
      method: 'GET',
      // Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
      'X-Api-App-Id': client_secret,
    },
  });
  const data = await response.json();

  return NextResponse.json(data);
}
