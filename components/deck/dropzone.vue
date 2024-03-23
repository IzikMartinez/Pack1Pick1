<template>
    <div 
    :class="bladeClass" 
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
    >
        <DeckCollapsebtn/>
        <div v-if="deck.length === 0" :class="placeholderClass"> Drag cards here... </div>
        <div v-else :class="['flex', 'flex-col', dynamicStartCenter, 'w-full', 'h-screen', dynamicPadding]">
            <DeckSize :decksize="decksize"/>
            <div class="flex w-full items-start justify-center " v-for="card in deck">
                  <DeckCard :card-props="card" @emitted-card-name="handleEmit"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';


// Nuxt went crazy and wouldn't let me use an imported card type, so I had to recreate it in-component 
type deck_card = {
    card: Record
    card_number: number
}

const deck = ref<Array<deck_card>>([])
const cardName = ref("")

const decksize = computed(()=> {
    let sum = 0; 
    deck.value.forEach(deckcard =>  {
        if(!deckcard.card.card_type.includes("Equipment")) sum += deckcard.card_number
    }
    )
    return sum
})
const bladeSwitch = useBladeSwitch()
const bladeClass = computed(()=> bladeSwitch.value ? 'blade' : 'blade-clps')
const dynamicStartCenter = computed(()=> bladeSwitch.value ? "items-center" : "items-start")
const dynamicPadding = computed(()=> bladeSwitch.value ? "pt-2" : "pl-4")
const placeholderClass = computed(()=> bladeSwitch.value ? "placeholder" : "placeholder-clps")


function onDrop(event: DragEvent) {
    if(event.dataTransfer) {
        cardName.value = event.dataTransfer.getData('cardData')
        const card = usePickStore().picks.find(x=> x.card_id.toString() === cardName.value) as Record
        if(card) {
            addCardToDeck(card)
        }
    }
}

function handleEmit(cardID: string) {
    const index = deck.value.findIndex(x => x.card.id === cardID)
    if (index > -1)  {
        deck.value.splice(index, 1)
    }
}

function buildDeckCard(card: Record): deck_card {
    const new_card: deck_card = {
        card,
        card_number: 1
    }
    return new_card
}



/////////////////   INCREMENT CARD COUNTER ///////////////////////////////////////////
function existsFlag(card: Record) {
    if(deck.value.find(x => x.card.card_id === card.card_id)) return true
    else return false
}

function findIndex(card: Record) {
    if( deck.value.findIndex(x => x.card.card_id === card.card_id) > -1) 
        return deck.value.findIndex(x => x.card.card_id === card.card_id) 
    else
        return -1
}

function incrementCount(index: number) {
    deck.value.at(index)!.card_number += 1
}

function addCardToDeck(card: Record) {
    // check if the card is already in the deck
    if(existsFlag(card)) {
        // then find index of existing card
        const index = findIndex(card)
        // increment card_num
        incrementCount(index)
    } else {
        const deckcard = buildDeckCard(card)
        deck.value.push(deckcard)
        deck.value.sort((x, y) => x.card.pitch - y.card.pitch)
    }
    usePickStore().removePick(card)
}

</script>

<style scoped>
.blade {
 @apply flex flex-col
 w-1/4 xl:w-2/12 md:w-50
 h-screen mr-16
 xl:top-14 md:top-10 top-28 
 bg-blue-gray-600 hover:bg-blue-gray-700 
 text-center items-center justify-start
 font-display text-xl text-white
 overflow-auto scrollbar scrollbar-w-0
 transition-all duration-150 
 transform z-0
}

.blade-clps {
 @apply
 flex flex-col
 w-10 h-screen right-0
 xl:(top-14 hover:bg-blue-gray-700 w-1/12)
 top-28 bg-blue-gray-600  hover:bg-teal-600
 text-center justify-start items-start font-display text-xl text-white
 transition-all duration-250
}


.placeholder {
  @apply
}

.placeholder-clps {
  @apply invisible
}


.blade-btn {
    @apply bg-teal-700 hover:bg-teal-500 active:bg-teal-300 h-10 w-12 top-28 right-66 flex fixed rounded-l-lg cursor-pointer
 transition-all duration-150
}

.blade-btn-col {
    @apply bg-teal-700 hover:bg-teal-500 active:bg-teal-300 h-10 w-12 top-28 right-17 flex fixed rounded-l-lg cursor-pointer
 transition-all duration-150
}

</style>