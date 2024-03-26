import {Pack, Round} from "~/composables/types/draft_types";
import {PackBuilder} from "~/composables/useBuildPack";

export class RoundBuilder {
    private packs: PackBuilder[] = []
    useBuildRound() {
        // round array declaration
        // propagate round
        for (let i = 0; i < 8; i++) {
            this.packs.push(new PackBuilder(i))
        }
        // increment index
        return this.packs;
    }


    findIndex(pack: PackBuilder, wanted_id: string) {
        return pack.pack.cards.findIndex(card => card.id === wanted_id)
    }
    /*
    function that takes a pack_index and card id as imput
    load round from state
    from pack remove one and only one instance of a card whose id matches that of the input card id
    update state
    */
    useRemovePick(pack_index: number, card_id: string) {
        const idx = this.findIndex(this.packs[pack_index], card_id)
        if (idx > -1)  {
            this.packs[pack_index].pack.cards.splice(idx, 1)
        }
    }
}