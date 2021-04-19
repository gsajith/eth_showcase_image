//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "hardhat/console.sol";

contract Image {
    string url;

    constructor(string memory _url) {
        console.log("Deploying a Image with url:", _url);
        url = _url;
    }

    function getUrl() public view returns (string memory) {
        return url;
    }

    function setUrl(string memory _url) public {
        console.log("Changing url from '%s' to '%s'", url, _url);
        url = _url;
    }
}
