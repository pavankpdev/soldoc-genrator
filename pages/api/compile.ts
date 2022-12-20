import type { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
import solc from "solc";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = {
    language: 'Solidity',
    sources: {
      'test.sol': {
        content: (JSON.parse(req.body)).solContents,
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

  var output = JSON.parse(solc.compile(JSON.stringify(input)));

  let abi: any = []
  for (var contractName in output.contracts['test.sol']) {
    abi = output.contracts['test.sol'][contractName].abi;
  }

  res.status(200).json({ data: abi })
}
