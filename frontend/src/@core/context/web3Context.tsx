
import { createContext, useState, ReactNode, useMemo, useEffect } from 'react'
import { ethers } from "ethers";
import { useCookies } from "react-cookie"
import strategyManagerAbi from "../../contracts/StrategyManager.json"
import strategyVaultAbi from "../../contracts/StrategyVault.json"
import { STRATEGY_MANAGER_CONTRACT_ADDRESS } from 'src/constants/consts';




let provider: any = null
if (typeof window !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum)
}



// ** Create Context
export const Web3Context = createContext<any>({
  connectAccount: async () => { },
  getStrategies: () => [],
  account: '',
  strats: {},
  strategyManagerContract: {},
})




export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<String>('')



  const getStrategyManager = async () => {
    const address = STRATEGY_MANAGER_CONTRACT_ADDRESS
    const abi = strategyManagerAbi.abi
    const contract = new ethers.Contract(address, abi, provider)
    return contract
  }

  const getRebalanceEvents = async () => {
    const contract = await getStrategyManager()
    const eventFilter = contract.filters.StrategyRebalanced()
    const blockn = (await provider.getBlockNumber()) - 500
    const events = await contract.queryFilter(eventFilter, blockn, "latest")
    return events.map((ev:any)=> ev.args[0])

  }

  const getStrategies = async () => {
    const contract = await getStrategyManager()
    const stratsAddresses: string[] = await contract.getStrategies()
    const strs = stratsAddresses.map((addr: string) => getStrategyVault(addr))
    return strs 
  }

  const getStrategyVault = (address: string) => {
    const abi = strategyVaultAbi.abi
    const contract = new ethers.Contract(address, abi, provider)
    return contract
    // setStrategyManagerContract(contract)
  }


  const connectAccount = async () => {
    if (account) return
    const accs = await provider.send("eth_requestAccounts", [])
    setAccount(accs[0])
    // setCookies("account", accs[0], cookiesSettings)
  }

  return <Web3Context.Provider value={{ connectAccount, account, getStrategies, getRebalanceEvents }}>{children}</Web3Context.Provider>
}

export const Web3Consumer = Web3Context.Consumer
