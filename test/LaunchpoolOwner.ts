const { expect } = require("chai");
import { ethers } from "hardhat";
import { tokenTestSol } from "../typechain-types/contracts";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Launchpool Owner", function () {

    async function initTokenAndLaunchpoolFixture() {

        let today = new Date();
        today.setHours(today.getHours() + 1);
        let todayPlusOneWeek = new Date();
        todayPlusOneWeek.setDate(today.getDate() + 7);	

        const [owner] = await ethers.getSigners();

        const token = await ethers.deployContract("TokenTest");
        const tokenAddress = await token.getAddress();

        const Launchpool = await ethers.getContractFactory("Launchpool");
        const launchpool = await Launchpool.deploy(tokenAddress, Math.round(today.valueOf() / 1000), Math.round(todayPlusOneWeek.valueOf() / 1000));
        const launchpoolAddress = await launchpool.getAddress()

        return { today, todayPlusOneWeek, owner, token, launchpool, launchpoolAddress };
  }

    describe("Launchpool creation", function () {

        it("deploy contract TokenTest and mint from constructor", async function () {
            
            const { token, owner } = await loadFixture(initTokenAndLaunchpoolFixture);

            expect((await token.balanceOf(owner.address))).equal(1000000000000000000000n)
	    })

        it("Check allowance", async function () {
            
            const { token, launchpool, launchpoolAddress } = await loadFixture(initTokenAndLaunchpoolFixture);

			const allowance = await token.increaseAllowance(launchpoolAddress, 100)
			if(allowance){
			const depositTokenToDistribute = await  launchpool.depositTokenToDistribute(100);
				return depositTokenToDistribute 
			}else {
				await expect(launchpool.depositTokenToDistribute(100)).to.be.revertedWith("revert because allowance not present or not sufficient")
			} 
        })
        
        it("Change of launchpool period", async function () {

            const { today, todayPlusOneWeek, launchpool } = await loadFixture(initTokenAndLaunchpoolFixture);

            let newStartLP = Math.round(todayPlusOneWeek.setHours(todayPlusOneWeek.getHours() + 1).valueOf() / 1000);
            let newEndLP = Math.round(today.setMinutes(today.getMinutes() - 10).valueOf() / 1000);
            
            await expect(launchpool.setStartLP(newStartLP)).to.be.revertedWith("New startLP must be less than endLP");

            await expect(launchpool.setEndLP(newEndLP)).to.be.revertedWith("New EndLP must be greater than startLP");

            let tomorrowDate = new Date();

            let tomorrow = Math.round(tomorrowDate.setDate(today.getDate() + 1).valueOf() / 1000);
            let tomorrowPlus3Days = Math.round(tomorrowDate.setDate(tomorrowDate.getDate() + 3).valueOf() / 1000);

            await launchpool.setStartLP(tomorrow);
            await launchpool.setEndLP(tomorrowPlus3Days);

            //Corresponding to 3 days
            expect((await launchpool.stakingLength())).equal(259200);

        })
        
        it("Check Launchpool start,end and running ", async function () {

            const { today, launchpool } = await loadFixture(initTokenAndLaunchpoolFixture);

            //Can't stake if the launchpool is not started
            await expect(launchpool.stake({ value: 100 })).to.be.revertedWith("Launchpool is not running");

            const HOUR_IN_SECONDS = 3600;

            //I go forward in the time of nine hours
            const nowPlusNineHours = (await time.latest()) + (9 * HOUR_IN_SECONDS);

            //I increase the time of the last block at the required time
            await time.increaseTo(nowPlusNineHours);
            
            let newToday = Math.round((today.setHours(today.getHours() + 4)).valueOf() / 1000);
            
            await expect(launchpool.setEndLP(newToday)).to.be.revertedWith("Launchpool is already running");

            const DAY_IN_SECONDS = 86400;

            const nowPlusTwentyDays = (await time.latest()) + (20 * DAY_IN_SECONDS);

            await time.increaseTo(nowPlusTwentyDays);

            //Can't stake if the launchpool is finished
            await expect(launchpool.stake({ value: 100 })).to.be.revertedWith("Launchpool is ended");
            
        })

  });

});