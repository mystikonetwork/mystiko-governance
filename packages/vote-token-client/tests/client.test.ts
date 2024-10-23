import { test, expect } from '@jest/globals';
import voteTokenClient, { Client } from '../src';

test('test client not init', () => {
  expect(voteTokenClient).toBeInstanceOf(Client);
  expect(voteTokenClient.getChainId()).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.xzkBalance('0x')).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.vXZkTotalSupply()).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.vXZkBalance('0x')).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.approve('0x', undefined, undefined)).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.deposit('0x', '0x', undefined, undefined)).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.depositCostInUSD()).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.withdraw('0x', '0x', undefined, undefined)).rejects.toThrow(
    /Client not initialized/,
  );
  expect(voteTokenClient.withdrawCostInUSD()).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.confirm('0x123')).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.XZKTransfer('0x123', 1)).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.vXZKTransfer('0x123', 1)).rejects.toThrow(/Client not initialized/);
  voteTokenClient.initialize();
  voteTokenClient.initialize();
  expect(voteTokenClient.approve('0x', true, 1)).rejects.toThrow(/isMax and amount conflict/);
  expect(voteTokenClient.approve('0x', false, undefined)).rejects.toThrow(/isMax and amount conflict/);
  expect(voteTokenClient.approve('0x', undefined, undefined)).rejects.toThrow(/isMax and amount conflict/);
  expect(voteTokenClient.deposit('0x', '0x', true, 1)).rejects.toThrow(/isMax and amount conflict/);
  expect(voteTokenClient.deposit('0x', '0x', false, undefined)).rejects.toThrow(/isMax and amount conflict/);
  expect(voteTokenClient.deposit('0x', '0x', undefined, undefined)).rejects.toThrow(
    /isMax and amount conflict/,
  );
  expect(voteTokenClient.withdraw('0x', '0x', true, 1)).rejects.toThrow(/isMax and amount conflict/);
  expect(voteTokenClient.withdraw('0x', '0x', false, undefined)).rejects.toThrow(/isMax and amount conflict/);
  expect(voteTokenClient.withdraw('0x', '0x', undefined, undefined)).rejects.toThrow(
    /isMax and amount conflict/,
  );

  expect(voteTokenClient.isInitialized).toBe(true);
  expect(voteTokenClient.getChainId()).resolves.toBe(1);
  voteTokenClient.resetInitStatus();
  expect(voteTokenClient.isInitialized).toBe(false);
  voteTokenClient.initialize({ chainId: 11155111 });
  expect(voteTokenClient.isInitialized).toBe(true);
  expect(voteTokenClient.getChainId()).resolves.toBe(11155111);
  expect(voteTokenClient.xzkContractAddress()).resolves.toBe('0x932161e47821c6F5AE69ef329aAC84be1E547e53');
  expect(voteTokenClient.vXZkContractAddress()).resolves.toBe('0xE662feEF4Bb1f25e5eBb4F9f157d37A921Af1587');
});
