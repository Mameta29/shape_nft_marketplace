# Shape_NFT_MarketPlace

## How to start

1. create `.env` file in backend directory & `.env.local` file in frontend directory
2. enter your APIKey & privatekey

```zsh
ALCHEMY_GOERLI_URL=YOUR_DATA
ALCHEMY_MUMBAI_URL=YOUR_DATA
PRIVATE_KEY=YOUR_DATA
```

```zsh
NEXT_PUBLIC_PROJECT_ID=YOUR_DATA
NEXT_PUBLIC_PROJECT_SECRET=YOUR_DATA
```

3. install modules

```bash
cd frontend && npm i
```

```bash
cd backend && npm i
```

4. deploy contract

```bash
cd backend && npm run deploy --network <network_name>
```

result example

```zsh
=================================================================
NFTMarket deployed to:  0xA1a196ee107067Bf34F69fadb4997Ab2D5f66827
=================================================================
```

5. start frontend

```bash
cd frontend && yarn dev
```

### contract address

| network           | contract address                             |
| ----------------- | -------------------------------------------- |
| Munmbai Network   | [0](https://mumbai.polygonscan.com/address/) |
| Shibuya Network   | [0](https://blockscout.com/shibuya/address/) |
| Shiden            | [0](https://blockscout.com/shiden/address/)  |
| Avalanche testnet | [0](https://testnet.snowtrace.io/address/)   |
| goerli            | [0x290C4c22069B6801f2ba587A8cBba87d37d4980C](https://goerli.etherscan.io/address/0x290C4c22069B6801f2ba587A8cBba87d37d4980C)    |
| sepolia           | [0](https://sepolia.etherscan.io/address/)   |
| BSC Testnet       | [0](https://testnet.bscscan.com/address/)    |
| Astar Network     | [0](https://blockscout.com/astar/address/)   |

### Slashを介したNFT購入フロー

[![](https://mermaid.ink/img/pako:eNqNkstKw0AYhV8lzMKN9QVmURDFpZu6zGZIRlPMzWSykFIwE2gLVlBBRDfBolkorRRRNO3b_M3Ft3DSWK0UrbMYfpjzzTmcmQZSLJUijFx64FFToZt1sucQQzYlsVid6RRLrk5cDfj5ZHQM_iX4YTqM09cOBBcQ9CEYl2IIIjEDfxH7WrW6WtOITddtG0vAn4HfQtAB_wF4D_gj8BHwt2Xc9tZOdhXnN9088tMhL-Wz46m0CLZhmcwhCsNSGStpR9lpKzkbg_-UtGOR-BOcFy-jB6Gw_Y0rEnxzXylLdCHr_9G__KaFJIPuJG69H11n4d1iG_NF_tSuFEa9OL8_QRVkUMcgdVW8eaO4Q0ZMowaVERajSpx9GclmU-iIx6zaoakgzByPVpBnq4TN_gfCu0R3afMD4XQHBw?type=png)](https://mermaid.live/edit#pako:eNqNkstKw0AYhV8lzMKN9QVmURDFpZu6zGZIRlPMzWSykFIwE2gLVlBBRDfBolkorRRRNO3b_M3Ft3DSWK0UrbMYfpjzzTmcmQZSLJUijFx64FFToZt1sucQQzYlsVid6RRLrk5cDfj5ZHQM_iX4YTqM09cOBBcQ9CEYl2IIIjEDfxH7WrW6WtOITddtG0vAn4HfQtAB_wF4D_gj8BHwt2Xc9tZOdhXnN9088tMhL-Wz46m0CLZhmcwhCsNSGStpR9lpKzkbg_-UtGOR-BOcFy-jB6Gw_Y0rEnxzXylLdCHr_9G__KaFJIPuJG69H11n4d1iG_NF_tSuFEa9OL8_QRVkUMcgdVW8eaO4Q0ZMowaVERajSpx9GclmU-iIx6zaoakgzByPVpBnq4TN_gfCu0R3afMD4XQHBw)

### 参考文献

1. [jsmasterypro-nft-marketplace](https://gitfront.io/r/user-6930330/yQ8XwQZYNAat/jsmasterypro-nft-marketplace/)
2. [ERC721: transfer caller is not owner nor approved](https://stackoverflow.com/questions/69302320/erc721-transfer-caller-is-not-owner-nor-approved)
3. [sepolia faucet](https://sepoliafaucet.net/)
4. [sepolia faucet2](https://faucet-sepolia.rockx.com/)
5. [Slash](https://slash.fi/)
6. [NFT発行フロー](https://mermaid.live/edit#pako:eNqNkstKw0AYhV8lzMKN9QVmURDFpZu6zGZIRlPMzWSykFIwE2gLVlBBRDfBolkorRRRNO3b_M3Ft3DSWK0UrbMYfpjzzTmcmQZSLJUijFx64FFToZt1sucQQzYlsVid6RRLrk5cDfj5ZHQM_iX4YTqM09cOBBcQ9CEYl2IIIjEDfxH7WrW6WtOITddtG0vAn4HfQtAB_wF4D_gj8BHwt2Xc9tZOdhXnN9088tMhL-Wz46m0CLZhmcwhCsNSGStpR9lpKzkbg_-UtGOR-BOcFy-jB6Gw_Y0rEnxzXylLdCHr_9G__KaFJIPuJG69H11n4d1iG_NF_tSuFEa9OL8_QRVkUMcgdVW8eaO4Q0ZMowaVERajSpx9GclmU-iIx6zaoakgzByPVpBnq4TN_gfCu0R3afMD4XQHBw)

### 開発メモ
1. NFT作成の際に日本語ではなく英語入力にする
👉postの際に日本語の情報をヘッダに入れることでエラーとなる。