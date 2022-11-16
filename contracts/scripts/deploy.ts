import { ethers } from "hardhat";

async function main() {

  const SmaIndicatorOracle = await ethers.getContractFactory("SmaIndicatorOracle");
  const smaIndicatorOracle = await SmaIndicatorOracle.deploy();

  await smaIndicatorOracle.deployed();

  console.log(`SmaIndicatorOracle deployed to ${smaIndicatorOracle.address}`);


  const StrategyManager = await ethers.getContractFactory("StrategyManager");
  const strategyManager = await StrategyManager.deploy(smaIndicatorOracle.address);

  await strategyManager.deployed();

  console.log(`StrategyManager deployed to ${strategyManager.address}`);

  await strategyManager.createStrategy(
    'ETH/USD',
    'SMA',
    '60Min',
    200,
    1207,
    1205
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});