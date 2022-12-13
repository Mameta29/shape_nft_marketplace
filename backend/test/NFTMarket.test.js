const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');

describe('NFTMarketplace', function () {

      //　テスト用の変数
      const NAME ='Shape Market';
      const SYMBOL = 'SHP';
      const BASE_URL = 'ipfs://bafybeihcyruaeza7uyjd6ugicbcrqumejf6uf353e5etdkhotqffwtguva';

      /**
       * deploy function
       * @returns
       */
      async function deployContract() {
            const [owner, otherAccount] = await ethers.getSigners();

            const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
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
                  // console.log("price:", Number(price));
                  // 名前とシンボル、リストした価格などの情報を確認
                  expect(await market.name()).to.eql(NAME);
                  expect(await market.symbol()).to.eql(SYMBOL);
                  expect(Number(price)).to.eql(Number(web3.utils.toWei('0.025')));
            });

            it("get init nfts", async function () {
                  // コントラクトをデプロイ
                  const { market } = await loadFixture(deployContract);
                  // get market items (この時点では初期段階なので空)
                  const items = await market.fetchMarketItems();
                  // check
                  expect(items).to.eql([]);
            });

            it("get init fetch nfts", async function () {
                  // コントラクトをデプロイ
                  const { market } = await loadFixture(deployContract);
                  // get market items (この時点では初期段階なので空)
                  const items = await market.fetchMyNFTs();
                  // check
                  expect(items).to.eql([]);
            });

            it("get init listed nfts", async function () {
                  // コントラクトをデプロイ
                  const { market } = await loadFixture(deployContract);
                  // get market items (この時点では初期段階なので空)
                  const items = await market.fetchItemsListed();
                  // check
                  expect(items).to.eql([]);
            });
      });

      /**
       * change price
       */
      describe("change price", function () {
            it("change listPrice test", async function () {
                  // コントラクトをデプロイ
                  const { market } = await loadFixture(deployContract);
                  // 更新後のprice
                  const newPrice = web3.utils.toWei('0.029');
                  // change
                  await market.updateListingPrice(newPrice);
                  // get listprice
                  var price = await market.getListingPrice();
                  // check
                  expect(Number(price)).to.eql(Number(newPrice));
            });
      });

      /**
       * create Token test code
       */
      describe("create token", function () {
            it("create token test", async function () {
                  // コントラクトをデプロイ
                  const { market, owner} = await loadFixture(deployContract);
                  // price
                  const price = web3.utils.toWei('0.025');
                  // create token
                  const id = await market.createToken(BASE_URL, price, owner.getAddress(), true, {
                        value: price
                  });
                  // check
                  expect(id).to.eql(1);
            });
      });
});