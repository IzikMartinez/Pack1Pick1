import {Record} from "pocketbase";

export type pack = {
    pack_id: number,
    cards: Record[]
}

export type round = {
    packs: pack[]
}
