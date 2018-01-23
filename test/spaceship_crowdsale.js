var SXTCrowdsale = artifacts.require("./SXTCrowdsale.sol");

contract('SXTCrowdsale', (accounts) => {
    var contract;
    var owner = "0x920630D883Db8430B657b0A246913FF201E6598f";
    var rate = 13000;
    var buyWei = 5 * 10**17;
    var rateNew = 13000;
    var buyWeiNew = 5 * 10**17;
    var totalSupply = 5 * 10**24;
    var buyWeiCap = 20 * 10**18;

    it('should deployed contract', async ()  => {
        assert.equal(undefined, contract);
        contract = await SXTCrowdsale.deployed();
        assert.notEqual(undefined, contract);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contract.address);
    });

    it('verification balance owner contract', async ()  => {
        var balanceOwner = await contract.balanceOf(owner);
        //console.log("balanceOwner = " + balanceOwner);
        assert.notEqual(totalSupply, balanceOwner);
    });


    it('verification of receiving Ether', async ()  => {
        var tokenAllocatedBefore = await contract.tokenAllocated.call();
        var balanceAccountTwoBefore = await contract.balanceOf(accounts[2]);
        var weiRaisedBefore = await contract.weiRaised.call();
        //console.log("tokenAllocated = " + tokenAllocatedBefore);

        await contract.buyTokens(accounts[2],{from:accounts[2], value:buyWei});1
        var tokenAllocatedAfter = await contract.tokenAllocated.call();
        //console.log("tokenAllocatedAfter = " + tokenAllocatedAfter);
        assert.isTrue(tokenAllocatedBefore < tokenAllocatedAfter);
        assert.equal(0, tokenAllocatedBefore);
        assert.equal(rate*buyWei, tokenAllocatedAfter);

        var balanceAccountTwoAfter = await contract.balanceOf(accounts[2]);
        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(rate*buyWei, balanceAccountTwoAfter);

        var weiRaisedAfter = await contract.weiRaised.call();
        //console.log("weiRaisedAfter = " + weiRaisedAfter);
        assert.isTrue(weiRaisedBefore < weiRaisedAfter);
        assert.equal(0, weiRaisedBefore);
        assert.equal(buyWei, weiRaisedAfter);

        var depositedAfter = await contract.getDeposited.call(accounts[2]);
        //console.log("DepositedAfter = " + depositedAfter);
        assert.equal(buyWei, depositedAfter);

        var balanceAccountThreeBefore = await contract.balanceOf(accounts[3]);
        await contract.buyTokens(accounts[3],{from:accounts[3], value:buyWeiNew});
        var balanceAccountThreeAfter = await contract.balanceOf(accounts[3]);
        assert.isTrue(balanceAccountThreeBefore < balanceAccountThreeAfter);
        assert.equal(0, balanceAccountThreeBefore);
        //console.log("balanceAccountThreeAfter = " + balanceAccountThreeAfter);
        assert.equal(rateNew*buyWeiNew, balanceAccountThreeAfter);

        var tokenAllocatedEnd = await contract.tokenAllocated.call();
        //console.log("tokenAllocatedEnd = " + tokenAllocatedEnd);

        var balanceOwnerAfter = await contract.balanceOf(owner);
        //console.log("balanceOwner = " + balanceOwnerAfter);
        assert.notEqual(totalSupply - balanceAccountThreeAfter - balanceAccountTwoAfter, balanceOwnerAfter);

    });


    it('verification cap reached', async ()  => {
            var weiRaisedBefore = await contract.weiRaised.call();
            assert.equal(buyWei + buyWeiNew, weiRaisedBefore);
            var balanceAccountOneBefore = await contract.balanceOf(accounts[1]);
            await contract.buyTokens(accounts[1],{from:accounts[1], value:buyWeiCap});
            var balanceAccountOneAfter = await contract.balanceOf(accounts[1]);
            assert.isTrue(balanceAccountOneBefore < balanceAccountOneAfter);
            assert.equal(0, balanceAccountOneBefore);
            console.log("balanceAccountOneAfter = " + balanceAccountOneAfter);
            assert.equal(rate*buyWeiCap, balanceAccountOneAfter);

    });


});



