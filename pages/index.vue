<template>
  <el-card
    class="m-2 large-card"
    v-for="levelingGuide in levelingGuides"
    :key="levelingGuide.id"
    :body-style="{
      display: levelingGuide.showMore ? 'flex' : 'none',
      padding: '0',
    }"
  >
    <template #header>
      <div
        :class="`flex justify-between items-center cursor-pointer px-3 py-1 ${levelingGuide.showMore && 'border-b border-borderLight'}`"
        @click="toggleShowMore(levelingGuide.id)"
      >
        <span>{{ levelingGuide.title }}</span>
        <Icon
          size="2rem"
          :name="`uil:angle-${levelingGuide.showMore ? 'down' : 'right'}`"
        />
      </div>
    </template>
    <template #default>
      <div v-if="levelingGuide.showMore" class="p-2 w-full">
        <el-timeline class="timeline">
          <el-timeline-item
            v-for="level in levelingGuide.levels"
            :key="level.id"
            :timestamp="level.label"
            placement="top"
          >
            <div class="flex flex-col">
              <el-card class="small-card">
                <p>
                  Stage
                  <el-tag class="flex gap-2" type="danger" effect="dark">
                    <strong>{{ level.stage }}</strong>
                  </el-tag>
                  {{ level.extraInfo }}
                </p>
              </el-card>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
/** Imports **/
import levelingGuidesDB from "@/data/levelingGuides.json";

/** Variables **/
const levelingGuides = ref(levelingGuidesDB);

/** Methods **/
const toggleShowMore = (id: number) => {
  levelingGuides.value = levelingGuides.value.map((levelingGuide) => {
    if (levelingGuide.id === id) {
      levelingGuide.showMore = !levelingGuide.showMore;
    }
    return levelingGuide;
  });
};
</script>

<style scoped lang="scss">
.large-card {
  :deep(.el-card__header) {
    @apply p-0 border-none;
    border-color: var(--el-border-color-light);
  }
}
.small-card {
  :deep(.el-card__body) {
    @apply p-2;
  }
}

.timeline {
  .el-timeline-item {
    @apply pb-4;
  }
  :deep(.el-timeline-item__wrapper) {
    @apply pl-6;
  }
}
</style>
