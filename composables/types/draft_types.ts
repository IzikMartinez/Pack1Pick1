import {Record} from "pocketbase";

export type Pack = {
    index: number
    cards: Record[]
}

export type Round = {
    packs: Pack[]
}

export type Box = {
    rounds: Round[]
}
