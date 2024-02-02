import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers, waffle } from 'hardhat';

describe('MSTKO Token', () => {
  async function deployMstkoToken() {
    const Token = await ethers.getContractFactory('MstkoToken');
    const token = await Token.deploy();
    return { token };
  }

  describe('Deployment', () => {
    it('Should deploy correctly', async () => {
      const { token } = await loadFixture(deployMstkoToken);
      expect(await token.decimals()).to.equal(18);
      expect(await token.totalSupply()).to.equal(ethers.utils.parseUnits('1000000000', 18));
      const accounts = waffle.provider.getWallets();
      expect(await token.balanceOf(accounts[0].address)).to.equal(ethers.utils.parseUnits('1000000000', 18));
    });
  });
});
