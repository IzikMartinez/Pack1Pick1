import { Record } from "pocketbase";

const allRecords = ref<Record[]>([])
let box = [] as Record[][]

const fetchData = async ()=> {
    try {
        const records = await useRecords;
        allRecords.value = records;
    } catch (error) {
        console.error(error)
    }
}
export async function useBuildDraft() {
        // declare empty box
        // make 24 packs with a shared cardMap
        // append the packs to the box
        // return the box
        await fetchData()
    const cardDataStore = useState('card-data', ()=> allRecords)
    for (let i = 0; i < 24; i++) {
        box.push(useBuildPack());
    }
    /*
    for (let i = 0; i<3; i++) {
        box.push(useBuildRound());
    }
     */
    const draftBox = useState('draft-box', ()=> box)
    console.log(draftBox.value)
}