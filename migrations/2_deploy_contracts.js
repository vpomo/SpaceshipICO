const SXTCrowdsale = artifacts.require('./SXTCrowdsale.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm

    var startTime = 1516838400; //25 Jan 2018, 00:00:00 GMT
    var endTime = 1519603199; //25 Feb 2018, 23:59:59 GMT
    var owner = "0x920630D883Db8430B657b0A246913FF201E6598f";

    deployer.deploy(SXTCrowdsale, startTime, endTime, owner);

};
