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

[![](https://mermaid.ink/img/pako:eNqVU09LAkEc_Soyhy7VF9hDEEXHLnbcy-BOKelq63gIEZoZKCEDCyMKwrKyMjKif7b6bX6uq9-i2R3dlEptD8vAvDe_9968yaJI0iBIQ2mylSFmhCzH8IaFE7oZkh-N0TjRQuk4TkeBH7Wb-8BOgJU7z3ankQdxDOIRREuBQVTlGvi7_M8vLMyGozhFFlMpLQT8Dfg1iDywB-AV4E_Am8A_J_FWV9bcU7t7WehWWeeZK_hg24d6wnyoUuSWmr3zipzSYx_ubbNP6IMCwlLSpBaOUE2RnL2qW9x1DlvAXpw9WzpUPByn_WPbjUdf-R2Ie08qK0hZbqnsh1EDJlO5kqk4F69OMa_IweDBsJ_TQyPj62XpcxzXs_3NDaJR9OGAgpCmp0_S7Efs1Atte7e3c-aWbxSBxNNkmoj-nYyqFYgHEEUQQhZmemtjuX-7C6SPGDSNXzoU9NNfAav_Xruhng5XfDTIGe8mKna3doDmUIJYCRwz5GvMemfoiEZJguhIk0sDW5s60s2cxOEMTYa3zQjSqJUhcyiTMjAdvFykrWN5L7kvtPLKpw?type=png)](https://mermaid.live/edit#pako:eNqVU09LAkEc_Soyhy7VF9hDEEXHLnbcy-BOKelq63gIEZoZKCEDCyMKwrKyMjKif7b6bX6uq9-i2R3dlEptD8vAvDe_9968yaJI0iBIQ2mylSFmhCzH8IaFE7oZkh-N0TjRQuk4TkeBH7Wb-8BOgJU7z3ankQdxDOIRREuBQVTlGvi7_M8vLMyGozhFFlMpLQT8Dfg1iDywB-AV4E_Am8A_J_FWV9bcU7t7WehWWeeZK_hg24d6wnyoUuSWmr3zipzSYx_ubbNP6IMCwlLSpBaOUE2RnL2qW9x1DlvAXpw9WzpUPByn_WPbjUdf-R2Ie08qK0hZbqnsh1EDJlO5kqk4F69OMa_IweDBsJ_TQyPj62XpcxzXs_3NDaJR9OGAgpCmp0_S7Efs1Atte7e3c-aWbxSBxNNkmoj-nYyqFYgHEEUQQhZmemtjuX-7C6SPGDSNXzoU9NNfAav_Xruhng5XfDTIGe8mKna3doDmUIJYCRwz5GvMemfoiEZJguhIk0sDW5s60s2cxOEMTYa3zQjSqJUhcyiTMjAdvFykrWN5L7kvtPLKpw)

### 参考文献

1. [jsmasterypro-nft-marketplace](https://gitfront.io/r/user-6930330/yQ8XwQZYNAat/jsmasterypro-nft-marketplace/)
2. [ERC721: transfer caller is not owner nor approved](https://stackoverflow.com/questions/69302320/erc721-transfer-caller-is-not-owner-nor-approved)
3. [sepolia faucet](https://sepoliafaucet.net/)
4. [sepolia faucet2](https://faucet-sepolia.rockx.com/)
5. [Slash](https://slash.fi/)
6. [NFT決済フロー](https://mermaid.live/edit#pako:eNqVU09LAkEc_Soyhy7VF9hDEEXHLnbcy-BOKelq63gIEZoZKCEDCyMKwrKyMjKif7b6bX6uq9-i2R3dlEptD8vAvDe_9968yaJI0iBIQ2mylSFmhCzH8IaFE7oZkh-N0TjRQuk4TkeBH7Wb-8BOgJU7z3ankQdxDOIRREuBQVTlGvi7_M8vLMyGozhFFlMpLQT8Dfg1iDywB-AV4E_Am8A_J_FWV9bcU7t7WehWWeeZK_hg24d6wnyoUuSWmr3zipzSYx_ubbNP6IMCwlLSpBaOUE2RnL2qW9x1DlvAXpw9WzpUPByn_WPbjUdf-R2Ie08qK0hZbqnsh1EDJlO5kqk4F69OMa_IweDBsJ_TQyPj62XpcxzXs_3NDaJR9OGAgpCmp0_S7Efs1Atte7e3c-aWbxSBxNNkmoj-nYyqFYgHEEUQQhZmemtjuX-7C6SPGDSNXzoU9NNfAav_Xruhng5XfDTIGe8mKna3doDmUIJYCRwz5GvMemfoiEZJguhIk0sDW5s60s2cxOEMTYa3zQjSqJUhcyiTMjAdvFykrWN5L7kvtPLKpw)
7. [chainlink](https://docs.chain.link/data-feeds/price-feeds/)
8. [【Qita】markdownでシーケンス図を書こう](https://qiita.com/konitech913/items/90f91687cfe7ece50020)
9. [dogechain faucet](https://faucet.dogechain.dog/)
10. [slashロゴデータ](https://slash.fi/media_kit)
11. [【Slash】Implement Frontend and Integrate APIs](https://slash-fi.gitbook.io/docs/integration-guide/integration-guide/window-widget-integration/implement-frontend-and-integrate-apis)
12. [slashApp dashboard](https://testnet.slash.fi/admin/dashboard)
13. [https://1-notes.com/javascript-create-a-random-string/](https://1-notes.com/javascript-create-a-random-string/)
14. [slash extension](https://ext.slash.fi/)
15. [【GitHub】slash-extension-nft-minting](https://github.com/mashharuki/slash-extension-nft-minting)
16. [【Figma】shape全体像](https://www.figma.com/file/dklO5wpMlUXHhNfJ2TGzj7/Shape?node-id=0%3A1)
17. [【chainlink】testnet contracts](https://docs.chain.link/any-api/testnet-oracles/)
18. [【chainlink】hackson resources](https://docs.chain.link/resources/hackathon-resources)

### 開発メモ
1. NFT作成の際に日本語ではなく英語入力にする
👉postの際に日本語の情報をヘッダに入れることでエラーとなる。