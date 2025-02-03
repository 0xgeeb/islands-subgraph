import { BigInt } from '@graphprotocol/graph-ts'
import { KodiakIslandWithRouter__getUnderlyingBalancesResult, Transfer as TransferEvent } from '../generated/KodiakIslandWithRouter/KodiakIslandWithRouter'
import { KodiakIslandWithRouter } from "../generated/KodiakIslandWithRouter/KodiakIslandWithRouter"
import { IslandDepositor } from '../generated/schema'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export function handleTransfer(ev: TransferEvent): void {
  const from = ev.params.from.toHex()
  const to = ev.params.to.toHex()
  const amt: BigInt = ev.params.amount
  const island = KodiakIslandWithRouter.bind(ev.address)
  const balanceResult: KodiakIslandWithRouter__getUnderlyingBalancesResult = island.getUnderlyingBalances()
  const balances: BigInt[] = [balanceResult.value0, balanceResult.value1]
  const totalIslandSupply: BigInt = island.totalSupply()
  const balance0PerIsland = balances[0].div(totalIslandSupply)
  const balance1PerIsland = balances[1].div(totalIslandSupply)
  
  if(from != ZERO_ADDRESS) {
    let prevIslandAmt: BigInt
    let depositor: IslandDepositor | null
    depositor = IslandDepositor.load(from)
    if(!depositor) {
      depositor = new IslandDepositor(from)
      prevIslandAmt = BigInt.fromI32(0)
    }
    else {
      prevIslandAmt = depositor.islandAmt
    }
    
    prevIslandAmt = depositor.islandAmt
    depositor.address = from
    depositor.islandAmt = prevIslandAmt.minus(amt)
    depositor.dtAmt = (prevIslandAmt.minus(amt)).times(balance0PerIsland)
    depositor.otAmt = (prevIslandAmt.minus(amt)).times(balance1PerIsland)
    depositor.save()
  }

  if(to != ZERO_ADDRESS) {
    let prevIslandAmt: BigInt
    let depositor: IslandDepositor | null
    depositor = IslandDepositor.load(to)
    if(!depositor) {
      depositor = new IslandDepositor(to)
      prevIslandAmt = BigInt.fromI32(0)
    }
    else {
      prevIslandAmt = depositor.islandAmt
    }

    depositor.address = to
    depositor.islandAmt = prevIslandAmt.plus(amt)
    depositor.dtAmt = (prevIslandAmt.plus(amt)).times(balance0PerIsland)
    depositor.otAmt = (prevIslandAmt.plus(amt)).times(balance1PerIsland)
    depositor.save()
  }
}