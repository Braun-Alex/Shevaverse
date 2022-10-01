import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Security from "@material-ui/icons/Security.js";
import DataUsage from "@material-ui/icons/DataUsage.js";
import NavPills from "/components/NavPills/NavPills.js";
import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/pillsStyle.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import Button from "/components/CustomButtons/Button.js";
import Moralis from "moralis-v1";
import {ethers, BigNumber} from "ethers";

const useStyles = makeStyles(styles);
const ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "tokenName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenVersion",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenSymbol",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "tokenDecimals",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "tokenTotalSupply",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "pricePerNVR",
                "type": "uint256"
            }
        ],
        "name": "BuyToken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "pricePerNVR",
                "type": "uint256"
            }
        ],
        "name": "SellToken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountToBuy",
                "type": "uint256"
            }
        ],
        "name": "buy",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPricePerToken",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountToSell",
                "type": "uint256"
            }
        ],
        "name": "sell",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "version",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

const buyToken = async () => {
    const web3Provider = await Moralis.enableWeb3();
    const signer = web3Provider.getSigner();
    let baseNonce = web3Provider.getTransactionCount(signer.getAddress());
    let nonceOffset = 0;
    let amountToBuy = 1;
    function getNonce()
    {
        return baseNonce.then((nonce) => (nonce + (nonceOffset++)));
    }
    amountToBuy = ethers.utils.parseUnits(amountToBuy.toString(), "ether");
    let Token = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, signer);
    let amount = BigNumber.from(amountToBuy);
    let price = await Token.getPricePerToken({nonce: getNonce()});
    let _value = (amount.mul(BigNumber.from(price))).div("1000000000000000000");
    let transaction = Token.buy(amountToBuy, {value: _value.toString(), nonce: getNonce()});
    let sendTransactionPromise = await signer.sendTransaction(transaction);
    const receipt = await sendTransactionPromise.wait();
}

const sellToken = async () => {
    let amountToSell = 1;
    amountToSell = ethers.utils.parseUnits(amountToSell.toString(), "ether");
    const web3Provider = await Moralis.enableWeb3();
    const signer = web3Provider.getSigner();
    let baseNonce = web3Provider.getTransactionCount(signer.getAddress());
    let nonceOffset = 0;
    function getNonce()
    {
        return baseNonce.then((nonce) => (nonce + (nonceOffset++)));
    }
    let Token = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, signer);
    let allowance = await Token.allowance(signer.getAddress(),
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, {nonce: getNonce()});
    if (BigNumber.from(allowance).lt(BigNumber.from(amountToSell)))
    {
        let tr = Token.increaseAllowance(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, amountToSell, {nonce: getNonce()});
        let tx = await signer.sendTransaction(tr);
        const receipt = await tx.wait();
    }
    let transaction = Token.sell(amountToSell, {nonce: getNonce(), gasLimit: "9000000"});
    let sendTransactionPromise = await signer.sendTransaction(transaction);
    const receipt = await sendTransactionPromise.wait();
}

export default function SectionPills() {
    const classes = useStyles();
    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <div id="navigation-pills">
                            <NavPills
                                color="rose"
                                horizontal={{
                                    tabsGrid: {xs: 12, sm: 4, md: 2},
                                    contentGrid: {xs: 12, sm: 8, md: 10}
                                }}
                                tabs={[
                                    {
                                        tabButton: "Create poll",
                                        tabIcon: Schedule,
                                        tabContent: (
                                            <span>
                        You will be able to create polls here soon
                      </span>
                                        )
                                    },
                                    {
                                        tabButton: "Vote",
                                        tabIcon: Dashboard,
                                        tabContent: (
                                            <span>
                        You will be able to vote here soon
                      </span>
                                        )
                                    },
                                    {
                                        tabButton: "Buy Shevacoin",
                                        tabIcon: Security,
                                        tabContent: (
                                            <Card className={classes.textCenter}>
                                                <CardHeader color="warning">
                                                    You must have at least 1 SHEVA to be eligible
                                                    to use poll's interface
                                                </CardHeader>
                                                <CardBody>
                                                    <h4 className={classes.cardTitle}>
                                                        Price: 1 SHEVA = 0.1834 ETH
                                                    </h4>
                                                    <Button
                                                        onClick={buyToken}
                                                        color="info"
                                                    >
                                                        Buy token
                                                    </Button>
                                                </CardBody>
                                            </Card>
                                        )
                                    },
                                    {
                                        tabButton: "Sell Shevacoin",
                                        tabIcon: DataUsage,
                                        tabContent: (
                                            <Card className={classes.textCenter}>
                                                <CardHeader color="warning">
                                                    You must have at least 1 SHEVA to be eligible
                                                    to sell token
                                                </CardHeader>
                                                <CardBody>
                                                    <h4 className={classes.cardTitle}>
                                                        Price: 1 SHEVA = 0.1834 ETH
                                                    </h4>
                                                    <Button
                                                        onClick={sellToken}
                                                        color="info"
                                                    >
                                                        Sell token
                                                    </Button>
                                                </CardBody>
                                            </Card>
                                        )
                                    }
                                ]}
                            />
                </div>
            </div>
        </div>
    );
}
