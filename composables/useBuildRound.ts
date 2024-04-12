import {Pack, Round} from "~/composables/types/draft_types";
import {PackBuilder} from "~/composables/useBuildPack";

export class RoundBuilder {
    packs: Round = {
        packBuilders: []
    }
    constructor() {
        this.useBuildRound()
    }
    useBuildRound() {
        // round array declaration
        // propagate round
        for (let i = 0; i < 8; i++) {
            this.packs.packBuilders.push(new PackBuilder(i))
        }
    }
    findIndex(packBuilder: PackBuilder, wanted_id: string) {
        return packBuilder.pack.cards.findIndex(card => card.record.id === wanted_id)
    }
    /*
    function that takes a pack_index and card id as imput
    load round from state
    from pack remove one and only one instance of a card whose id matches that of the input card id
    update state
    */
    useRemovePick(pack_index: number, card_id: string) {
        const idx = this.findIndex(this.packs.packBuilders[pack_index], card_id)
        if (idx > -1)  {
            this.packs.packBuilders[pack_index].pack.cards.splice(idx, 1)
        }
    }

    removeCardFromAll() {
        this.packs.packBuilders.forEach(pack => pack.removeRandomCard())
    }

    removeCardFromAllButActive(pack_id: number) {
        this.packs.packBuilders.forEach(pack => {
            if (pack.pack.index !== pack_id) {
                pack.removeRandomCard()
            }
        })
    }

    removeCardFromPacks(current_pack: number) {
        this.packs.packBuilders.forEach(packBuilder => {
            if(packBuilder.pack.index != current_pack)
                packBuilder.removeRandomCard()
        })
        //this.packs.filter(pack => pack.pack_id = pack_id)
    }
}