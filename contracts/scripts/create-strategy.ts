import { ethers } from "hardhat";

async function main() {

  const StrategyManager = await ethers.getContractFactory("StrategyManager");
  let strategyManager = await StrategyManager.attach("0xfC1e58a83e8bC0598C99343cC150762e7C2cAf52" );

  await strategyManager.createStrategy();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
