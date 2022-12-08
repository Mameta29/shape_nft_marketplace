import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe('NFTMarketplace', function () {

      //　テスト用の変数
      const NAME ='Shape Market';
      const SYMBOL = 'SHP';

      /**
       * deploy function
       * @returns
       */
      async function deployContract() {
            const [owner, otherAccount] = await ethers.getSigners();

            const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
            const market = await NFTMarketplace.deploy();
            
            return {
                  market,
                  owner,
                  otherAccount,
            };
      };

      /**
       * init test
       */
      describe("init", function () {
            it("init", async function () {
                  // コントラクトをデプロイ
                  const { market } = await loadFixture(deployContract);
                  // get listprice
                  var price = await market.getListingPrice();
                  console.log("price:", price);
                  // 名前とシンボル、リストした価格などの情報を確認
                  expect(await market.name()).to.eql(NAME);
                  expect(await market.symbol()).to.eql(SYMBOL);
                  expect(await market.getListingPrice()).to.eql(BigNumber.from(0.025));
            });
        });
});