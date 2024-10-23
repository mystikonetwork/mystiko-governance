import * as dotenv from 'dotenv';
import { expect, test } from '@jest/globals';
import { ethers } from 'ethers';
import { toBN } from '@mystikonetwork/utils';
import { Client } from '../src';
import voteTokenClient from '../src/client';

dotenv.config();

test('test balance ', async () => {
  const client = new Client();
  client.initialize({
    chainId: 11155111,
  });
  client.resetInitStatus();
  expect(client.isInitialized).toBeFalsy();
  client.initialize({ chainId: 11155111 });
  const account = '0xb1a0f47558E8De7C70bd7Ffd3b1099Eadc0B3c0D';
  expect(client).toBeInstanceOf(Client);
  await client.xzkBalance(account).then((balance) => {
    expect(balance).toBeDefined();
  });
  await client.vXZkBalance(account).then((balance) => {
    expect(balance).toBeDefined();
  });
  await client.vXZkTotalSupply().then((totalSupply) => {
    expect(totalSupply).toBeDefined();
  });
});

test('test deposit and withdraw meet error', async () => {
  const client = new Client();
  client.initialize({
    chainId: 11155111,
  });
  const amount = 12345000000;
  const privateKey = process.env.TESTER_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('TESTER_PRIVATE_KEY is not defined');
  }

  const wallet = new ethers.Wallet(privateKey, client.provider);

  await expect(client.approve(wallet.address, undefined, amount)).rejects.toThrow(/Insufficient balance/);
  await expect(client.approve(wallet.address, true, undefined)).toBeTruthy();
  await expect(client.approve(wallet.address, true, amount)).rejects.toThrow(/isMax and amount conflict/);

  await expect(client.deposit(wallet.address, wallet.address, undefined, amount)).rejects.toThrow(
    /Insufficient balance/,
  );
  await expect(client.deposit(wallet.address, wallet.address, true, undefined)).rejects.toThrow(
    /Insufficient approve amount/,
  );
  await expect(client.deposit(wallet.address, wallet.address, true, amount)).rejects.toThrow(
    /isMax and amount conflict/,
  );

  await expect(client.withdraw(wallet.address, wallet.address, undefined, amount)).rejects.toThrow(
    /Insufficient balance/,
  );
  await expect(client.withdraw(wallet.address, wallet.address, true, undefined)).toBeTruthy();
  await expect(client.withdraw(wallet.address, wallet.address, true, amount)).rejects.toThrow(
    /isMax and amount conflict/,
  );

  await expect(client.confirm('0x123')).rejects.toThrowError();
});

test('test deposit and withdraw', async () => {
  const client = new Client();
  client.initialize({
    chainId: 11155111,
  });
  const amount = 10.1245;
  const privateKey = process.env.TESTER_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('TESTER_PRIVATE_KEY is not defined');
  }

  const wallet = new ethers.Wallet(privateKey, client.provider);

  const balanceBeforeXZK = await client.xzkBalance(wallet.address);
  const balanceBeforeVXZK = await client.vXZkBalance(wallet.address);

  const txApprove = await client.approve(wallet.address, undefined, amount);
  if (txApprove) {
    const rspApprove = await wallet.sendTransaction(txApprove);
    const confirmApprove = await client.confirm(rspApprove.hash, 2, 600000);
    expect(confirmApprove).toBeTruthy();
  }

  const txApprove2 = await client.approve(wallet.address, undefined, amount);
  expect(txApprove2).toBeUndefined();

  const txDeposit = await client.deposit(wallet.address, wallet.address, undefined, amount);
  const rspDeposit = await wallet.sendTransaction(txDeposit);
  const confirmDeposit = await client.confirm(rspDeposit.hash, 2, 600000);
  expect(confirmDeposit).toBeTruthy();

  const balanceAfterXZK = await client.xzkBalance(wallet.address);
  const balanceAfterVXZK = await client.vXZkBalance(wallet.address);
  expect(toBN(balanceAfterXZK).eq(toBN(balanceBeforeXZK).sub(toBN(amount)))).toBeTruthy();
  expect(toBN(balanceAfterVXZK).eq(toBN(balanceBeforeVXZK).add(toBN(amount)))).toBeTruthy();

  const txWithdraw = await client.withdraw(wallet.address, wallet.address, undefined, amount);
  const rspWithdraw = await wallet.sendTransaction(txWithdraw);
  const confirmWithdraw = await client.confirm(rspWithdraw.hash, 2, 600000);
  expect(confirmWithdraw).toBeTruthy();

  const balanceAfterXZK2 = await client.xzkBalance(wallet.address);
  const balanceAfterVXZK2 = await client.vXZkBalance(wallet.address);
  expect(balanceAfterXZK2).toEqual(balanceBeforeXZK);
  expect(balanceAfterVXZK2).toEqual(balanceBeforeVXZK);

  // test isMax true
  const txApprove3 = await client.approve(wallet.address, true, undefined);
  if (txApprove3) {
    const rspApprove = await wallet.sendTransaction(txApprove3);
    const confirmApprove3 = await client.confirm(rspApprove.hash, 2, 600000);
    expect(confirmApprove3).toBeTruthy();
  }

  const txApprove4 = await client.approve(wallet.address, true, undefined);
  expect(txApprove4).toBeUndefined();

  const txDeposit3 = await client.deposit(wallet.address, wallet.address, true, undefined);
  const rspDeposit3 = await wallet.sendTransaction(txDeposit3);
  const confirmDeposit3 = await client.confirm(rspDeposit3.hash, 2, 600000);
  expect(confirmDeposit3).toBeTruthy();

  const balanceAfterXZK3 = await client.xzkBalance(wallet.address);
  const balanceAfterVXZK3 = await client.vXZkBalance(wallet.address);
  expect(balanceAfterXZK3).toEqual(0);
  expect(toBN(balanceAfterVXZK3).eq(toBN(balanceAfterXZK2).add(toBN(balanceAfterVXZK2)))).toBeTruthy();

  const txWithdraw3 = await client.withdraw(wallet.address, wallet.address, true, undefined);
  const rspWithdraw3 = await wallet.sendTransaction(txWithdraw3);
  const confirmWithdraw3 = await client.confirm(rspWithdraw3.hash, 2, 600000);
  expect(confirmWithdraw3).toBeTruthy();

  const balanceAfterXZK4 = await client.xzkBalance(wallet.address);
  const balanceAfterVXZK4 = await client.vXZkBalance(wallet.address);
  expect(balanceAfterXZK4).toEqual(balanceBeforeXZK);
  expect(balanceAfterVXZK4).toEqual(0);
});

test('test transfer', async () => {
  const client = new Client();
  client.initialize({
    chainId: 11155111,
  });
  const amount = 1;
  const privateKey = process.env.TESTER_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('TESTER_PRIVATE_KEY is not defined');
  }

  const wallet = new ethers.Wallet(privateKey, client.provider);

  const transferTx1 = await client.vXZKTransfer(wallet.address, amount);
  const tx1 = await wallet.sendTransaction(transferTx1);
  const confirm1 = await client.confirm(tx1.hash, 2, 600000);
  expect(confirm1).toBeTruthy();

  const transferTx2 = await client.vXZKTransfer(wallet.address, amount);
  const tx2 = await wallet.sendTransaction(transferTx2);
  const confirm2 = await client.confirm(tx2.hash, 2, 600000);
  expect(confirm2).toBeTruthy();
});

test('test cost', async () => {
  voteTokenClient.initialize();
  voteTokenClient.initialize();

  const txDepositCost = await voteTokenClient.depositCostInUSD();
  expect(txDepositCost).toBeGreaterThan(0.001);

  const txWithdrawCost = await voteTokenClient.withdrawCostInUSD();
  expect(txWithdrawCost).toBeGreaterThan(0.001);
});
