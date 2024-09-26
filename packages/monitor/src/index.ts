import { DefaultProviderFactory } from '@mystikonetwork/utils';
import { Config } from './config';

const args = process.argv.slice(2);
let chainId = 1;
if (args.length > 0) {
  chainId = parseInt(args[0], 10);
}

async function run(): Promise<number> {
  console.log(`Chain ID: ${chainId}`);
  const config = new Config(chainId);
  const factory = new DefaultProviderFactory();
  const providers = factory.createProvider(config.providers);
  const governor = config.governorInstance(providers);

  const currentBlockNumber = await providers.getBlockNumber();
  const startBlock = currentBlockNumber - 20000;
  const endBlock = currentBlockNumber - 100;
  const filter = governor.filters.ProposalCreated();
  const events = await governor.queryFilter(filter, startBlock, endBlock);
  if (events.length > 0) {
    events.forEach((event: any) => {
      console.log('event args', event.args);
    });
    console.log('!!! Warning Proposal created');
    return -1;
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
  process.exit(1);
}
