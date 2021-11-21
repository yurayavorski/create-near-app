import { Contract, WalletConnection } from 'near-api-js'

interface MyContract extends Contract {
  getLastMessage(value: { accountId: string }): string
  greet(value: { name: string, color: string }): string
}

declare global {
  interface Window {
    walletConnection: WalletConnection
    accountId: string
    contract: MyContract
    nearInitPromise: Promise<void>
  }
}
