pragma solidity ^0.8.9;
import {SmaIndicatorOracle} from "./SmaIndicatorOracle.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract StrategyVault {
    string asset_pair;
    string indicator;
    string time_frame;
    uint256 period;
    SmaIndicatorOracle oracle;
    string network = "Ethereum";
    uint256 lastTimestamp;
    string public status = "long";
    uint256 upper_limit;
    uint256 lower_limit;
    uint256 constant SECONDS_IN_ONE_HOUR = 3600;

    constructor(
        string memory _asset_pair,
        string memory _indicator,
        string memory _time_frame,
        uint256 _period,
        address _smaIndicatorOracleAddres,
        uint256 _upper_limit,
        uint256 _lower_limit
    ) public {
        asset_pair = _asset_pair;
        indicator = _indicator;
        time_frame = _time_frame;
        period = _period;
        oracle = SmaIndicatorOracle(_smaIndicatorOracleAddres);
        lastTimestamp = block.timestamp;
        upper_limit = _upper_limit;
        lower_limit = _lower_limit;
    }

    function updateIndicator() public {
        oracle.requestIndicators(
            Strings.toString(lastTimestamp - (SECONDS_IN_ONE_HOUR * period)),
            Strings.toString(lastTimestamp),
            asset_pair,
            network,
            indicator,
            time_frame,
            Strings.toString(period)
        );

        lastTimestamp = block.timestamp;
    }

    function rebalance() public {
        uint256 indicator_value = oracle.indicator_value();
        if (indicator_value > upper_limit) {
            goLong();
        }

        if (indicator_value < lower_limit) {
            goShort();
        }
    }

    function checkRebalance() public view returns (bool) {
        uint256 indicator_value = oracle.indicator_value();
        return indicator_value > upper_limit || indicator_value < lower_limit;
    }

    function goLong() public {
        status = "short";
    }

    function goShort() public {
        status = "long";
    }
}
