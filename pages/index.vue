<template>
  <div class="mb-24">
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
          :class="`flex justify-between items-center cursor-pointer p-3 ${
            levelingGuide.showMore && 'border-b border-borderLight'
          }`"
          @click="toggleShowMore(levelingGuide.id)"
        >
          <strong>{{ levelingGuide.title }}</strong>
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
              :color="level.checked ? '#909399' : '#414243'"
              placement="top"
            >
              <div class="flex flex-col">
                <el-card class="small-card">
                  <p
                    :class="`p-4 border-[1px] rounded-sm border-borderLight cursor-pointer justify-between flex min-h-[64px] items-center
                    ${
                      level.checked &&
                      'bg-zinc-600 border-zinc-400 text-zinc-400'
                    }`"
                    @click="checkToggle(level.id)"
                  >
                    <span class="flex gap-2">
                      Stage
                      <el-tag
                        :type="level.checked ? 'info' : 'danger'"
                        effect="dark"
                      >
                        <strong :class="`${level.checked && 'text-zinc-300'}`">
                          {{ level.stage }}
                        </strong>
                      </el-tag>
                    </span>
                    <el-popover
                      v-if="level.extraInfo"
                      :visible="level.extraInfoVisible"
                      placement="left"
                      :width="300"
                    >
                      <template #reference>
                        <Icon
                          size="1.5rem"
                          name="lucide:info"
                          class="text-zinc-500 my-auto"
                          ref="popoverButtonRef"
                          @click.stop="toggleExtraInfo(level.id)"
                        />
                      </template>
                      <p
                        class="break-normal text-left cursor-pointer"
                        @click.stop="toggleExtraInfo(level.id)"
                      >
                        {{ level.extraInfo }}
                      </p>
                    </el-popover>
                  </p>
                </el-card>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </template>
    </el-card>
  </div>
  <el-backtop
    :right="16"
    :bottom="16"
    :visibility-height="0"
    @click="resetChecks"
    class="backtop"
  >
    <Icon size="2rem" name="system-uicons:reset" />
  </el-backtop>
</template>

<script setup lang="ts">
/** Imports **/
import levelingGuidesDB from "@/data/levelingGuides.json";

/** Variables **/
const levelingGuides = ref(levelingGuidesDB);

/** Refs **/
const popoverButtonRef = ref();

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

const toggleExtraInfo = (id: number) => {
  levelingGuides.value = levelingGuides.value.map((levelingGuide) => {
    levelingGuide.levels = levelingGuide.levels.map((level) => {
      if (level.id !== id && level.extraInfoVisible) {
        level.extraInfoVisible = false;
      }
      return level;
    });
    return levelingGuide;
  });
  levelingGuides.value = levelingGuides.value.map((levelingGuide) => {
    levelingGuide.levels = levelingGuide.levels.map((level) => {
      if (level.id === id) {
        level.extraInfoVisible = !level.extraInfoVisible;
      }
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
    @apply pb-4 last:pb-0;
  }
  :deep(.el-timeline-item__wrapper) {
    @apply pl-6;
  }
}

.backtop {
  &.el-backtop {
    @apply text-white w-16 h-16;
  }
}
</style>
