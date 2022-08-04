// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Interface name is not important, however functions in it are important
interface SellaTokenInterface {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external returns (uint256);

    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract CompanyFee is Ownable {
    using SafeMath for uint256;

    address private _owner;
    uint256 private _ownerFee;
    address private _tokenAddres;
    
    SellaTokenInterface SellaTokenContract =
        SellaTokenInterface(_tokenAddres);

    mapping(address => uint256) public companyFee;
    mapping(address => uint256) public agentFee;
    mapping(address => address) public companyToAgent;
    mapping(address => address) public agentToCompany;

    constructor(address tokenAddress, uint256 ownerFee_) {
        _owner = msg.sender;
        _ownerFee = ownerFee_;
        _tokenAddres = tokenAddress;
    }

    function addCompanyFee(uint256 fee) public {
        companyFee[msg.sender] = fee;
    }

    function addAgentFeeToCompany(address agent, uint256 fee) public {
        require(
            agent != address(0),
            "Agent address cannot be the zero address"
        );
        agentFee[agent] = fee;
        companyToAgent[msg.sender] = agent;
        agentToCompany[agent] = msg.sender;
    }

    function totalSellaCoinSupply() public view returns (uint256) {
        uint256 totalSupply = SellaTokenContract.totalSupply();
        return totalSupply;
    }

    function payAgentFee(address agent, uint256 amount) public view returns (uint256) {
        uint256 agentFee_ = agentFee[agent];
        uint256 payAgent = SafeMath.div(SafeMath.mul(amount, agentFee_), 100);
        return payAgent;
    }

    function payCompanyFee(address company_, uint amount) public view returns (uint256) {
        uint256 companyFee_ = companyFee[company_];
        uint256 payCompany = SafeMath.div(
            SafeMath.mul(amount, companyFee_),
            100
        );
        return payCompany;
    }

    function payOwnerFee(uint256 amount) public view returns (uint256) {
        uint256 payOwner = SafeMath.div(SafeMath.mul(amount, _ownerFee), 100);
        return payOwner;
    }

    function sendSomeToken(address to, uint256 amount) public returns (bool) {
        SellaTokenContract.transferFrom(msg.sender, to, amount);
        return true;
    }

    function pay(address agent, uint256 amount) public returns (bool) {
        uint256 agentFee_ = agentFee[agent];
        address company_ = agentToCompany[agent];
        uint256 companyFee_ = companyFee[company_];

        uint256 payAgent = SafeMath.div(SafeMath.mul(amount, agentFee_), 100);
        SellaTokenContract.transferFrom(msg.sender, agent, payAgent);

        uint256 payCompany = SafeMath.div(
            SafeMath.mul(amount, companyFee_),
            100
        );
        SellaTokenContract.transferFrom(msg.sender, company_, payCompany);


        uint256 payOwner = SafeMath.div(SafeMath.mul(amount, _ownerFee), 100);
        SellaTokenContract.transferFrom(msg.sender, _owner, payOwner);

        uint256 fees = SafeMath.add(payAgent, payCompany);
        fees = SafeMath.add(fees, payOwner);
        amount = SafeMath.sub(amount, fees);

        SellaTokenContract.transferFrom(msg.sender, company_, amount);
        return true;
    }
}
