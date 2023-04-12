import { createContext } from "react"
import { StoreManager } from "src/lib/store/StoreManager"

const value = new StoreManager()
export const StoreManagerContext = createContext<StoreManager>(value)

export function StoreManagerProvider({ children }: any) {
  return <StoreManagerContext.Provider value={value}>{children}</StoreManagerContext.Provider>
}
