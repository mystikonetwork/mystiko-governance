import { test, expect } from '@jest/globals';
import voteTokenClient, { Client } from '../src';

test('test client not init', () => {
  expect(voteTokenClient).toBeInstanceOf(Client);
  expect(voteTokenClient.xzkBalance('0x')).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.vXZkTotalSupply()).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.vXZkBalance('0x')).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.approve('0x', undefined, undefined)).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.approveCostInUSD()).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.deposit('0x', '0x', undefined, undefined)).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.depositCostInUSD()).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.withdraw('0x', '0x', undefined, undefined)).rejects.toThrow(
    /Client not initialized/,
  );
  expect(voteTokenClient.withdrawCostInUSD()).rejects.toThrow(/Client not initialized/);
  expect(voteTokenClient.confirm('0x123')).rejects.toThrow(/Client not initialized/);
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
});
