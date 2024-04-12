import {card} from "composables/types/card";
import {query} from "composables/types/query";
import { Record } from "pocketbase";
import {Card} from "~/composables/types/draft_types";

export const usePickStore = defineStore('main', {
    state: () => ({
        picks: [] as Card[],
        artMap: new Map<string,string>,
        packSize: 14,
        pickIndex: 0,
        roundIndex: 0,
    }),
    getters: {
        getPicks: (state) => state.picks,
        getPickIndex: (state) => state.pickIndex,
        getInversePickIndex: (state) => state.packSize - state.pickIndex%state.packSize,
        getRoundIndex: (state) => state.roundIndex,
    },
    actions: {
        addPick(payload: Card) {
            this.picks.push(payload);
            this.picks.sort((x,y) => x.card_in_pack - y.card_in_pack)
        },
        removePick(removed: Card) {
            let index = this.picks.findIndex(card => card.record.id === removed.record.id)
            if (index > -1)  {
                this.picks.splice(index, 1)
            }
        },
        incrementIndex() { this.pickIndex++ },

    }

})
