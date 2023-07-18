const { expect } = require("chai");
import { ethers } from "hardhat";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe.only("Launchpool Interactions", function () {

    async function initTokenAndLaunchpoolFixture() {

        let today = new Date();
        today.setHours(today.getHours() + 1);
        let todayPlusOneWeek = new Date();
        todayPlusOneWeek.setDate(today.getDate() + 7);	

        const [owner, otherAccount] = await ethers.getSigners();

        const token = await ethers.deployContract("TokenTest");
        const tokenAddress = await token.getAddress();

        const Launchpool = await ethers.getContractFactory("Launchpool");
        const launchpool = await Launchpool.deploy(tokenAddress, Math.round(today.valueOf() / 1000), Math.round(todayPlusOneWeek.valueOf() / 1000));
        const launchpoolAddress = await launchpool.getAddress();

        await token.increaseAllowance(launchpoolAddress, 10000);
        await  launchpool.depositTokenToDistribute(10000);

        //Launchpool needs to start
        const HOUR_IN_SECONDS = 3600;
        
        const nowPlusNineHours = (await time.latest()) + (9 * HOUR_IN_SECONDS);
        await time.increaseTo(nowPlusNineHours); 

    
        return { today, todayPlusOneWeek, owner, otherAccount, token, launchpool, launchpoolAddress };
  }

    describe("Launchpool Interactions stake", function () {

        it("Stake orders with different address ", async function () {

            const { launchpool, otherAccount } = await loadFixture(initTokenAndLaunchpoolFixture);

            await launchpool.stake({ value: 1000 });

            await launchpool.connect(otherAccount).stake({ value: 500 });

            await launchpool.stake({ value: 250 });

            await launchpool.connect(otherAccount).stake({ value: 100 });

            expect(await launchpool.getMyTotalStaked()).equal(1250);
            expect(await launchpool.connect(otherAccount).getMyTotalStaked()).equal(600);

            expect((await launchpool.getMyOrders()).length).equal(2);

        })
    });

    describe("Launchpool Interactions claim", function () {

    }); 

    describe("Launchpool Interactions unstake", function () {

        it("Unstake with different address ", async function () {

            const { launchpool, owner, otherAccount } = await loadFixture(initTokenAndLaunchpoolFixture);

            await launchpool.stake({ value: 1000 });

            await launchpool.connect(otherAccount).stake({ value: 100 });

            await launchpool.stake({ value: 500 });

            await launchpool.connect(otherAccount).stake({ value: 50 });

            await launchpool.stake({ value: 1000 });

            //Launchpool needs to finish
            const DAY_IN_SECONDS = 86400;
        
            const nowPlusNineDays = (await time.latest()) + (9 * DAY_IN_SECONDS);

            await time.increaseTo(nowPlusNineDays);
            
            await expect(launchpool.unstake()).to.changeEtherBalances(
                [owner, launchpool], [2500, -2500]);  

            expect(await launchpool.getMyTotalStaked()).equal(0);

            expect(await launchpool.connect(otherAccount).getMyTotalStaked()).equal(150);

        })        

    }); 

});