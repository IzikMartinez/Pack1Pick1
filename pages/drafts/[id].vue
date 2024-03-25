<template>
  <NuxtLayout>
    <div id="card-box" >
      <transition name="cardbody" appear>
        <span v-if="cardData">
        <CardBox @cardbox-clicked="onCardEvent('clicked')" ref="cardboxRef" :set_name="SET_NAME"/>
        </span>
        <span v-else class="text-5xl text-white flex items-center justify-center">LOADING LOADING LOADING</span>
      </transition>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">


import {Record} from "pocketbase";
const allRecords = ref<Record[]>([])

const fetchData = async ()=> {
  try {
    const records = await useRecords;
    allRecords.value = records;
  } catch (error) {
    console.error(error)
  }
}
const cardData = useState('card-data')

await fetchData().then(()=>{
  cardData.value = allRecords
})

const route = useRoute()
const store = usePickStore()
const styles = useStyleStore()
const timerStore = useTimerStore()

const SET_NAME = route.params.id as string

const roundIndex = useRoundIndex()

//console.log(useRoundStore().value);

definePageMeta({ layout: "default"})

store.$subscribe( (mutation, state)=> {
  const router = useRouter()
  if(state.pickIndex / state.packSize === 1 && roundIndex.value <= 2)  {
    router.push({path: "/picks"})
    roundIndex.value++
    state.pickIndex = 0
  }
  else if( roundIndex.value > 2) {
    router.push({path: "/deckbuilder"})
  }
})

timerStore.$subscribe((mutation, state)=> {
    if(state.time <= 0 && roundIndex.value < 4) {
      console.log("timeout")
      timerStore.setTimer(10)
      onCardEvent("timeout")
    }
})

const cardboxRef = ref<null | { timeoutPick: ()=> null }>(null)



async function onCardEvent(eventType: string) {
  if(eventType === "timeout"){
    cardboxRef.value?.timeoutPick()
  } else if (eventType === "clicked") {
    //console.log("caught click")
  }
  await styles.screenWipe(roundIndex.value % 2 === 0 ? true : false)
}


</script>

<style scoped>

</style>