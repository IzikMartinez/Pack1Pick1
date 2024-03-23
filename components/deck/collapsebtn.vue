<script setup lang="ts">
  const bladeSwitch = useBladeSwitch()
  const dynamicMargin = computed(()=> bladeSwitch.value ? "ml-0" : "ml-4")
  const btnClass = computed(()=> bladeSwitch.value ? ">>" : "<<")
</script>

<template>
  <button :class="['text-3xl', 'flex', 'items-center', 'justify-center', 'bg-orange-600', 'hover:bg-orange-700', 'h-8', 'w-1/4', 'rounded', 'my-4', dynamicMargin]"
          @click="bladeSwitch = !bladeSwitch"
          >
    {{btnClass}}
  </button>
</template>

<style>
 .collapse-btn {
  @apply
}
</style>