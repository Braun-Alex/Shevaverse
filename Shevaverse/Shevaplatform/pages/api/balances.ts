// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import Moralis from "moralis";

type Balances = {
  nativeBalance: string,
  tokenBalances: string []
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Balances>
) {
  await Moralis.start({apiKey: process.env.MORALIS_API_KEY});
  const address = '0x56016C78469aF1547B9aA5747F000ff9201B690f';
  const chain = '0x5';
  const [nativeBalance, tokenBalances] = await Promise.all([
    Moralis.EvmApi.balance.getNativeBalance({address, chain}),
    Moralis.EvmApi.token.getWalletTokenBalances({address, chain})
  ]);
  res.status(200).json({
    nativeBalance: nativeBalance.result.balance.ether,
    tokenBalances: tokenBalances.result.map((token) => token.display())
  });
}
