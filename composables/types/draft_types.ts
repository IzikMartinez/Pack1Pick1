import {Record} from "pocketbase";
import {PackBuilder} from "~/composables/useBuildPack";
import {RoundBuilder} from "~/composables/useBuildRound";

export type Pack = {
    index: number
    cards: Record[]
}

export type Round = {
    packBuilders: PackBuilder[]
}

export type Box = {
    roundBuilders: RoundBuilder[]
}
