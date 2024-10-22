# Mystiko Governance

[![build status](https://github.com/mystikonetwork/mystiko-governance/actions/workflows/build.yml/badge.svg)](https://github.com/mystikonetwork/mystiko-governance/actions/workflows/build.yml)

This repository provides a comprehensive governance suite for Mystiko Network, including five key packages:

* [@mystikonetwork/contracts-governance](packages/contracts) - Mystiko Governance Contracts.
* [@mystikonetwork/contracts-abi-governance](packages/abi) - TypeScript ABI for Mystiko Governance Contracts.
* [@mystikonetwork/governance-monitor](packages/monitor) - Monitor for Mystiko Governance Proposals.
* [@mystikonetwork/vote-token-client](packages/vote-token-client) - TypeScript client for XZK and vXZK token operations.
* [@mystikonetwork/vote-token-snapshot](packages/vote-token-snapshot) - Snapshot utility for XZK holders in TypeScript.

To use these utilities, follow the steps below:

1. Log in to your GitHub account using your username and a Personal Access Token (PAC) by running the following command:

```bash
npm login --scope=@mystikonetwork --registry=https://npm.pkg.github.com
```
2. Install the packages you need:
```bash
npm install @mystikonetwork/contracts-governance
npm install @mystikonetwork/contracts-abi-governance
npm install @mystikonetwork/vote-token-client
npm install @mystikonetwork/vote-token-snapshot
```
This setup provides all the necessary tools to manage and interact with Mystiko's governance ecosystem seamlessly.
