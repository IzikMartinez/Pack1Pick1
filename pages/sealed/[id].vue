<template>
    <NuxtLayout name="sealed">
        <div v-if="pending">Loading..</div>
        <div v-else class="flex fixed w-screen h-screen top-14 left-16 items-center justify-end">
          <div class="flex flex-wrap flex-1 h-full overflow-y-scroll overflow-x-hidden hide-scrollbar z-0 items-center justify-center">
            <span v-for="card in searchPicks"
                 @dragstart="startDrag($event, card)">
                <Card :card-props="card" :picked-flag="true"/>
            </span>
          </div>
          <DeckDropzone />
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';
import Pack from '~~/composables/pack';

const route = useRoute()
const picks = usePickStore()
useCardClass().value = 'small'
const SET_NAME = route.params.id as string
const {data, pending, error} = await useAsyncData('cards',
  ()=> useRecords
)
const cardDataStore = useState('card-data', ()=> data)
useSetName().value = SET_NAME
const searchPicks = computed(useSearchPicks)

function startDrag(event: DragEvent, pick: Record) {
    if(event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('cardData', pick.card_id.toString())
    }
}

onBeforeMount(()=>{
    const packs = computed(()=>{
        let pack = [[]] as [Record[]]
        for(var i = 0; i<6; i++) {
            pack.push(useBuildPack())
        }
        return pack
    })
    packs.value.forEach(
        pack => pack.forEach(card => picks.addPick(card as Record)))
})
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>