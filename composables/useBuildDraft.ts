import { Record } from "pocketbase";
import {Box} from "~/composables/types/draft_types";
import {RoundBuilder} from "~/composables/useBuildRound";
const allRecords = ref<Record[]>([])

const fetchData = async ()=> {
    try {
        const records = await useRecords;
        allRecords.value = records;
    } catch (error) {
        console.error(error)
    }
}
export class Draft {
    box: Box = {
        rounds: []
    }
    async useBuildDraft() {
        // declare empty box
        // make 24 packs with a shared cardMap
        // append the packs to the box
        // return the box
        await fetchData()
        const cardData = useState('card-data', () => allRecords)
        for (let i = 0; i < 3; i++) {
            const roundBuiler = new RoundBuilder(i)
            this.box.rounds.push(roundBuiler.useBuildRound());
        }
        const draftBox = useState('draft-box', () => this.box)
        console.log(draftBox.value)
    }
}