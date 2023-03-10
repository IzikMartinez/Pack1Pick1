import {card} from "composables/types/card";
import {query} from "composables/types/query";
import { Record } from "pocketbase";

export const usePickStore = defineStore('main', {
    state: () => ({
        picks: [] as Record[],
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
        addPick(payload: Record) { this.picks.push(payload); this.picks.sort((x,y) => x.card_id - y.card_id) },
        removePick(removed: Record) { 
            this.picks = this.picks.filter(x => x !== removed)
        },
        incrementIndex() { this.pickIndex++ },

    }

})
