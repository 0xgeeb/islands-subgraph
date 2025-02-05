import { BigInt } from '@graphprotocol/graph-ts'
import { KodiakIslandWithRouter__getUnderlyingBalancesResult, Transfer as TransferEvent } from '../generated/KodiakIslandWithRouter/KodiakIslandWithRouter'
import { KodiakIslandWithRouter } from "../generated/KodiakIslandWithRouter/KodiakIslandWithRouter"
import {
  RsethIslandHolder,
  RsethYTHolder,
  RsethIslandBalances,
  UnibtcIslandHolder,
  UnibtcYTHolder,
  UnibtcIslandBalances,
  SolvbtcIslandHolder,
  SolvbtcYTHolder,
  SolvbtcIslandBalances,
} from '../generated/schema'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

const STAKING_ARRAY = []

export function handleRsethIslandTransfer(ev: TransferEvent): void {
  const from = ev.params.from.toHex()
  const to = ev.params.to.toHex()
  const amt: BigInt = ev.params.amount

  if(from != ZERO_ADDRESS) {
    let prevIslandAmt: BigInt
    let holder: RsethIslandHolder | null = RsethIslandHolder.load(from)
    if(!holder) {
      holder = new RsethIslandHolder(from)
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
    let holder: RsethIslandHolder | null = RsethIslandHolder.load(to)
    if(!holder) {
      holder = new RsethIslandHolder(to)
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

export function handleUnibtcIslandTransfer(ev: TransferEvent): void {
  const from = ev.params.from.toHex()
  const to = ev.params.to.toHex()
  const amt: BigInt = ev.params.amount

  if(from != ZERO_ADDRESS) {
    let prevIslandAmt: BigInt
    let holder: UnibtcIslandHolder | null = UnibtcIslandHolder.load(from)
    if(!holder) {
      holder = new UnibtcIslandHolder(from)
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
    let holder: UnibtcIslandHolder | null = UnibtcIslandHolder.load(to)
    if(!holder) {
      holder = new UnibtcIslandHolder(to)
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

export function handleSolvbtcIslandTransfer(ev: TransferEvent): void {
  const from = ev.params.from.toHex()
  const to = ev.params.to.toHex()
  const amt: BigInt = ev.params.amount

  if(from != ZERO_ADDRESS) {
    let prevIslandAmt: BigInt
    let holder: SolvbtcIslandHolder | null = SolvbtcIslandHolder.load(from)
    if(!holder) {
      holder = new SolvbtcIslandHolder(from)
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
    let holder: SolvbtcIslandHolder | null = SolvbtcIslandHolder.load(to)
    if(!holder) {
      holder = new SolvbtcIslandHolder(to)
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

export function handleRsethYTTransfer(ev: TransferEvent): void {
  const from = ev.params.from.toHex()
  const to = ev.params.to.toHex()
  const amt: BigInt = ev.params.amount

  if(from != ZERO_ADDRESS) {
    let prevytAmt: BigInt
    let holder: RsethYTHolder | null = RsethYTHolder.load(from)
    if(!holder) {
      holder = new RsethYTHolder(from)
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
    let holder: RsethYTHolder | null = RsethYTHolder.load(to)
    if(!holder) {
      holder = new RsethYTHolder(to)
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

export function UnibtcYTTransfer(ev: TransferEvent): void {
  const from = ev.params.from.toHex()
  const to = ev.params.to.toHex()
  const amt: BigInt = ev.params.amount

  if(from != ZERO_ADDRESS) {
    let prevytAmt: BigInt
    let holder: UnibtcYTHolder | null = UnibtcYTHolder.load(from)
    if(!holder) {
      holder = new UnibtcYTHolder(from)
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
    let holder: UnibtcYTHolder | null = UnibtcYTHolder.load(to)
    if(!holder) {
      holder = new UnibtcYTHolder(to)
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

export function handleSolvbtcYTTransfer(ev: TransferEvent): void {
  const from = ev.params.from.toHex()
  const to = ev.params.to.toHex()
  const amt: BigInt = ev.params.amount

  if(from != ZERO_ADDRESS) {
    let prevytAmt: BigInt
    let holder: SolvbtcYTHolder | null = SolvbtcYTHolder.load(from)
    if(!holder) {
      holder = new SolvbtcYTHolder(from)
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
    let holder: SolvbtcYTHolder | null = SolvbtcYTHolder.load(to)
    if(!holder) {
      holder = new SolvbtcYTHolder(to)
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

export function handleRsethBalanceChange(ev: TransferEvent): void {
  const island = KodiakIslandWithRouter.bind(ev.address)
  const balanceResult: KodiakIslandWithRouter__getUnderlyingBalancesResult = island.getUnderlyingBalances()
  const balances: BigInt[] = [balanceResult.value0, balanceResult.value1]
  const totalIslandSupply: BigInt = island.totalSupply()
  const balance0PerIsland = balances[0].div(totalIslandSupply)
  const balance1PerIsland = balances[1].div(totalIslandSupply)

  let islandBalances: RsethIslandBalances | null = RsethIslandBalances.load('1')
  if(!islandBalances) {
    islandBalances = new RsethIslandBalances('1')
  }

  islandBalances.balance0 = balance0PerIsland
  islandBalances.balance1 = balance1PerIsland
  islandBalances.save()
}

export function handleUnibtcBalanceChange(ev: TransferEvent): void {
  const island = KodiakIslandWithRouter.bind(ev.address)
  const balanceResult: KodiakIslandWithRouter__getUnderlyingBalancesResult = island.getUnderlyingBalances()
  const balances: BigInt[] = [balanceResult.value0, balanceResult.value1]
  const totalIslandSupply: BigInt = island.totalSupply()
  const balance0PerIsland = balances[0].div(totalIslandSupply)
  const balance1PerIsland = balances[1].div(totalIslandSupply)

  let islandBalances: UnibtcIslandBalances | null = UnibtcIslandBalances.load('1')
  if(!islandBalances) {
    islandBalances = new UnibtcIslandBalances('1')
  }

  islandBalances.balance0 = balance0PerIsland
  islandBalances.balance1 = balance1PerIsland
  islandBalances.save()
}

export function handleSolvbtcBalanceChange(ev: TransferEvent): void {
  const island = KodiakIslandWithRouter.bind(ev.address)
  const balanceResult: KodiakIslandWithRouter__getUnderlyingBalancesResult = island.getUnderlyingBalances()
  const balances: BigInt[] = [balanceResult.value0, balanceResult.value1]
  const totalIslandSupply: BigInt = island.totalSupply()
  const balance0PerIsland = balances[0].div(totalIslandSupply)
  const balance1PerIsland = balances[1].div(totalIslandSupply)

  let islandBalances: SolvbtcIslandBalances | null = SolvbtcIslandBalances.load('1')
  if(!islandBalances) {
    islandBalances = new SolvbtcIslandBalances('1')
  }

  islandBalances.balance0 = balance0PerIsland
  islandBalances.balance1 = balance1PerIsland
  islandBalances.save()
}