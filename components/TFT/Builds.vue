<template>
  <TFTDropdown
    v-for="buildsGuide in buildsGuidesDB"
    :title="buildsGuide.title"
    :key="buildsGuide.id"
  >
    <div>
      <p>{{ `@/public/builds/${buildsGuide.image}` }}</p>
      <img
        :src="`require('@/public/builds/${buildsGuide.image}')`"
        :alt="buildsGuide.title"
        class="w-full h-auto"
      />
    </div>
  </TFTDropdown>
</template>

<script setup lang="ts">
/** Types **/
interface BuildsGuide {
  id: number;
  title: string;
  image: string;
}

/** Props **/
const props = defineProps<{
  data: BuildsGuide[];
}>();

/** Computed **/
const buildsGuidesDB = computed(() => props.data);
</script>
