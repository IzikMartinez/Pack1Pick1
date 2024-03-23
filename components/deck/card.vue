<template>
    <div :class="cardClass">
        <DeckNum :count="cardProps.card_number"/>
        <DeckSvc :name="cardProps.card.card_name" :pitch="cardProps.card.pitch" :cost="cardProps.card.cost"/>
        <DeckRemovebtn @click="removeClick"/>
    </div>
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';

type deck_card = {
    card: Record
    card_number: number
}

const props = defineProps<{
    cardProps: deck_card,
    cardNumber: number
}>()
const emits = defineEmits<{
    (e: 'emittedCardName', type: string): void
}>()

const bladeSwitch = useBladeSwitch()
const cardClass = computed(()=> bladeSwitch.value ? 'card' : 'card-clps')


function removeClick() {
    usePickStore().addPick(props.cardProps.card)
    if(props.cardProps.card_number > 1)
        props.cardProps.card_number--
    else
        emits('emittedCardName', props.cardProps.card.id)
}
</script>

<style scoped>
.card-clps {
    @apply invisible
}
.card {
    @apply flex flex-row justify-center items-center mt-2 w-58 xl:w-10/12 selection-none
}
</style>