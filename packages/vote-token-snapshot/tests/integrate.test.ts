import { test, expect } from '@jest/globals';
import voteTokenSnapshot from '../src';

test('test snapshot index', async () => {
  voteTokenSnapshot.initialize();
  const snapshots = await voteTokenSnapshot.listSnapshotIndexes();
  expect(snapshots).toBeDefined();
  expect(snapshots.length).toBeGreaterThan(0);
  expect(snapshots[0].blockHeight).toBe(20206222);
  expect(snapshots[0].timestamp).toBe(1719771251);
  expect(snapshots[1].blockHeight).toBe(20214242);
  expect(snapshots[1].timestamp).toBe(1719867911);
});

test('test latest snapshot data', async () => {
  voteTokenSnapshot.initialize();
  const latestSnapshotData = await voteTokenSnapshot.snapshotData();
  expect(latestSnapshotData).toBeDefined();
  expect(latestSnapshotData.blockHeight).toBeGreaterThan(20206222);
  expect(latestSnapshotData.timestamp).toBeGreaterThan(1719771251);
  expect(latestSnapshotData.total).toBeGreaterThan(100);
  expect(latestSnapshotData.holders.length).toBe(latestSnapshotData.total);
  expect(latestSnapshotData.holders[0].account).toBeDefined();
  expect(latestSnapshotData.holders[0].amount).toBeGreaterThan(1);
  expect(latestSnapshotData.holders[0].amount).toBeGreaterThan(latestSnapshotData.holders[1].amount);
});

test('test  snapshot data', async () => {
  voteTokenSnapshot.initialize();
  const latestSnapshotData = await voteTokenSnapshot.snapshotData(20206222);
  expect(latestSnapshotData).toBeDefined();
  expect(latestSnapshotData.blockHeight).toBe(20206222);
  expect(latestSnapshotData.timestamp).toBe(1719771251);
  expect(latestSnapshotData.total).toBeGreaterThan(20);
  expect(latestSnapshotData.holders.length).toBe(latestSnapshotData.total);
  expect(latestSnapshotData.holders[0].account).toBeDefined();
  expect(latestSnapshotData.holders[0].amount).toBeGreaterThan(1);
  expect(latestSnapshotData.holders[0].amount).toBeGreaterThan(latestSnapshotData.holders[1].amount);

  const latestSnapshotData2 = await voteTokenSnapshot.snapshotData(20214242);
  expect(latestSnapshotData2).toBeDefined();
  expect(latestSnapshotData2.blockHeight).toBe(20214242);
  expect(latestSnapshotData2.timestamp).toBe(1719867911);
  expect(latestSnapshotData2.total).toBeGreaterThan(20);
  expect(latestSnapshotData2.holders.length).toBe(latestSnapshotData2.total);
  expect(latestSnapshotData2.holders[0].account).toBeDefined();
  expect(latestSnapshotData2.holders[0].amount).toBeGreaterThan(1);
  expect(latestSnapshotData2.holders[0].amount).toBeGreaterThan(latestSnapshotData2.holders[1].amount);
});
