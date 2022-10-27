// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MT is ERC1155 {
    constructor(string memory uri_) ERC1155(uri_) {}
}
