const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const truffleAssert = require("truffle-assertions");

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
            // コントララクトをデプロイする。
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

            it("【error pattern】change listPrice test", async function () {
                  // コントラクトをデプロイ
                  const { market, otherAccount } = await loadFixture(deployContract);
                  // 更新後のprice
                  const newPrice = web3.utils.toWei('0.029');
                  // change
                  await truffleAssert.reverts(
                        market.connect(otherAccount).updateListingPrice(newPrice)
                  );
            });
      });

      /**
       * create Token test code
       */
      describe("create token", function () {
            it("create token test", async function () {
                  // コントラクトをデプロイ
                  const { market, owner, otherAccount} = await loadFixture(deployContract);
                  // price
                  const price = web3.utils.toWei('0.025');
                  // approved flag
                  const approved = true;
                  // create token
                  const id = await market.createToken(BASE_URL, price, otherAccount.getAddress(), approved, {
                        value: price
                  });

                  // get market items 
                  const items = await market.fetchMarketItems();
                  // check
                  expect(items.length).to.eql(1);
            });

            it("【error pattern】create token test", async function () {
                  // コントラクトをデプロイ
                  const { market, owner, otherAccount} = await loadFixture(deployContract);
                  // price
                  const price = web3.utils.toWei('0.025');
                  // approved flag
                  const approved = true;
                  // create token
                  await truffleAssert.reverts(
                        market.createToken(BASE_URL, price, otherAccount.getAddress(), approved)  
                  );
            });

            it("【error pattern2】create token test", async function () {
                  // コントラクトをデプロイ
                  const { market, owner, otherAccount} = await loadFixture(deployContract);
                  // price
                  const price = web3.utils.toWei('0.025');
                  // approved flag
                  const approved = true;
                  // create token
                  await truffleAssert.reverts(
                        market.createToken(BASE_URL, price, otherAccount.getAddress(), approved, {
                              value: web3.utils.toWei('0.024')
                        })  
                  );
            });

            it("create 10 tokens test", async function () {
                  // コントラクトをデプロイ
                  const { market, owner, otherAccount} = await loadFixture(deployContract);
                  // price
                  const price = web3.utils.toWei('0.025');
                  // approved flag
                  const approved = true;
                  
                  for(var i = 0; i < 10; i++) {
                        // create token ✖️ 10
                        const id = await market.createToken(BASE_URL, price, otherAccount.getAddress(), approved, {
                              value: price
                        });
                  }

                  // get market items 
                  const items = await market.fetchMarketItems();
                  // check
                  expect(items.length).to.eql(10);
            });
      });

      /**
       * buy NFT 
       */
      describe("buy NFT", function () {
            it("create token test", async function () {
                  // コントラクトをデプロイ
                  const { market, owner, otherAccount} = await loadFixture(deployContract);

                  // price
                  const price = web3.utils.toWei('0.025');
                  // approved flag
                  const approved = true;
                  // create token
                  const id = await market.createToken(BASE_URL, price, otherAccount.getAddress(), approved, {
                        value: price
                  });

                  // get market items 
                  var items = await market.fetchMarketItems();
                  // get otheraccount's NFT
                  var nfts = await market.connect(otherAccount).fetchMyNFTs();

                  // check
                  expect(items.length).to.eql(1);
                  expect(nfts.length).to.eql(0);

                  // buy NFT
                  await market.connect(otherAccount).createMarketSale(1, {
                        value: price
                  });

                  items = await market.fetchMarketItems();
                  // get otheraccount's NFT
                  nfts = await market.connect(otherAccount).fetchMyNFTs();

                  // check
                  expect(items.length).to.eql(0);
                  expect(nfts.length).to.eql(1);
            });

            it("【pattern2】create token test", async function () {
                  // コントラクトをデプロイ
                  const { market, owner, otherAccount} = await loadFixture(deployContract);
      
                  // price
                  const price = web3.utils.toWei('0.025');
                  // approved flag
                  const approved = true;
                  // create token
                  const id = await market.connect(otherAccount).createToken(BASE_URL, price, owner.getAddress(), approved, {
                        value: price
                  });
      
                  // get market items 
                  var items = await market.fetchMarketItems();
                  // get otheraccount's NFT
                  var nfts = await market.connect(owner).fetchMyNFTs();
      
                  // check
                  expect(items.length).to.eql(1);
                  expect(nfts.length).to.eql(0);
      
                  // buy NFT
                  await market.connect(owner).createMarketSale(1, {
                        value: price
                  });
      
                  items = await market.fetchMarketItems();
                  // get otheraccount's NFT
                  nfts = await market.connect(owner).fetchMyNFTs();
      
                  // check
                  expect(items.length).to.eql(0);
                  expect(nfts.length).to.eql(1);
            });
      });
});