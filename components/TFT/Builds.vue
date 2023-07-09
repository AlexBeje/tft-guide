<template>
  <TFTDropdown
    v-for="buildsGuide in buildsGuidesDB"
    :title="buildsGuide.title"
    :description="buildsGuide.team"
    :key="buildsGuide.id"
  >
    <div>
      <img
        :src="`builds/${buildsGuide.image}`"
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
