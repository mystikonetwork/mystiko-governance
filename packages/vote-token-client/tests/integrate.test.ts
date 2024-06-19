import * as dotenv from 'dotenv';
import { expect, test } from '@jest/globals';
import { ethers } from 'ethers';
import { Client } from '../src';

dotenv.config();

test('test balance', async () => {
  const client = new Client(11155111);
  const account = '0xb1a0f47558E8De7C70bd7Ffd3b1099Eadc0B3c0D';
  expect(client).toBeInstanceOf(Client);
  await client.xzkBalance(account).then((balance) => {
    expect(balance).toEqual(123);
  });
  await client.vXZkBalance(account).then((balance) => {
    expect(balance).toEqual(100);
  });
});

test('test deposit and withdraw meet error', async () => {
  const client = new Client(11155111);
  const amount = 1000000000;
  const privateKey = process.env.TESTER_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('TESTER_PRIVATE_KEY is not defined');
  }

  const wallet = new ethers.Wallet(privateKey, client.provider);

  await expect(client.approve(wallet.address, amount)).rejects.toThrow(/Insufficient balance/);
  await expect(client.deposit(wallet.address, wallet.address, amount)).rejects.toThrow(
    /Insufficient approve amount/,
  );
  await expect(client.withdraw(wallet.address, wallet.address, amount)).rejects.toThrow(
    /Insufficient balance/,
  );
  await expect(client.confirm('0x123')).rejects.toThrowError();
});

//
// test('test deposit and withdraw', async () => {
//   const client = new Client(11155111);
//   const amount = 10;
//   const privateKey = process.env.TESTER_PRIVATE_KEY;
//   if (!privateKey) {
//     throw new Error('TESTER_PRIVATE_KEY is not defined');
//   }
//
//   const wallet = new ethers.Wallet(privateKey, client.provider);
//
//   const txApprove = await client.approve(wallet.address, amount);
//   const rspApprove = await wallet.sendTransaction(txApprove);
//   const confirmApprove = await client.confirm(rspApprove.hash, 2, 600000);
//   expect(confirmApprove).toBeTruthy();
//
//   const txDeposit = await client.deposit(wallet.address, wallet.address, amount);
//   const rspDeposit = await wallet.sendTransaction(txDeposit);
//   const confirmDeposit = await client.confirm(rspDeposit.hash, 2, 600000);
//   expect(confirmDeposit).toBeTruthy();
//
//   const txWithdraw = await client.withdraw(wallet.address, wallet.address, amount);
//   const rspWithdraw = await wallet.sendTransaction(txWithdraw);
//   const confirmWithdraw = await client.confirm(rspWithdraw.hash, 2, 600000);
//   expect(confirmWithdraw).toBeTruthy();
// });
