import { Record } from "pocketbase";
import {Box} from "~/composables/types/draft_types";
import {RoundBuilder} from "~/composables/useBuildRound";

export class Draft {
    box: Box = {
        rounds: []
    }

    constructor() {
        this.useBuildDraft()
    }
    useBuildDraft() {
        // declare empty box
        // make 24 packs with a shared cardMap
        // append the packs to the box
        // return the box
        for (let i = 0; i < 3; i++) {
            const roundBuiler = new RoundBuilder()
            this.box.rounds.push(roundBuiler.useBuildRound());
        }
        const draftBox: Ref<Box> = useState('draft-box', () => this.box)
        console.log(draftBox.value)
        return draftBox;

    }
}