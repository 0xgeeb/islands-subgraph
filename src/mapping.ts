import { ethereum, BigInt, Address } from '@graphprotocol/graph-ts'
import { Transfer as TransferEvent } from '../generated/KodiakIslandWithRouter/KodiakIslandWithRouter'
import { KodiakIslandWithRouter } from "../generated/KodiakIslandWithRouter/KodiakIslandWithRouter"
import { IslandDepositor } from '../generated/schema'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

function createEventID(event: ethereum.Event): string {
  return event.block.number.toString().concat('-').concat(event.logIndex.toString());
}

export function handleTransfer(ev: TransferEvent): void {
  let depositor: IslandDepositor | null
  const from = ev.params.from.toHex()
  const to = ev.params.to.toHex()
  const amt: BigInt = ev.params.amount
  const island = KodiakIslandWithRouter.bind(ev.address)
  const balances = island.getUnderlyingBalances()
  const totalIslandSupply = island.totalSupply()
  const balance0PerIsland = balances[0] / Number(totalIslandSupply)
  const balance1PerIsland = balances[1] / Number(totalIslandSupply)

  if(from != ZERO_ADDRESS) {
    depositor = IslandDepositor.load(from)
    if(!depositor) {
      depositor = new IslandDepositor(from)
    }
    
    const prevIslandAmt: any = depositor.islandAmt
    depositor.address = from
    depositor.islandAmt = new BigInt(prevIslandAmt - Number(amt))
    depositor.dtAmt = new BigInt((prevIslandAmt - Number(amt)) * balance0PerIsland)
    depositor.otAmt = new BigInt((prevIslandAmt - Number(amt)) * balance1PerIsland)
    depositor.save()
  }

  if(to != ZERO_ADDRESS) {
    depositor = IslandDepositor.load(to)
    if(!depositor) {
      depositor = new IslandDepositor(to)
    }

    const prevIslandAmt: any = depositor.islandAmt
    depositor.address = to
    depositor.islandAmt = new BigInt(prevIslandAmt + amt)
    depositor.dtAmt = new BigInt((prevIslandAmt + amt) * balance0PerIsland)
    depositor.otAmt = new BigInt((prevIslandAmt + amt) * balance1PerIsland)
    depositor.save()
  }
}