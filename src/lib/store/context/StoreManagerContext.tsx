import { createContext, useContext } from "react"
import { StoreManager } from "src/lib/store/StoreManager"

const value = new StoreManager()
const StoreManagerContext = createContext<StoreManager>(value)

export function StoreManagerProvider({ children }: any) {
  return <StoreManagerContext.Provider value={value}>{children}</StoreManagerContext.Provider>
}

export function useStoreManager() {
  return useContext(StoreManagerContext)
}
