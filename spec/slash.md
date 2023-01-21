# Slashについてのメモ

## Develop your own extension について

以下のISlashCustomPluginに対応したスマートコントラクトを実装することで、独自の拡張機能を開発することが可能。  

https://github.com/mashharuki/slash-extension-nft-minting  


Extensionの実体はスマートコントラクトである。作成にはGASがかかる。  
上の画像にあるように、Extensionを作成するとコントラクトアドレスが生成されます。  
コントラクトアドレスをReceived Addressに設定することで、Extensionが動作するようになる。  

## AstarNetwork(testnet)で使用できる決済コントラクトの情報は下記の通り

https://shibuya.subscan.io/address/0x79b10338bB27729F2D98f5c5683912EBE3EDdc84

