import { Record } from 'pocketbase'
import {Pack, Round} from "~/composables/types/draft_types";
import {PackBuilder} from "~/composables/useBuildPack";

type Box = {
    packs: Record[][]
}

export class RoundBuilder {
    private index = 0
    private round: Round = {
        index: this.index,
        packs: []
    };
    makePack(pack_id: number, cards: Record[]) {
        return {
            pack_id: pack_id,
            cards: cards
        }
    }

    useBuildRound(): Round {
        // round array declaration
        const packBuilder = new PackBuilder()
        // propagate round
        for (let i = 0; i < 8; i++) {
            this.round.packs.push(packBuilder.useBuildPack())
        }
        // increment index
        this.round.index = this.index++;
        return this.round;
    }


    findIndex(pack: Pack, wanted_id: string) {
        return pack.cards.findIndex(card => card.id === wanted_id)
    }
    /*
    function that takes a pack_index and card id as imput
    load round from state
    from pack remove one and only one instance of a card whose id matches that of the input card id
    update state
    */
    useRemovePick(pack_idx: number, card_id: string) {
        const idx = this.findIndex(this.round.packs[pack_idx], card_id)
        if (idx > -1)  {
            this.round.packs[pack_idx].cards.splice(idx, 1)
        }
    }
}