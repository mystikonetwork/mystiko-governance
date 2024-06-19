import { test, expect } from '@jest/globals';
import { Client } from '../src';

test('test balance', () => {
  const client = new Client();
  expect(client).toBeInstanceOf(Client);

  expect(client.confirm('0x123')).rejects.toThrowError();
});
