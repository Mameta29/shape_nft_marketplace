# Shape_NFT_MarketPlace

## How to start

1. create .env file in backend directory & .env.local file in frontend directory
2. enter your APIKey & privatekey

```zsh
ALCHEMY_GOERLI_URL=YOUR_DATA
PRIVATE_KEY=YOUR_DATA
```

```zsh
NEXT_PUBLIC_PROJECT_ID=YOUR_DATA
NEXT_PUBLIC_PROJECT_SECRET=YOUR_DATA
```

3. install modules

```zsh
cd frontend && npm i
```

```zsh
cd backend && npm i
```

4. deploy contract

```zsh
cd backend && npm run deploy
```

result example

```zsh
Downloading compiler 0.8.4
Compiled 15 Solidity files successfully
NFTMarket deployed to: 0x149920786500a12dA84185df4B4aAABe975Df5f8
```

5. start frontend

```zsh
cd frontend && yarn dev
```
