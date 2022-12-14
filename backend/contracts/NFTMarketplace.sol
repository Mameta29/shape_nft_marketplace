// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.025 ether;
    address payable owner;

    // NFTとリスト状態の情報をマッピング
    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() ERC721("Shape Market", "SHP") {
        owner = payable(msg.sender);
    }

    /* リスト代更新 */
    function updateListingPrice(uint256 _listingPrice) public payable {
        require(
            owner == msg.sender,
            "Only marketplace owner can update listing price."
        );
        listingPrice = _listingPrice;
    }

    /* リスト代を返す */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // setApprovalForAll実装のためParamにoperatorとapprovedを追加
    // mintの段階ではapprovedはfalce
    /* NFTをミントしてマーケットプレイス上に表示 */
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        // _mint(msg.sender, newTokenId);
        _mint(address(this), newTokenId);
        // ToeknURIをセット
        _setTokenURI(newTokenId, tokenURI);
        // setApprovalForAll実装のためParamにoperatorとapprovedを追加
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    // Paramにoperatorとapprovedを追加し
    // setApprovalForAllを実装
    // リストする際はapproved はtrueになる
    function createMarketItem(
        uint256 tokenId,
        uint256 price
    ) private {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender), // setter
            //setApprovalForAll追記によりownerは address(this) ではなくsellerのまま
            payable(msg.sender), // owner
            // payable(address(this)),
            price,
            false
        );

        // setApprovalForAll追記しtransferをコメントアウト
        // setApprovalForAll(operator, approved);
        // setApprovalForAll(address(this), approved);
        // _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            tokenId,
            msg.sender, // seller
            //setApprovalForAll追記によりownerはaddress(this)ではなくsellerのまま
            msg.sender, // owner
            // address(this),
            price,
            false
        );
    }

    // 買ったNFTは2字流通でしか売りに出さない。
    // SBT使用予定なのでresellToken関数は一旦保留
    /* 購入したNFTの売り出し */
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    /* NFTの購入 */
    /* 当事者間のNFT所有権と資金を移転する */
    function createMarketSale(uint256 tokenId) public payable {
        // 金額を取得する。
        uint256 price = idToMarketItem[tokenId].price;
        // 金額と送金されたETHが等しいかチェックする。
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        // owner を上書き
        idToMarketItem[tokenId].owner = payable(msg.sender);
        // soldフラグを更新
        idToMarketItem[tokenId].sold = true;
        // sellerをゼロアドレスに設定。
        idToMarketItem[tokenId].seller = payable(address(0));

        _itemsSold.increment();
        // NFTを移転する。
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(idToMarketItem[tokenId].seller).transfer(msg.value);
    }

    /* リストされ購入されていないNFTを返す */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* ユーザーが購入したNFTのみ返す */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* ユーザーがリストしたNFTのみ返す */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
