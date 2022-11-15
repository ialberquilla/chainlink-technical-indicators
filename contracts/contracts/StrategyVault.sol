pragma solidity ^0.8.9;

contract StrategyVault {
    bool isRebalanced = false;

    constructor() public {}

    function rebalance() public {
        isRebalanced = !isRebalanced;
    }

    function checkRebalance() public view returns (bool) {
        return !isRebalanced;
    }
}
