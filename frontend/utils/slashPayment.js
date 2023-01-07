/**
 * Slash Payment API
 */

import axios from 'axios';
import crypto from 'crypto-js';
import { makeid } from './makeId';

const paymentRequestUrl = 'https://testnet.slash.fi/api/v1/payment/receive';

/**
 * slashPay function
 */
export const slashPay = async () => {
  const amount = 500;
  const amountType = 'JPY';
  const orderCode = `shape-${makeid(15)}`;

  // automatically generated on the merchant management screen
  const authenticationToken = process.env.NEXT_PUBLIC_SLASH_AUTH_TOKEN;
  const hashToken = process.env.NEXT_PUBLIC_SLASH_HASH_TOKEN;
  // encrypt following Slash's manners
  const raw = `${orderCode}::${amount}::${hashToken}`;

  const hash = `${crypto.SHA256(raw, 'utf8').toString()}`;
  console.log('hash:', hash);
  // const hashHex = crypto.createHash('sha256').update(raw, 'utf8').digest('hex');

  // call Paument Request API
  const requestObj = {
    identification_token: authenticationToken,
    order_code: orderCode,
    verify_token: hash,
    amount,
    amount_type: amountType,
    uimode: 'switchable',
  };
  // API request
  const result = await axios.post(paymentRequestUrl, requestObj).catch((error) => error.response);

  if (result.status !== 200) {
    return {
      statusCode: result.status,
      body: JSON.stringify(result.data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  // returned values
  const paymentUrl = result.data.url;
  const paymentToken = result.data.token;
  console.log('paymentUrl:', paymentUrl);
  console.log('paymentToken:', paymentToken);

  return {
    paymentUrl,
    paymentToken,
  };
};
