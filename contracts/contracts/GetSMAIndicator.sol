// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

contract GetSMAIndicator is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 public indicator_value;
    uint256 public last_price;

    bytes32 private jobId;
    uint256 private fee;

    event RequestIndicators(
        bytes32 indexed requestId,
        uint256 indicator_value,
        uint256 last_price
    );

    /**
     * @notice Initialize the link token and target oracle
     *
     * Mumbai Testnet details:
     * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Oracle: 0xEe1Af345C5272E3f194881aBEB60FCf0f6e29592 
     * jobId: 60166810ec4a404ca8e1a907a7752a18
     *
     */
    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xEe1Af345C5272E3f194881aBEB60FCf0f6e29592);
        jobId = '60166810ec4a404ca8e1a907a7752a18';
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }


    /**
    * Create a Chainlink request the gas price from Etherscan
     
    the request
     "data": {
        "from_timestamp": 1654329246,
        "to_timestamp": 1659599646,
        "asset_pair": "ETH/USD",
        "network": "Ethereum",
        "indicator": "SMA",
        "time_frame": "60Min",
        "period": 25
    }
    */

    function requestIndicators(
        string  memory _from_timestamp,
        string  memory _to_timestamp,
        string  memory _asset_pair,
        string  memory _network,
        string  memory _indicator,
        string  memory _time_frame,
        string  memory _period
    ) public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // No need extra parameters for this job. Send the request
       
        req.add('from_timestamp', _from_timestamp);
        req.add('to_timestamp', _to_timestamp);
        req.add('asset_pair', _asset_pair);
        req.add('network', _network);
        req.add('indicator', "SMA");
        req.add('time_frame', _time_frame);
        req.add('period', _period);

        return sendOperatorRequest(req, fee);
    }

    /**
     * Receive the responses in the form of uint256
     */
    function fulfill(
        bytes32 _requestId,
        uint256 _indicator_value,
        uint256 _last_price
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestIndicators(_requestId, _indicator_value, _last_price);
        indicator_value = _indicator_value;
        last_price = _last_price;
    }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), 'Unable to transfer');
    }
}
