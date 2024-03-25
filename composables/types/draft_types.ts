import {Record} from "pocketbase";

export type Pack = {
    index: number,
    cards: Record[]
}

export type Round = {
    index: number,
    packs: Pack[]
}

export type Box = {
    rounds: Round[]
}
