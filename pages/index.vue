<template>
  <el-card
    class="m-4"
    v-for="levelingGuide in levelingGuides"
    :key="levelingGuide.id"
    :body-style="{
      display: levelingGuide.showMore ? 'flex' : 'none',
      padding: '0',
    }"
  >
    <template #header>
      <div
        :class="`flex justify-between items-center cursor-pointer p-4
        ${!levelingGuide.showMore && 'rounded-b-sm'}
        `"
        @click="toggleShowMore"
      >
        <span>{{ levelingGuide.title }}</span>
        <Icon
          size="2rem"
          :name="`uil:angle-${levelingGuide.showMore ? 'down' : 'right'}`"
        />
      </div>
    </template>
    <template #default>
      <div v-if="levelingGuide.showMore"></div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
/** Imports **/
import levelingGuidesDB from "@/data/levelingGuides.json";

/** Variables **/
const levelingGuides = ref(levelingGuidesDB);

/** Methods **/
const toggleShowMore = () => {
  levelingGuides.value = levelingGuides.value.map((levelingGuide) => {
    if (levelingGuide.id === levelingGuide.id) {
      levelingGuide.showMore = !levelingGuide.showMore;
    }
    return levelingGuide;
  });
};
</script>

<style scoped lang="scss">
:deep(.el-card__header) {
  @apply p-0;
}
</style>
