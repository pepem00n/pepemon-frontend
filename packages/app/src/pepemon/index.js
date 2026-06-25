import BigNumber from 'bignumber.js'
import Web3 from 'web3'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export { Pepemon } from './Pepemon.js'
export { Web3, BigNumber }
