// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Interface name is not important, however functions in it are important
interface SellaTokenInterface {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);
}

contract CompanyFee is Ownable {
    using SafeMath for uint256;
    address public constant SELLA_CONTRACT =
        0x1D062a69c7D55b5beA30F8574d885b484E34191E;
    SellaTokenInterface SellaTokenContract =
        SellaTokenInterface(SELLA_CONTRACT);

    address private _owner;
    uint256 private _ownerFee;

    mapping(address => uint256) public companyFee;
    mapping(address => uint256) public agentFee;
    mapping(address => address) public companyToAgent;
    mapping(address => address) public agentToCompany;

    constructor(uint256 ownerFee_) {
        _owner = msg.sender;
        _ownerFee = ownerFee_;
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

    function pay(address agent, uint256 amount) public returns (bool) {
        uint256 agentFee_ = agentFee[agent];
        address company_ = agentToCompany[agent];
        uint256 companyFee_ = companyFee[company_];

        uint256 payAgent = SafeMath.div(SafeMath.mul(amount, agentFee_), 100);
        SellaTokenContract.transfer(agent, payAgent);

        uint256 payCompany = SafeMath.div(
            SafeMath.mul(amount, companyFee_),
            100
        );
        SellaTokenContract.transfer(company_, payCompany);


        uint256 payOwner = SafeMath.div(SafeMath.mul(amount, _ownerFee), 100);
        SellaTokenContract.transfer(_owner, payOwner);

        uint256 fees = SafeMath.add(payAgent, payOwner);
        fees = SafeMath.add(fees, payOwner);
        amount = SafeMath.sub(amount, fees);

        SellaTokenContract.transfer(company_, amount);
        return true;
    }
}
