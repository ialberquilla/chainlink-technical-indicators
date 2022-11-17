# Chainlink technical indicators
This repository contains our project for the Chainlink fall 2022 Hackathon 

## Introduction
The scope of this project is to create technical indicators for trading that can be consumed directly on-chain. Right now chainlink provides services as oracle providing prices to protocols, but in some cases for more complex trading strategies trading indicators are needed and can’t be done directly on-chain because would be extremely costly to do these calculations, this is why we created this project to provide technical indicators in a decentralized way. 

In order to push these indicators on-chain, we wanted to do as most as decentralized and trust minimized way. We wanted to be able to have all the stack decentralized and allow anybody to track the value of the indicators on-chain, to let people trust in the system and ensure that if a rebalance had happened is because it has to happen and not have to trust in a specific centralized server. 

Right now, this service supports the following indicators:

- SMA: Simple moving average
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

This repository has four components:
- [Adapter](https://github.com/ialberquilla/chainlink-technical-indicators/tree/main/adapter): Chainlink external adapter can be installed following the installations docs in the readme.
- Node: We deployed a chainlink node in **Polygon Mumbai** using naas.link and we set up a [job](https://github.com/ialberquilla/chainlink-technical-indicators/blob/main/adapter/get_sma_job.toml) which process data coming from the bridge.
- [Contracts](https://github.com/ialberquilla/chainlink-technical-indicators/tree/main/contracts): Contains three contracts. 
  - SMAIndicatorOracle: This contract is used to call the node and update the de SMA indicator value on-chain.
  - SMAStrategyManager: Used to create and managed all the strategies, contains a reference to all the strategies, and receives calls to rebalance them when needed. 
  - StrategyVault: Tokenized Vault that contains the trading strategy, it contains the status of the strategy, the indicator that should be applied to rebalance and the upper and lower limit of this value to perform the rebalance. 
- [Frontend](https://github.com/ialberquilla/chainlink-technical-indicators/tree/main/frontend): a simple UI to show how many strategies and rebalances were perfomed

## Contracts Addresses (Polygon Mumbai):
- [Node: 0xA784e85AF5725361372C589cBaD56d5634Be5a55](https://mumbai.polygonscan.com/address/0xA784e85AF5725361372C589cBaD56d5634Be5a55)
- [Operator: 0xEe1Af345C5272E3f194881aBEB60FCf0f6e29592](https://mumbai.polygonscan.com/address/0xEe1Af345C5272E3f194881aBEB60FCf0f6e29592)
- [SMAIndicatorOracle: 0x7BDE85a7987816166eE4B37680b3c3080c2852B5](https://mumbai.polygonscan.com/address/0x7BDE85a7987816166eE4B37680b3c3080c2852B5)
- [Strategy Manager: 0x97d46599805A969F279c3E5cDc15A3D925faF8F4](https://mumbai.polygonscan.com/address/0x97d46599805A969F279c3E5cDc15A3D925faF8F4)


