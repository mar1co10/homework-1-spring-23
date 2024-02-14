// SPDX - License - Identifier : MIT
pragma solidity ^0.8.20;

contract Bank {
    struct Account {
        address owner;
        uint256 balance;
    }

    mapping ( address => Account ) public accounts ;

    function createAccount () public {
        // TODO : Implement the logic to create an account
    }

    function deposit ( uint256 amount ) public {
        // TODO : Implement the logic to deposit an amount
    }

    function withdraw ( uint256 amount ) public {
        // TODO : Implement the logic to withdraw an amount
    }
}
