const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

let points = 0;

describe("Bank", function () {
    
    async function deployFixture() {
      
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const Bank = await ethers.getContractFactory("Bank");
      const bank = await Bank.deploy();
  
      return { bank, owner, otherAccount };
    }

    async function deployAccountCreatedFixture() {
        const { bank, owner } = await loadFixture(deployFixture);
        await bank.createAccount()

        return { bank, owner }
    }

    async function deployAccountWithBalanceFixture() {
        const { bank, owner } = await loadFixture(deployAccountCreatedFixture)

        const INITIAL_BALANCE = 10

        await bank.deposit(INITIAL_BALANCE)

        return { bank, owner }
    }

    describe("Create an account", function () {
        it("Should create a new account (+ 12 points)", async function () {
          const { bank, owner } = await loadFixture(deployAccountCreatedFixture);

          let account = await bank.accounts(owner)

          expect(account.owner).to.equal(owner)

          points += 12
        });

        it("Should not create an account if the user already has one (+ 8.5 points)", async function () {
          const { bank, owner } = await loadFixture(deployAccountCreatedFixture)

          await expect(bank.createAccount()).to.be.reverted

          points += 8.5
        })
    })

    describe("Deposit funds", function() {
        it("Should deposit funds into the account (+ 12 points)", async function () {
            const { bank, owner } = await loadFixture(deployAccountCreatedFixture)

            await bank.deposit(10)

            let account = await bank.accounts(owner)

            expect(account.balance).to.equal(10)

            points += 12
        }) 

        it("Should not deposit if the user has not created an account (+ 8.5 points)", async function () {
            const { bank, owner } = await loadFixture(deployFixture)
  
            await expect(bank.deposit(10)).to.be.reverted;

            points += 8.5
        })
    })

    describe("Withdraw funds", function() {
        it("Should subtract the amount from the balance (+ 12 points)", async function () {
            const { bank, owner } = await loadFixture(deployAccountWithBalanceFixture)

            await bank.withdraw(9)

            let account = await bank.accounts(owner)

            expect(account.balance).to.equal(1)

            points += 12
        })

        it("Should not withdraw if the user has not created an account (+ 8.5 points)", async function () {
            const { bank, owner } = await loadFixture(deployFixture)
  
            await expect(bank.withdraw(9)).to.be.reverted;

            points += 8.5
        })

        it("Should not withdraw if the user does not have enough funds in bank (+ 8.5 points)", async function () {
            const { bank, owner } = await loadFixture(deployAccountWithBalanceFixture)

            await expect(bank.withdraw(11)).to.be.reverted;

            points += 8.5
        })
    })

    describe("Total points", function() {
        it(`You should have 70/70 on this assignment.`, async function () {
            expect(points).to.equal(70)
        })
    
    })
})