// in this script we deploy an erc-1155 smart contract on georli with the alchemy provider
const Web3 = require('web3')
const fs = require('fs')
const { sign } = require('crypto')

// dotenv
require('dotenv').config({ path: __dirname + '/./../.env' })
const { GOERLI, ADDRESSES, SOURCE, PRIVATEKEY } = process.env
const addrs = ADDRESSES.split('\n')

// Web3 instance
const web3 = new Web3(GOERLI)

// use `solc --combined-json` to generate source.json
// then we get `abi` and `code` of the desired contract from contracts
const source = fs.readFileSync(SOURCE)
const contracts = JSON.parse(source)['contracts']
const abi = contracts['contracts/MT.sol:MT'].abi
const code = '0x' + contracts['contracts/MT.sol:MT'].bin

// create the contract instance while it hasn't been deployed
const mt = new web3.eth.Contract(abi)

// set the chain property
mt.defaultChain = 'goerli'

// deploy return the tx obj
const txobj = mt.deploy({
  data: code,
  arguments: ['example.uri']
})

txobj
  .estimateGas({ from: addrs[0], data: code })
  .then(gas => {
    // gas value
    console.log(gas)
    // alchemy as a provider dosen't own you private key, so you need to sign tx locally.
    // to notice, web3.js dosen't support export private key from mnemonics.
    let signed = web3.eth.accounts.signTransaction(
      {
        data: txobj.encodeABI(),
        gas: gas
      },
      PRIVATEKEY
    )
    return signed
  })
  .then(signed => {
    // signed tx
    console.log(signed)
    let receipt = web3.eth.sendSignedTransaction(signed.rawTransaction)
    return receipt
  })
  .then(receipt => {
    // receipt, contractAddress is '0xd6024491e98DA9765Ee43a2F32160C39B40831Bb'
    // for the tx '0xb4f703feae73be15701dc06211d5c2d2def5448a0baa5be9ba01703db1dfc502'
    console.log(receipt.contractAddress)
  })
