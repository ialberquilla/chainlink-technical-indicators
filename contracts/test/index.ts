import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SubscriptionManager", function () {

    async function deploy() {
        const [owner] = await ethers.getSigners();

        const StrategyManager = await ethers.getContractFactory("StrategyManager");
        const strategyManager = await StrategyManager.deploy();

        return {
            strategyManager
        };
    }


    describe("Deployment", function () {
        it("Should deploy the contract and register a subscription", async function () {
            const {
                strategyManager
            } = await loadFixture(deploy);

            expect(strategyManager.deployTransaction.hash).contains('0x')
        });

    });

    describe("Rebalance Strategy", function () {

        let strategyManager: any

        it("Should create an strategy", async function () {
            const {
                strategyManager: strategyManagerDeployment
            } = await loadFixture(deploy);

            strategyManager = strategyManagerDeployment

            expect(strategyManager.deployTransaction.hash).contains('0x')

            await strategyManager.createStrategy()

            const strategies = await strategyManager.getStrategies()
            expect(strategies).length.be(1)
        });


        it("Should rebalance an strategy", async function () {
            const calldata = ethers.utils.defaultAbiCoder.encode(
                ['uint256'],
                [1],
            );
            const respose = await strategyManager.checkUpkeep(calldata)
            expect(await strategyManager.performUpkeep(respose.performData)
            ).emit(strategyManager, 'StrategyRebalanced')
        });


        it("Should not have more strategies to rebalance", async function () {
            const calldata = ethers.utils.defaultAbiCoder.encode(
                ['uint256'],
                [1],
            );
            const respose = await strategyManager.checkUpkeep(calldata)
            expect(respose.upkeepNeeded).equals(false)

        });

    });

});