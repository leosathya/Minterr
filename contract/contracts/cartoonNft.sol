// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "erc721a/contracts/ERC721A.sol";


contract cartoonNft is Ownable, ERC721A, ReentrancyGuard {
    uint256 public immutable MAX_SUPPLY = 20;
    uint256 public constant PRICE = 0.05 ether;
    //uint256 public freeNftsCount = 20;
    uint256 public maxNftPerAddress = 4; 
    uint256 public maxNftPerTx = 2;


    bool public _publicMintActive = false; // public sale
    bool public _presaleActive = false; // presale
    bool public _freeMintActive = true; // free mint

    string public _baseTokenURI;
    string public _baseExtension = ".json";

    mapping(address => bool) public allowList;

    constructor() ERC721A("cartoonNfts", "CNFT"){
            _baseTokenURI = "ipfs://QmaCu2DpZygjK16C7FsXvAPJ6LsY4T3DAw4dx1KrnRJVsf/";
        }

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "The caller is another contract");
        _;
    }

    // metadata URI
    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    //set variables
    function setAllowance(address addr) external onlyOwner {
        allowList[addr] = true;
    }

    function publicMintActive(bool isActive) external onlyOwner {
        _publicMintActive = isActive;
    }

    function presaleActive(bool isActive) external onlyOwner {
        _presaleActive = isActive;
    }

    function freeMintActive(bool isActive) external onlyOwner {
        _freeMintActive = isActive;
    }


    // free mint
    function freeMint(uint256 quantity)
        external
        payable
        nonReentrant
        callerIsUser
    {
        require(quantity > 0, "Must mint more than 0 tokens");
        require(_freeMintActive, "free mint not active");
        require(quantity <= maxNftPerTx, "exceeds max per transaction");
        require(
            balanceOf(msg.sender) + quantity <= maxNftPerAddress,
            "exceeds max per address"
        );
        require(totalSupply() + quantity <= MAX_SUPPLY, "reached max supply");

        _safeMint(msg.sender, quantity);
    }

    // preSale mint
    function preSaleMint(uint256 quantity)
        external
        payable
        nonReentrant
        callerIsUser
    {
        require(quantity > 0, "Must mint more than 0 tokens");
        require(_presaleActive, "presaleNote mint not active");
        require(quantity <= maxNftPerTx, "exceeds max per transaction");
        require(
            balanceOf(msg.sender) + quantity <= maxNftPerAddress,
            "exceeds max per address"
        );
        require(totalSupply() + quantity <= MAX_SUPPLY, "reached max supply");
        require(PRICE * quantity == msg.value, "Incorrect funds");

        // check proof 
        require(
                allowList[msg.sender],
            "Invalid minter address"
        );

        _safeMint(msg.sender, quantity);
    }

    // public mint
    function publicSaleMint(uint256 quantity)
        external
        payable
        nonReentrant
        callerIsUser
    {
        require(quantity > 0, "Must mint more than 0 tokens");
        require(_publicMintActive, "public sale has not begun yet");
        require(PRICE * quantity >= msg.value, "Incorrect funds");
        require(quantity <= maxNftPerTx, "exceeds max per transaction");
        require(
            balanceOf(msg.sender) + quantity <= maxNftPerAddress,
            "exceeds max per address"
        );
        require(totalSupply() + quantity <= MAX_SUPPLY, "reached max supply");

        _safeMint(msg.sender, quantity);
    }

    //withdraw to owner wallet
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

}

