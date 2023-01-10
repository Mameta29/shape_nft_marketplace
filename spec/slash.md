# Slashについてのメモ

## Develop your own extension について

以下のISlashCustomPluginに対応したスマートコントラクトを実装することで、独自の拡張機能を開発することが可能。  

https://github.com/mashharuki/slash-extension-nft-minting  


Extensionの実体はスマートコントラクトである。作成にはGASがかかる。  
上の画像にあるように、Extensionを作成するとコントラクトアドレスが生成されます。  
コントラクトアドレスをReceived Addressに設定することで、Extensionが動作するようになる。  