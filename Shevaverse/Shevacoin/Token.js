const {ethers, BigNumber} = require("ethers");
const TokenABI = require('./Token.json');
const Web3 = require("./node_modules/web3");
const ethJsUtil = require( "./node_modules/ethereumjs-util");



const web3 = new Web3();
const abi = TokenABI.abi;
const provider = new ethers.providers.InfuraProvider(
    process.env.ETHEREUM_NET,
    process.env.INFURA_API_KEY
);
const addressContract = process.env.CONTRACT_ADDRESS;
const addressOwner = process.env.CONTRACT_OWNER;



const transfer = async(signerPrivateKey, addressTo, amountToTransfer) =>
{
    try
    {
    const signer = new ethers.Wallet(signerPrivateKey, provider);
    let Token = new ethers.Contract(addressContract, abi, signer);
    let transaction = await Token.transfer(addressTo, ethers.utils.parseUnits(amountToTransfer.toString(), "ether"));
    const receipt = await transaction.wait();
    return "DONE";
    }
    catch(error)
    {
    return "ERROR";
    }
}



const buy = async(signerPrivateKey, amountToBuy) =>
{
    try
    {
    const signer = new ethers.Wallet(signerPrivateKey, provider);
    let baseNonce = provider.getTransactionCount(signer.getAddress());
    let nonceOffset = 0;
    function getNonce()
    {
        return baseNonce.then((nonce) => (nonce + (nonceOffset++)));
    }
    amountToBuy = ethers.utils.parseUnits(amountToBuy.toString(), "ether");
    let Token = new ethers.Contract(addressContract, abi, signer);
    let amount = BigNumber.from(amountToBuy);
    let price = await Token.getPricePerToken({nonce: getNonce()});
    let _value = (amount.mul(BigNumber.from(price))).div("1000000000000000000");
    let transaction = Token.buy(amountToBuy, {value: _value.toString(), nonce: getNonce()});
    let sendTransactionPromise = await signer.sendTransaction(transaction);
    const receipt = await sendTransactionPromise.wait();
    return "DONE";
    }
    catch(error)
    {
    return "ERROR";
    }
}



const sell = async(signerPrivateKey, amountToSell) =>
{
    try
    {
    amountToSell = ethers.utils.parseUnits(amountToSell.toString(), "ether");
    const signer = new ethers.Wallet(signerPrivateKey, provider);
    let baseNonce = provider.getTransactionCount(signer.getAddress());
    let nonceOffset = 0;
    function getNonce()
    {
        return baseNonce.then((nonce) => (nonce + (nonceOffset++)));
    }
    let Token = new ethers.Contract(addressContract, abi, signer);
    let allowance = await Token.allowance(signer.address, addressContract, {nonce: getNonce()});
    if (BigNumber.from(allowance).lt(BigNumber.from(amountToSell)))
    {
    let tr = Token.increaseAllowance(addressContract, amountToSell, {nonce: getNonce()});
    let tx = await signer.sendTransaction(tr, {nonce: getNonce()});
    const receipt = await tx.wait();
    }
    let transaction = Token.sell(amountToSell, {nonce: getNonce(), gasLimit: "9000000"});
    let sendTransactionPromise = await signer.sendTransaction(transaction);
    const receipt = await sendTransactionPromise.wait();
    return "DONE";
    }
    catch(error)
    {
    return "ERROR";
    }
}
