import { MystikoConfig } from '@mystikonetwork/config';
import { DefaultProviderFactory } from '@mystikonetwork/utils';
import { Config } from './config';

const args = process.argv.slice(2);
let chainId = 1;
if (args.length > 0) {
  chainId = parseInt(args[0], 10);
}

async function run(): Promise<number> {
  console.log(`Chain ID: ${chainId}`);
  try {
    const config = new Config(chainId);
    let providerUrls: string[] = [];
    if (chainId === 1) {
      const mystikoConfig = await MystikoConfig.createDefaultMainnetConfig();
      const chainConfig = mystikoConfig.getChainConfig(1);
      providerUrls = chainConfig?.providers.map((p) => p.url) || [];
    } else {
      providerUrls = config.providers;
    }
    const factory = new DefaultProviderFactory();
    const providers = factory.createProvider(providerUrls);
    const governor = config.governorInstance(providers);
    const currentBlockNumber = await providers.getBlockNumber();
    console.log('current block number', currentBlockNumber);
    const startBlock = currentBlockNumber - 7200 - 80;
    const endBlock = currentBlockNumber - 80;
    const filter = governor.filters.ProposalCreated();
    const events = await governor.queryFilter(filter, startBlock, endBlock);
    if (events.length > 0) {
      events.forEach((event: any) => {
        console.log('event args', event.args);
      });
      console.log('!!! Warning Proposal created');
      return 1;
    }
  } catch (e) {
    console.error('run meet error', e);
    return 2;
  }
  console.log('No proposal created');
  return 0;
}

try {
  run().then((r) => {
    process.exit(r);
  });
} catch (e) {
  console.error('run meet error', e);
  process.exit(2);
}
