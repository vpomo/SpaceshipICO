var SXTCrowdsale = artifacts.require("./SXTCrowdsale.sol");

contract('SXTCrowdsale', (accounts) => {
    var contract;
    var wallet = "0x920630D883Db8430B657b0A246913FF201E6598f";
    var rate = 13000;
    var buyWei = 5 * 10**17;
    var rateNew = 13000;
    var buyWeiNew = 5 * 10**17;

    it('should deployed contract', async ()  => {
        assert.equal(undefined, contract);
        contract = await SXTCrowdsale.deployed();
        assert.notEqual(undefined, contract);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contract.address);
    });


    it('verification of receiving Ether', async ()  => {
        var tokenAllocatedBefore = await contract.tokenAllocated.call();
        var balanceAccountTwoBefore = await contract.balanceOf(accounts[2]);
        var weiRaisedBefore = await contract.weiRaised.call();
        console.log("tokenAllocated = " + tokenAllocatedBefore);

        await contract.buyTokens(accounts[2],{from:accounts[2], value:buyWei});

        var tokenAllocatedAfter = await contract.tokenAllocated.call();
        console.log("tokenAllocatedAfter = " + tokenAllocatedAfter);
        assert.isTrue(tokenAllocatedBefore < tokenAllocatedAfter);
        assert.equal(0, tokenAllocatedBefore);
        assert.equal(rate*buyWei, tokenAllocatedAfter);

        var balanceAccountTwoAfter = await contract.balanceOf(accounts[2]);
        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(rate*buyWei, balanceAccountTwoAfter);

        var weiRaisedAfter = await contract.weiRaised.call();
        console.log("weiRaisedAfter = " + weiRaisedAfter);
        assert.isTrue(weiRaisedBefore < weiRaisedAfter);
        assert.equal(0, weiRaisedBefore);
        assert.equal(buyWei, weiRaisedAfter);

        var depositedAfter = await contract.getDeposited.call(accounts[2]);
        console.log("DepositedAfter = " + depositedAfter);
        assert.equal(buyWei, depositedAfter);

        var balanceAccountThreeBefore = await contract.balanceOf(accounts[3]);
        await contract.buyTokens(accounts[3],{from:accounts[3], value:buyWeiNew});
        var balanceAccountThreeAfter = await contract.balanceOf(accounts[3]);
        assert.isTrue(balanceAccountThreeBefore < balanceAccountThreeAfter);
        assert.equal(0, balanceAccountThreeBefore);
        console.log("balanceAccountThreeAfter = " + balanceAccountThreeAfter);
        assert.equal(rateNew*buyWeiNew, balanceAccountThreeAfter);

        var tokenAllocatedEnd = await contract.tokenAllocated.call();
        console.log("tokenAllocatedEnd = " + tokenAllocatedEnd);

});


/*
    it('verification close smart contract', async ()  => {
            //var curBalance = await contract.currentBalance.call();
            //console.log("current balance (before close) = " + curBalance);

            //console.log("Tested Close smart contract");
            var weiRaisedBefore = await contract.weiRaised.call();
            assert.equal(buyWei + buyWeiNew, weiRaisedBefore);

            await contract.close({from:accounts[0]});

            var mintingFinished = await contract.mintingFinished.call();
            assert.equal(true, mintingFinished );
            var state = await contract.state.call();
            assert.equal(1,state);

            var isFinalized = await contract.isFinalized.call();
            assert.equal(true, isFinalized);
    });
*/

/*
    it('mint to special funds', async ()  => {
        var balanceBefore = await contract.balanceOf(wallet);
        //console.log("balanceBefore = " + balanceBefore);
        assert.equal(6.5e+26, balanceBefore);
        await contract.mintToSpecialFund(wallet,{from:accounts[0]});
        var balanceAfter = await contract.balanceOf(wallet);
        assert.equal(2*6.5e+26, balanceAfter);
        //console.log("balanceAfter = " + balanceAfter);
    });
*/

/*
    it('get current balance', async ()  => {
        var curBalance = await contract.currentBalance.call();
        assert.equal(0, curBalance);
        //console.log("current balance = " + curBalance);
    });
*/


});



