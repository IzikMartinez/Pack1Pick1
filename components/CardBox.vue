<template>
    <div class="fixed flex flex-col xl:(top-0 left-16 w-10/12 ) top-16 left-0 w-screen h-screen justify-center items-center">
      <div>
        <DraftInfo class="fixed xl:(top-0 left-auto) top-18 left-24 justify-center" ref="infoRef"/>
        <span :class="cardBoxClass" >
          <div v-for="card in currentPack.pack.cards" :key="card.card_in_pack">
              <Card 
                :card-props="card" 
                :picked-flag="false"
                @card-clicked="clickPick">
                :key="card.card_id"
              </Card>
          </div>
        </span>
      -->
      </div>
    </div>
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';
import Picker from '~~/composables/picker';
import {Draft} from "~/composables/useBuildDraft";

const PACK_SIZE=14
const PLAYER_NUM=7

const props = defineProps<{
  set_name: string
}>()

const store = usePickStore()
const timerStore = useTimerStore()
//const cardDataStore = useState('card-data', () => data)
const draft = new Draft()
const roundIndex = useRoundIndex().value
const currentRound =  computed(()=> draft.box.roundBuilders[roundIndex]).value
const current_pack_index = computed(()=>store.getPickIndex % PLAYER_NUM)
const currentPack = computed(()=> currentRound.packs.packBuilders[current_pack_index.value])

const cardBoxClass = computed(()=> 'cardbox-' + useCardBoxClass().value)


const picker: Picker = new Picker(draft, roundIndex, current_pack_index.value)
const emit = defineEmits(['cardboxClicked'])
defineExpose({ timeoutPick })
function clickPick(card_in_pack: Record ) {
  if(card_in_pack != null) {
    emit('cardboxClicked')
    timerStore.setTimer(store.getInversePickIndex)
    pick(card_in_pack)
  }
}
function pick(card_in_pack_id: Record) {
  currentPack.value.removePick(card_in_pack_id.id)
  usePickCards(currentRound.packs.packBuilders, currentPack.value.index)
  store.incrementIndex()
}
function timeoutPick() {
  timerStore.setTimer(store.getInversePickIndex)
  const idx = getRandomInt(currentPack.value.pack.cards.length, 0)
  pick(currentPack.value.pack.cards.at(idx)!)
}

function getRandomInt(max: number, min: number): number {
  let num = Math.floor(Math.random() * max)// start at 1
  return num
  //return this.lcg(21, 3, 7, seed, 3)[1] % max
}
/*
const thisDraft = useState('draft-box').value

const current_pack = computed(()=> { return currentRound[current_pack_index.value]})
console.log(current_pack.value)
//const current_pack = computed(()=> { return thisdraft.getRound(roundIndex)?.getPack(current_pack_index.value)})
//const pick_number = computed(()=> (store.getPickIndex % PACK_SIZE))








 */


</script>

<style scoped>

.cardbox-small {
  @apply
  fixed flex flex-row flex-wrap
  xl:(w-screen top-30 left-8 pb-0 gap-0) w-screen h-screen
  top-40 left-0 pb-60
  scrollbar scrollbar-w-0
  gap-2 justify-center overflow-auto 
  transition-all duration-150 ease-linear
}
.cardbox-medium {
  @apply
  fixed flex flex-row flex-wrap 
  xl:(top-20 left-20 pb-20 w-11/12)
  top-40 left-0
  pb-60
  w-screen h-screen
  scrollbar scrollbar-w-0
  gap-1 justify-center overflow-auto 
  transition-all duration-150 ease-linear
}
.cardbox-large {
  @apply
  fixed flex flex-wrap 
  xl:(w-screen left-10 right-8 top-20 pb-20) 
  w-screen h-screen
  top-40 left-0 pb-60
  scrollbar scrollbar-w-0
  gap-1 justify-center overflow-auto 
  transition-all duration-150 ease-linear
}


.cardbox-medium-left {
  @apply
  fixed flex flex-row flex-wrap top-20 left-16 
  lg:w-11/12 w-30rem 
  gap-0 items-center justify-center overflow-auto 
  transform
  translate-x-full opacity-0
  transition-all duration-150 ease-linear
}
.cardbox-large-left {
  @apply
  fixed flex flex-row flex-wrap top-20 left-16 
  lg:w-11/12 w-30rem 
  gap-0 items-center justify-center overflow-auto 
  transform
  translate-x-full opacity-0
  transition-all duration-150 ease-linear
}
.cardbox-small-left {
  @apply  
  fixed flex flex-row flex-wrap
  xl:(w-screen top-30 left-8 pb-0 gap-0) w-screen h-screen
  top-40 left-0 pb-60
  scrollbar scrollbar-w-0
  gap-2 justify-center overflow-auto 
  transform
  translate-x-full opacity-0
  transition-all duration-150 ease-linear
}

.cardbox-medium-right {
  @apply  
  fixed flex flex-row flex-wrap top-20 left-16 
  lg:w-11/12 w-30rem 
  gap-0 items-center justify-center overflow-auto 
  transform
  -translate-x-full opacity-0
  transition-all duration-150 ease-linear
}
.cardbox-large-right {
  @apply  
  fixed flex flex-row flex-wrap top-20 left-16 
  lg:w-11/12 w-30rem 
  gap-0 items-center justify-center overflow-auto 
  transform
  -translate-x-full opacity-0
  transition-all duration-150 ease-linear
}
.cardbox-small-right {
  @apply  
  fixed flex flex-row flex-wrap
  xl:(w-screen top-30 left-8 pb-0 gap-0) w-screen h-screen
  top-40 left-0 pb-60
  scrollbar scrollbar-w-0
  gap-2 justify-center overflow-auto 
  transform
  -translate-x-full opacity-0
  transition-all duration-150 ease-linear
}

.cardbody-enter-from { @apply opacity-0 }
.cardbody-enter-active {@apply transition-all duration-200 ease-linear}
.cardbody-enter-to {@apply opacity-100}



</style>