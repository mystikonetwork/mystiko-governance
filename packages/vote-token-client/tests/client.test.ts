import { test, expect } from '@jest/globals';
import { Client } from '../src';

test('test balance', () => {
  const client = new Client();
  expect(client).toBeInstanceOf(Client);
  //
  // const account = '0xb1a0f47558E8De7C70bd7Ffd3b1099Eadc0B3c0D';
  // expect(client).toBeInstanceOf(Client);
  // await client.xzkBalance(account).then((balance) => {
  //   expect(balance).toEqual(0);
  // });
  // await client.vXZkBalance(account).then((balance) => {
  //   expect(balance).toEqual(0);
  // });
});
