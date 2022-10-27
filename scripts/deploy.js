// this script deploy a erc-1155 smart contract
const Web3 = require('web3')
const fs = require('fs')
const { Console } = require('console')
// dotenv
require('dotenv').config({ path: __dirname + '/./../.env' })
const { GOERLI, ADDRESSES, SOURCE } = process.env
const addrs = ADDRESSES.split('\n')

// Web3 instance
const web3 = new Web3(GOERLI)

// solc --combined-json
const source = fs.readFileSync(SOURCE)
const contracts = JSON.parse(source)['contracts']
const abi = contracts['contracts/MT.sol:MT'].abi
const code = '0x' + contracts['contracts/MT.sol:MT'].bin

// create the mt instance
const mt = new web3.eth.Contract(abi)

// mt.deploy({
//   data: code,
//   arguments: 'example.uri'
// })
//   .send({
//     from: addrs[0]
//   })
//   .on('receipt', receipt => {
//     console.log(receipt.contractAddress)
//   })
//   .then(contract => {
//     console.log(contract.options.address)
//   })
