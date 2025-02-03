import { BigInt } from '@graphprotocol/graph-ts'
import { KodiakIslandWithRouter__getUnderlyingBalancesResult, Transfer as TransferEvent } from '../generated/KodiakIslandWithRouter/KodiakIslandWithRouter'
import { KodiakIslandWithRouter } from "../generated/KodiakIslandWithRouter/KodiakIslandWithRouter"
import { IslandHolder, YTHolder, IslandBalances } from '../generated/schema'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export function handleIslandTransfer(ev: TransferEvent): void {
  const from = ev.params.from.toHex()
  const to = ev.params.to.toHex()
  const amt: BigInt = ev.params.amount

  if(from != ZERO_ADDRESS) {
    let prevIslandAmt: BigInt
    let holder: IslandHolder | null = IslandHolder.load(from)
    if(!holder) {
      holder = new IslandHolder(from)
      prevIslandAmt = BigInt.fromI32(0)
    }
    else {
      prevIslandAmt = holder.islandAmt
    }
  
    holder.address = from
    holder.islandAmt = prevIslandAmt.minus(amt)
    holder.save()
  }

  if(to != ZERO_ADDRESS) {
    let prevIslandAmt: BigInt
    let holder: IslandHolder | null = IslandHolder.load(to)
    if(!holder) {
      holder = new IslandHolder(to)
      prevIslandAmt = BigInt.fromI32(0)
    }
    else {
      prevIslandAmt = holder.islandAmt
    }

    holder.address = to
    holder.islandAmt = prevIslandAmt.plus(amt)
    holder.save()
  }
}

export function handleYTTransfer(ev: TransferEvent): void {
  const from = ev.params.from.toHex()
  const to = ev.params.to.toHex()
  const amt: BigInt = ev.params.amount

  if(from != ZERO_ADDRESS) {
    let prevytAmt: BigInt
    let holder: YTHolder | null = YTHolder.load(from)
    if(!holder) {
      holder = new YTHolder(from)
      prevytAmt = BigInt.fromI32(0)
    }
    else {
      prevytAmt = holder.ytAmt
    }

    holder.address = from
    holder.ytAmt = prevytAmt.minus(amt)
    holder.save()
  }

  if(to != ZERO_ADDRESS) {
    let prevytAmt: BigInt
    let holder: YTHolder | null = YTHolder.load(to)
    if(!holder) {
      holder = new YTHolder(to)
      prevytAmt = BigInt.fromI32(0)
    }
    else {
      prevytAmt = holder.ytAmt
    }

    holder.address = to
    holder.ytAmt = prevytAmt.plus(amt)
    holder.save()
  }
}

export function handleBalanceChange(ev: TransferEvent): void {
  const island = KodiakIslandWithRouter.bind(ev.address)
  const balanceResult: KodiakIslandWithRouter__getUnderlyingBalancesResult = island.getUnderlyingBalances()
  const balances: BigInt[] = [balanceResult.value0, balanceResult.value1]
  const totalIslandSupply: BigInt = island.totalSupply()
  const balance0PerIsland = balances[0].div(totalIslandSupply)
  const balance1PerIsland = balances[1].div(totalIslandSupply)

  let islandBalances: IslandBalances | null = IslandBalances.load('1')
  if(!islandBalances) {
    islandBalances = new IslandBalances('1')
  }

  islandBalances.balance0 = balance0PerIsland
  islandBalances.balance1 = balance1PerIsland
  islandBalances.save()

}