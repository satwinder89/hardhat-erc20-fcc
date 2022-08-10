// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SellaToken is ERC20, Ownable, Pausable {
    using SafeMath for uint256;

    address private _owner;
    uint256 public examplePaggedEuro;


    constructor(uint256 initialSupply) ERC20("SellaToken", "SELLA") {
        _owner = msg.sender;
        _mint(msg.sender, initialSupply);
        examplePaggedEuro = initialSupply;
    } 

    function buySellaToken(uint256 euro) public {
        _mint(msg.sender, euro);
        examplePaggedEuro = SafeMath.add(examplePaggedEuro, euro);
    }

    function sellSellaToken(uint256 value) public {
        _burn(msg.sender, value);
        examplePaggedEuro = SafeMath.sub(examplePaggedEuro, value);
    }

    function decimals() public view virtual override returns (uint8) {
        return 4;
    }
}