import { test, expect } from '@jest/globals';
import voteTokenSnapshot, { Snapshot } from '../src';

test('test client not init', () => {
  expect(voteTokenSnapshot).toBeInstanceOf(Snapshot);
  expect(voteTokenSnapshot.listSnapshotIndexs()).rejects.toThrow(/Client not initialized/);
  voteTokenSnapshot.initialize();
});
