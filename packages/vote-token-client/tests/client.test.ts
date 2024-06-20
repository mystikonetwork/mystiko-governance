import { test, expect } from '@jest/globals';
import voteTokenClient, { Client } from '../src';

test('test balance', () => {
  expect(voteTokenClient).toBeInstanceOf(Client);
  expect(voteTokenClient.confirm('0x123')).rejects.toThrowError();
  voteTokenClient.initialize();
  voteTokenClient.initialize();
  expect(voteTokenClient.confirm('0x123')).rejects.toThrowError();
});
