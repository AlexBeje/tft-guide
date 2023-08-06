<template>
  <el-card
    class="m-2 large-card"
    :body-style="{
      display: showMore ? 'flex' : 'none',
      padding: '0',
    }"
  >
    <template #header>
      <div
        :class="`flex justify-between items-center cursor-pointer p-3 
        ${showMore && 'border-b dark:border-borderLight'}
        `"
        @click="toggleShowMore()"
      >
        <strong class="flex gap-2 items-center w-full">
          <div class="flex gap-1 w-full">
            <div v-for="leftIcon in leftIcons">
              <div class="w-[24px] h-[24px]" v-if="!leftIcon" />
              <img
                :src="`classes/${leftIcon}.png`"
                class="invert dark:invert-0 w-[24px] h-[24px] bg-blend-multiply"
                v-else
              />
            </div>
            <span
              :class="`${
                leftIcons?.length ? 'm-auto' : 'm-0'
              } flex items-center gap-2`"
            >
              <span
                v-if="tier"
                :class="`text-sm rounded-full w-[28px] h-[28px] flex items-center justify-center border-[2px] border-[#414243]
                ${tier === 'S' && 'bg-[#6FF2B2] text-[#6FF2B2]'}
                ${tier === 'A' && 'bg-[#EF99FA] text-[#EF99FA]'}
                ${tier === 'B' && 'bg-[#9D82F9] text-[#9D82F9]'}
                `"
              >
                <div
                  class="bg-[#1D1E1F] m-auto w-[20px] h-[20px] flex items-center justify-center rounded-full"
                >
                  {{ tier }}
                </div>
              </span>
              <span class="text-[12px]">{{ title }}</span>
            </span>
          </div>
        </strong>
        <div class="flex gap-1 items-center">
          <Icon
            v-if="itemCanBeLocked"
            size="2rem"
            :name="`uil:${itemLocked ? 'lock' : 'unlock'}`"
            class="dark:bg-zinc-900 bg-zinc-200 rounded-full p-2"
            @click.stop="onLockItem(itemLocked)"
          />
          <Icon
            size="1.5rem"
            :name="`uil:angle-${showMore ? 'down' : 'right'}`"
          />
        </div>
      </div>
    </template>
    <template #default>
      <div v-if="showMore" class="w-full">
        <slot />
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
/** Props **/
const props = defineProps({
  title: {
    type: String,
  },
  showMore: {
    type: Boolean,
    default: false,
  },
  itemCanBeLocked: {
    type: Boolean,
    default: false,
  },
  itemLocked: {
    type: Boolean,
    default: false,
  },
  leftIcons: {
    type: Array,
  },
  tier: {
    type: String,
  },
});

/** Emits **/
const emits = defineEmits(["lockItem"]);

/** Methods **/
const showMore = ref(props.showMore);
const toggleShowMore = () => {
  showMore.value = !showMore.value;
};
const onLockItem = (itemLocked: boolean) => {
  emits("lockItem", props.title, itemLocked);
};
</script>

<style scoped lang="scss">
.large-card {
  :deep(.el-card__header) {
    @apply p-0 border-none;
    border-color: var(--el-border-color-light);
  }
}
</style>
