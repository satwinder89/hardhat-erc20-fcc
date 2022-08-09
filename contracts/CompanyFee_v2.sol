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

contract CompanyFeeV2 is Ownable {
    using SafeMath for uint256;

    address private _owner;
    uint256 private _ownerFee;
    address private _tokenAddres;

    SellaTokenInterface SellaTokenContract = SellaTokenInterface(_tokenAddres);

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
    ) public onlyCompany{
        require(
            agentAddress != address(0),
            "Agent address cannot be the zero address"
        );

        agents[agentAddress] = Agent(agentName, agentFee, true);
        agentCompany[agentAddress] = msg.sender;
        companyAgents[msg.sender].push(agentAddress);
    }

    function splitPayment(address agent, uint256 amount) public returns (bool) {
        
    }
}
