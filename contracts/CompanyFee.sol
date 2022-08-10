// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Interface name is not important, however functions in it are important
interface SellaTokenInterface {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external returns (uint256);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract CompanyFee is Ownable {
    using SafeMath for uint256;

    address private _owner;
    uint256 private _ownerFee;
    address private _tokenAddres;
    SellaTokenInterface SellaTokenContract;

    constructor(address tokenAddress, uint256 ownerFee_) {
        _owner = msg.sender;
        _ownerFee = ownerFee_;
        _tokenAddres = tokenAddress;
        SellaTokenContract = SellaTokenInterface(tokenAddress);
    }

    struct Company {
        string name;
        uint256 fee;
        bool exists;
    }
    mapping(address => Company) companies;

    struct Agent {
        string name;
        uint256 fee;
        bool exists;
    }
    mapping(address => Agent) agents;

    //dato l'addess di un agente ricavo la compagnia di appartenenza
    mapping(address => address) agentCompany;
    //dato l'indirizzo di una compagnia, tutti i suoi agenti
    mapping(address => address[]) companyAgents;

    function addCompany(
        address companyAddress,
        string memory companyName,
        uint256 companyFee
    ) public onlyOwner {
        require(
            companyAddress != address(0),
            "Company address cannot be the zero address"
        );

        companies[companyAddress] = Company(companyName, companyFee, true);
    }

    modifier onlyCompany() {
        _checkCompany();
        _;
    }

    function _checkCompany() internal view virtual {
        require(companies[msg.sender].exists, "Company not exist");
    }

    function addAgent(
        address agentAddress,
        string memory agentName,
        uint256 agentFee
    ) public onlyCompany {
        require(
            agentAddress != address(0),
            "Agent address cannot be the zero address"
        );

        agents[agentAddress] = Agent(agentName, agentFee, true);
        agentCompany[agentAddress] = msg.sender;
        companyAgents[msg.sender].push(agentAddress);
    }

    function splitPayment(address agentAddress, uint256 amount)
        public
        returns (bool)
    {
        uint256 agentFee = agents[agentAddress].fee;
        address companyAddress = agentCompany[agentAddress];
        uint256 companyFee = companies[companyAddress].fee;

        uint256 payAgent = SafeMath.div(SafeMath.mul(amount, agentFee), 100);
        SellaTokenContract.transferFrom(msg.sender, agentAddress, payAgent);

        uint256 payOwner = SafeMath.div(SafeMath.mul(amount, _ownerFee), 100);
        SellaTokenContract.transferFrom(msg.sender, _owner, payOwner);

        uint256 payCompany = SafeMath.div(
            SafeMath.mul(amount, companyFee),
            100
        );
        SellaTokenContract.transferFrom(msg.sender, companyAddress, payCompany);

        uint256 totFee = SafeMath.add(payAgent, payCompany);
        totFee = SafeMath.add(totFee, payOwner);

        amount = SafeMath.sub(amount, totFee);

        SellaTokenContract.transferFrom(msg.sender, companyAddress, amount);
        return true;
    }

    function getCompanyFee(address companyAddress)
        public
        view
        returns (uint256)
    {
        return companies[companyAddress].fee;
    }

    function getAgentFee(address agentAddress) public view returns (uint256) {
        return agents[agentAddress].fee;
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    function ownerFee() public view returns (uint256) {
        return _ownerFee;
    }

    function getTokenAddress() public view returns (address) {
        return _tokenAddres;
    }

    function company(address companyAddress)
        public
        view
        returns (Company memory)
    {
        return companies[companyAddress];
    }

    function agent(address agentAddress) public view returns (Agent memory) {
        return agents[agentAddress];
    }

    function getCompanyAgents(address companyAddress)
        public
        view
        returns (address[] memory)
    {
        return companyAgents[companyAddress];
    }

    function getAgentCompany(address agentAddress)
        public
        view
        returns (address)
    {
        return agentCompany[agentAddress];
    }
}
