// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";
import {StrategyVault} from "./StrategyVault.sol";

// import "hardhat/console.sol";

contract StrategyManager is AutomationCompatibleInterface {
    address smaIndicatorOracleAddres;

    constructor(address _smaIndicatorOracleAddres) public {
        smaIndicatorOracleAddres = _smaIndicatorOracleAddres;
    }

    address[] strategies;

    event StrategyRebalanced(address strategy);

    function createStrategy(
        string memory _asset_pair,
        string memory _indicator,
        string memory _time_frame,
        uint256 _period,
        uint256 _upper_limit,
        uint256 _lower_limit
    ) public {
        StrategyVault vault = new StrategyVault(
            _asset_pair,
            _indicator,
            _time_frame,
            _period,
            smaIndicatorOracleAddres,
            _upper_limit,
            _lower_limit
        );
        strategies.push(address(vault));
    }

    function updateIndicator() public {
        for (uint256 i = 0; i < strategies.length; i++) {
            StrategyVault vault = StrategyVault(strategies[i]);
            vault.updateIndicator();
        }
    }

    function getStrategies() public view returns (address[] memory) {
        return strategies;
    }

    function checkUpkeep(bytes calldata checkData)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        bool[] memory strategiesToUpdate = new bool[](strategies.length);
        upkeepNeeded = false;

        for (uint256 i = 0; i < strategies.length; i++) {
            StrategyVault vault = StrategyVault(strategies[i]);
            if (vault.checkRebalance()) {
                strategiesToUpdate[i] = true;
                upkeepNeeded = true;
            }
        }
        performData = abi.encode(strategiesToUpdate);
        return (upkeepNeeded, performData);
    }

    function performUpkeep(bytes calldata performData) external override {
        bool[] memory strategiesToUpdate = abi.decode(performData, (bool[]));

        for (uint256 i = 0; i < strategiesToUpdate.length; i++) {
            StrategyVault vault = StrategyVault(strategies[i]);
            if (strategiesToUpdate[i]) {
                if (vault.checkRebalance()) {
                    vault.rebalance();
                    emit StrategyRebalanced(address(vault));
                }
            }
        }
    }
}
