import BigNumber from 'bignumber.js';
import ERC20Abi from './abi/erc20.json';
import PpdexAbi from './abi/ppdex.json';
import PpblzAbi from './abi/ppblz.json';
import UNIV2PairAbi from './abi/uni_v2_lp.json';
import PepemonStoreAbi from './abi/pepemon_store.json';
import PepemonStoreNativeAbi from './abi/pepemon_store_native.json';
import PepemonFactoryAbi from './abi/pepemon_factory.json';
import PepemonStakeAbi from './abi/pepemon_stake.json';
import MerkleDistributor from './abi/merkle_distributor.json';
import MerkleAbi from './abi/merkle.json';
import MerkleBSCAbi from './abi/merkleBSC.json';
import LotteryAbi from './abi/pepemon_lottery.json';
import { Contract } from '@ethersproject/contracts';

import { contractAddresses, SUBTRACT_GAS_LIMIT } from './constants.js'
import * as Types from './types.js'

export class Contracts {
  constructor(provider, networkId) {
    // this.web3 = web3
    // this.defaultConfirmations = options.defaultConfirmations
    // this.autoGasMultiplier = options.autoGasMultiplier || 1.5
    // this.confirmationType =
    //   options.confirmationType || Types.ConfirmationType.Confirmed
    // this.defaultGas = options.defaultGas
    // this.defaultGasPrice = options.defaultGasPrice
    if (parseFloat(networkId) === 1) {
		this.merkleDistributor = new Contract(contractAddresses.merkleDistributor[networkId], MerkleDistributor, provider.getSigner())
	}

    if (parseFloat(networkId) === 1 || parseFloat(networkId) === 4) {
      this.ppblz = new Contract(contractAddresses.ppblz[networkId], PpblzAbi, provider.getSigner())
      this.uniV2_ppblz = new Contract(contractAddresses.uniV2_ppblz[networkId], UNIV2PairAbi, provider.getSigner())
      this.uniV2_ppdex = new Contract(contractAddresses.uniV2_ppdex[networkId], UNIV2PairAbi, provider.getSigner())
      this.pepemonStake = new Contract(contractAddresses.pepemonStake[networkId], PepemonStakeAbi, provider.getSigner())
      this.merkle = new Contract(contractAddresses.merkle[networkId], MerkleAbi, provider.getSigner())
      this.merklePpblz = new Contract(contractAddresses.merklePpblz[networkId], MerkleAbi, provider.getSigner())
      this.merklePpdex = new Contract(contractAddresses.merklePpdex[networkId], MerkleAbi, provider.getSigner())
      this.merkleUniV2 = new Contract(contractAddresses.merkleUniV2[networkId], MerkleAbi, provider.getSigner())
      this.pepemonLottery = new Contract(contractAddresses.pepemonLottery[networkId], LotteryAbi, provider.getSigner())
      // this.pepemonPromoStore = new Contract(contractAddresses.pepemonPromoToken[networkId],
      this.pepemonPromoToken = new Contract(contractAddresses.pepemonPromoToken[networkId], ERC20Abi, provider.getSigner())
    }

    if (parseFloat(networkId) === 1 || parseFloat(networkId) === 4 || parseFloat(networkId) === 56 || parseFloat(networkId) === 137) {
      this.ppdex = new Contract(contractAddresses.ppdex[networkId], PpdexAbi, provider.getSigner());
      this.pepemonFactory = new Contract(contractAddresses.pepemonFactory[networkId], PepemonFactoryAbi, provider.getSigner());
      this.pepemonStore = new Contract(contractAddresses.pepemonStore[networkId], parseFloat(networkId) === 56 ? PepemonStoreNativeAbi : PepemonStoreAbi, provider.getSigner());
    }

    if (parseFloat(networkId) === 56) {
      this.merkleDego = new Contract(contractAddresses.merkleDego[networkId], MerkleBSCAbi, provider.getSigner());
    }
    // this.pools = supportedPools.map((pool) =>
    //   Object.assign(pool, {
    //     lpAddress: pool.lpAddresses[networkId],
    //     tokenAddress: pool.tokenAddresses[networkId],
    //     lpContract: new this.web3.eth.Contract(UNIV2PairAbi),
    //     tokenContract: new this.web3.eth.Contract(ERC20Abi),
    //   }),
    // )

    // this.setProvider(provider, networkId)
    // this.setDefaultAccount(this.web3.eth.defaultAccount)
  }

  setProvider(provider, networkId) {
    const setProvider = (contract, address) => {
      contract.setProvider(provider)
      if (address) contract.options.address = address
      else console.error('Contract address not found in network', networkId)
    }

	if (networkId === 1) {
      setProvider(this.merkleDistributor, contractAddresses.merkleDistributor[networkId])
    }

    if (networkId === 1 || networkId === 4) {
      setProvider(this.ppblz, contractAddresses.ppblz[networkId])
      setProvider(this.weth, contractAddresses.weth[networkId])
      setProvider(this.uniV2_ppblz, contractAddresses.uniV2_ppblz[networkId])
      setProvider(this.uniV2_ppdex, contractAddresses.uniV2_ppdex[networkId])
      setProvider(this.pepemonStake, contractAddresses.pepemonStake[networkId])
      setProvider(this.merkle, contractAddresses.merkle[networkId])
      setProvider(this.merklePpblz, contractAddresses.merklePpblz[networkId])
      setProvider(this.merklePpdex, contractAddresses.merklePpdex[networkId])
      setProvider(this.merkleUniV2, contractAddresses.merkleUniV2[networkId])
      setProvider(this.pepemonLottery, contractAddresses.pepemonLottery[networkId])
      setProvider(this.pepemonPromoStore, contractAddresses.pepemonPromoStore[networkId])
      setProvider(this.pepemonPromoToken, contractAddresses.pepemonPromoToken[networkId])
    }

    if (networkId === 56) {
      setProvider(this.merkleDego, contractAddresses.merkleDego[networkId])
    }

    setProvider(this.ppdex, contractAddresses.ppdex[networkId])
    setProvider(this.pepemonFactory, contractAddresses.pepemonFactory[networkId])
    setProvider(this.pepemonStore, contractAddresses.pepemonStore[networkId])
    // this.pools.forEach(
    //   ({ lpContract, lpAddress, tokenContract, tokenAddress }) => {
    //     setProvider(lpContract, lpAddress)
    //     setProvider(tokenContract, tokenAddress)
    //   },
    // )
  }

  setDefaultAccount(account) {
    this.ppblz.options.from = account
    this.ppdex.options.from = account
  }

  async callContractFunction(method, options) {
    const {
      confirmations,
      confirmationType,
      autoGasMultiplier,
      ...txOptions
    } = options

    if (!this.blockGasLimit) {
      await this.setGasLimit()
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate
      if (
        this.defaultGas &&
        confirmationType !== Types.ConfirmationType.Simulate
      ) {
        txOptions.gas = this.defaultGas
      } else {
        try {
          console.log('estimating gas')
          gasEstimate = await method.estimateGas(txOptions)
        } catch (error) {
          const data = method.encodeABI()
          const { from, value } = options
          const to = method._parent._address
          error.transactionData = { from, value, data, to }
          throw error
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier
        const totalGas = Math.floor(gasEstimate * multiplier)
        txOptions.gas =
          totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        let g = txOptions.gas
        return { gasEstimate, g }
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0)
    } else {
      txOptions.value = '0'
    }

    const promi = method.send(txOptions)

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    }

    let hashOutcome = OUTCOMES.INITIAL
    let confirmationOutcome = OUTCOMES.INITIAL

    const t =
      confirmationType !== undefined ? confirmationType : this.confirmationType

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`)
    }

    let hashPromise
    let confirmationPromise

    if (
      t === Types.ConfirmationType.Hash ||
      t === Types.ConfirmationType.Both
    ) {
      hashPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        promi.on('transactionHash', (txHash) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.RESOLVED
            resolve(txHash)
            if (t !== Types.ConfirmationType.Both) {
              const anyPromi = promi
              anyPromi.off()
            }
          }
        })
      })
    }

    if (
      t === Types.ConfirmationType.Confirmed ||
      t === Types.ConfirmationType.Both
    ) {
      confirmationPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (
            (t === Types.ConfirmationType.Confirmed ||
              hashOutcome === OUTCOMES.RESOLVED) &&
            confirmationOutcome === OUTCOMES.INITIAL
          ) {
            confirmationOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        const desiredConf = confirmations || this.defaultConfirmations
        if (desiredConf) {
          promi.on('confirmation', (confNumber, receipt) => {
            if (confNumber >= desiredConf) {
              if (confirmationOutcome === OUTCOMES.INITIAL) {
                confirmationOutcome = OUTCOMES.RESOLVED
                resolve(receipt)
                const anyPromi = promi
                anyPromi.off()
              }
            }
          })
        } else {
          promi.on('receipt', (receipt) => {
            confirmationOutcome = OUTCOMES.RESOLVED
            resolve(receipt)
            const anyPromi = promi
            anyPromi.off()
          })
        }
      })
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise
      if (this.notifier) {
        this.notifier.hash(transactionHash)
      }
      return { transactionHash }
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise
    }

    const transactionHash = await hashPromise
    if (this.notifier) {
      this.notifier.hash(transactionHash)
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    }
  }

  async callConstantContractFunction(method, options) {
    const m2 = method
    const { blockNumber, ...txOptions } = options
    return m2.call(txOptions, blockNumber)
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock('latest')
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT
  }
}
