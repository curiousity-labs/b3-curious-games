export const addressSubString = (address: string) => {
  return `${address.substring(0, 5)}...${address.slice(-6)}`
}