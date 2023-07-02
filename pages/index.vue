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
        :class="`flex justify-between items-center cursor-pointer px-3 py-1 ${
          levelingGuide.showMore && 'border-b border-borderLight'
        }`"
        @click="toggleShowMore(levelingGuide.id)"
      >
        <span>{{ levelingGuide.title }}</span>
        <Icon
          size="1.5rem"
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
            :color="level.checked ? '#67C23A' : '#F56C6C'"
            placement="top"
          >
            <div class="flex flex-col">
              <el-card class="small-card" @click="checkToggle(level.id)">
                <p
                  :class="`p-2 border-[1px] rounded-sm border-borderLight
                    ${level.checked && 'bg-green-900 border-green-700'}`"
                >
                  Stage
                  <el-tag
                    class="flex gap-2"
                    :type="level.checked ? 'success' : 'danger'"
                    effect="dark"
                  >
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
  <el-backtop
    :right="16"
    :bottom="16"
    :visibility-height="0"
    @click="resetChecks"
    class="backtop"
  >
    <Icon size="1.5rem" name="system-uicons:reset" />
  </el-backtop>
</template>

<script setup lang="ts">
/** Imports **/
import levelingGuidesDB from "@/data/levelingGuides.json";
import { Check } from '@element-plus/icons-vue'

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

const checkToggle = (id: number) => {
  levelingGuides.value = levelingGuides.value.map((levelingGuide) => {
    levelingGuide.levels = levelingGuide.levels.map((level) => {
      if (level.id === id) {
        level.checked = !level.checked;
      }
      return level;
    });
    return levelingGuide;
  });
};

const resetChecks = () => {
  levelingGuides.value = levelingGuides.value.map((levelingGuide) => {
    levelingGuide.levels = levelingGuide.levels.map((level) => {
      level.checked = false;
      return level;
    });
    return levelingGuide;
  });
};

/** Exposed Methods **/
defineExpose({
  resetChecks,
});
</script>

<style scoped lang="scss">
.large-card {
  :deep(.el-card__header) {
    @apply p-0 border-none;
    border-color: var(--el-border-color-light);
  }
}
.small-card {
  &.el-card {
    @apply rounded-sm;
    border: none;
  }
  :deep(.el-card__body) {
    @apply p-0;
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

.backtop {
  &.el-backtop {
    @apply text-white;
  }
}
</style>
