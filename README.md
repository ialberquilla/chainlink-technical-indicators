# Chainlink technical indicators
This repository contains our project for the Chainlink fall 2022 Hackathon 

## Introduction
The scope of this project is to create technical indicators for trading that can be consumed directly on-chain. Right now chainlink provides services as oracle providing prices to protocols, but in some cases for more complex trading strategies trading indicators are needed and can’t be done directly on-chain because would be extremely costly to do these calculations, this is why we created this project to provide technical indicators in a decentralized way. 

In order to push these indicators on-chain, we wanted to do as most as decentralized and trust minimized way. We wanted to be able to have all the stack decentralized and allow anybody to track the value of the indicators on-chain, to let people trust in the system and ensure that if a rebalance had happened is because it has to happen and not have to trust in a specific centralized server. 

Right now, this service supports the following indicators:

- SMA: Single moving average
- EMA: Exponential moving average
- BB: Bolliger bands
- RSI: Relative Strength Index
- ATR: Average true range


## Architecture
To create this architecture  in a decentralized way, we are using two chainlink services:
External adapter: This adapter is responsible to calculate the indicator, it leverages the chainlink architecture to receive an on-chain call, calculate the indicator value, and put the response again on the chain. Again to use decentralized pricing, we use the price feed from chainlink, using a The graph subgraph to get the historical prices and perform the calculations over them.
Chainlink keepers: These indicators should be updated and when needed the strategies that are based on them, are rebalanced. To do so, we have created two chainlink keepers. The first keeper updates the indicators in a time-based way, we can define how often we need to update these indicators and create several keepers to that, rebalance on an hourly, daily, and weekly basis… depending on the type of trading strategy, Once the indicator is updated, the strategies should or should not rebalance, to do so, we have created another keeper that checks all the strategies and if any of them needs to be rebalanced, trigger the perform upkeep. 

![Architecture](/docs/diagram.PNG)

## Components

This repository has three components:
- Adapter: Chainlink external adapter can be installed following the installations docs in the readme and installed using the node.sh script to run a local node. 
- Contracts: Contains three contracts. 
  - SMAIndicatorOracle: This contract is used to call the node and update the de SMA indicator value on-chain.
  - SMAStrategyManager: Used to create and managed all the strategies, contains a reference to all the strategies, and receives calls to rebalance them when needed. 
  - StrategyVault: Tokenized Vault that contains the trading strategy, it contains the status of the strategy, the indicator that should be applied to rebalance and the upper and lower limit of this value to perform the rebalance. 
