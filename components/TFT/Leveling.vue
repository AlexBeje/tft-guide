<template>
  <div class="mb-24">
    <TFTDropdown
      v-for="levelingGuide in levelingGuides"
      :title="levelingGuide.title"
      :show-more="levelingGuide.showMore"
    >
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
                  :width="250"
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
    </TFTDropdown>
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
/** Types **/
interface LevelingGuide {
  title: string;
  showMore: boolean;
  levels: Level[];
}

interface Level {
  id: number;
  stage: string;
  label: string;
  checked: boolean;
  extraInfo?: string;
  extraInfoVisible?: boolean;
}

/** Props **/
const props = defineProps<{
  data: LevelingGuide[];
}>();

/** Computed **/
const levelingGuidesDB = computed(() => props.data);

/** Variables **/
const levelingGuides = ref(levelingGuidesDB.value);

/** Refs **/
const popoverButtonRef = ref();

/** Methods **/

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
</script>

<style scoped lang="scss">
.backtop {
  &.el-backtop {
    @apply text-white w-16 h-16;
  }
}
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
</style>
