/**
 * @file mt-web3.js
 * @description This file wraps web3.js methods for interacting with an erc-1155 contract.
 * @note interaction methods are defined in according with @openzeppelin/contracts/token/ERC1155/ERC1155.sol
 */

const Web3 = require('web3')

import { AbiItem } from 'web3-utils'

/**
 * @arg provider net provider
 * @arg signer msg sender
 * @arg address
 */

class MTWeb3 {
  web3 // Web3 instance

  contract // Contract instance

  /**
   * Only connect to the provider
   * @param {string} provider node provider RPC URL, such as Alchemy.
   * @param {string} signer default account address.
   */
  constructor (provider, signer) {
    this.web3 = new Web3(provider)
    this.web3.eth.defaultAccount = signer
  }

  /**
   * Create an contract instance.
   * @param {*} jsonInterface
   * @param {string} address optional
   * @param {*} options optional
   */
  contract (jsonInterface, address, options) {
    console.log('connecting to the deployed contract...')
    this.contract = new this.web3.eth.Contract(jsonInterface, address, options)
  }

  /**
   * @param deployOptions options for deployment
   * @param sendOptions
   */
  deploy (deployOptions, sendOptions) {
    if (typeof this.contract === 'undefined') {
      console.log('contract instance is undefined')
      return
    }

    console.log('deploying and connecting to the new contract...')

    this.contract
      .deploy(deployOptions)
      .send(sendOptions)
      .on('error', function (error) {
        console.log(error)
      })
      .on('transactionHash', function (transactionHash) {
        console.log(transactionHash)
      })
      .then()
  }

  //
  setSigner (signer) {
    this.#signer = signer
  }

  // erc-1155 methods
  balanceOf (account, id) {
    this.contract.methods
      .balanceOf(account, id)
      .then(console.log)
      .catch(console.error)
  }

  balanceOfBatch (accounts, ids) {}
  setApprovalForAll (operator, approved) {}
  isApprovedForAll (account, operator) {}
  safeTransferFrom (from, to, id, amount, data) {}
  safeBatchTransferFrom (from, to, ids, amounts, data) {}

  mint (to, id, amount, data) {}
  mintBatch (to, ids, amounts, data) {}
  burn (from, id, amount) {}
  burnBatch (from, ids, amounts) {}
  uri () {}
  setURI (newuri) {}

  /**
   * Used for test, will be deleted after code test.
   */
  versionOfWeb3 () {
    log.console(this.web3.version)
  }
}

exports.MTWeb3 = { MTWeb3 }
