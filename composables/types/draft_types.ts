import {Record} from "pocketbase";
import {PackBuilder} from "~/composables/useBuildPack";
import {RoundBuilder} from "~/composables/useBuildRound";

export type Card = {
    card_in_pack: number,
    record: Record
}

export type Pack = {
    index: number
    cards: Card[]
}

export type Round = {
    packBuilders: PackBuilder[]
}

export type Box = {
    roundBuilders: RoundBuilder[]
}
