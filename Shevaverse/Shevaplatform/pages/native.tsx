import Moralis from 'moralis';
import {GetServerSideProps} from 'next';
import type {NextPage} from 'next';
import Head from 'next/head';

export default function Native({
                              Account
}: {
    Account: {
        address: string,
        nativeBalance: string
    }
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Shevaverse</title>
            </Head>
        <div>
            <h1 className="text-3xl font-bold text-center">Wallet: {Account.address}</h1>
            <h1 className="text-3xl font-bold text-center">ETH balance: {Account.nativeBalance} ETH</h1>
        </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps =
    async (context) => {
    await Moralis.start({apiKey: process.env.MORALIS_API_KEY});
    const address = '0x56016C78469aF1547B9aA5747F000ff9201B690f';
    const chain = '0x5';
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
        address, chain
    });
    return {
        props: {
            Account: {
                address: address,
                nativeBalance: nativeBalance.result.balance.ether
            }
        }
    }
}