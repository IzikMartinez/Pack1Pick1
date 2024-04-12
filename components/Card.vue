<template>
  <!-- store.cardSizeClass.at(0) returns the class, "card", "card-sml", or "card-big".
  It will return "card" by default.  -->
  <div :class="cardClass" @click="addPick">
      <CardTooltip group-hover="xl:scale-100 scale-0 z-0 delay-700" :card-props="cardProps"/>
      <CardImage :record_id="cardProps.record" :card_name="cardProps.record.card_name" :cart_art="cardProps.record.card_art"/>
  </div>

</template>

<script setup lang="ts">
import { Record } from 'pocketbase';
import {watch} from "@vue/runtime-core";
import {Card} from "~/composables/types/draft_types";

const picks = usePickStore()
const props = defineProps<{
  cardProps: Card
  pickedFlag: boolean
}>()

const emit = defineEmits<{
  (e: 'cardClicked', type: Card): void
}>()

const cardClass = computed(()=>'card-' +useCardClass().value )

const artPath = ref("")

function addPick() {
  if (props.pickedFlag === true) {
    console.log("Cannot add ", props.cardProps.record.card_name, " As it has already been picked.")
  }
  else {
    picks.addPick(props.cardProps)
    console.log("Added ", props.cardProps.record.card_name, " (", props.cardProps.record.pitch, ")")
  }
  emit('cardClicked', props.cardProps)
}
</script>

<style scoped>

.card-picked {
  @apply flex-none bottom-0 
  xl:w-[14rem] xl:h-[19rem]
  w-[9rem] h-[12rem]
  hover:bg-gray-100
}

.card-small {
  @apply 
  flex flex-1 relative items-center justify-center text-center
  my-0 p-0.5
  xl:(w-60 h-84)
  w-30 h-42
  bg-black hover:bg-gray-100
}
.card-medium {
  @apply 
  flex flex-1 items-center justify-center text-center
  m-0 p-0.5
  xl:(w-68 h-95)
  w-40 h-54
  bg-black hover:bg-gray-100
}
.card-large {
  @apply 
  flex flex-1 items-center justify-center text-center
  m-0 p-0.5
  xl:(w-88 h-123)
  w-70 h-96
  bg-black hover:bg-gray-100
}


</style>