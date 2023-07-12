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
        :class="`flex justify-between items-center cursor-pointer p-3 ${
          showMore && 'border-b border-borderLight'
        }`"
        @click="toggleShowMore()"
      >
        <strong class="flex gap-2 items-center w-full">
          <div class="flex gap-1 w-full">
            <div v-for="leftIcon in leftIcons">
              <div class="w-[24px] h-[24px]" v-if="!leftIcon" />
              <img
                :src="`classes/${leftIcon}.png`"
                class="w-[24px] h-[24px]"
                v-else
              />
            </div>
            <span :class="`text-sm ${leftIcons?.length ? 'm-auto' : 'm-0'}`">
              {{ title }}
            </span>
          </div>
        </strong>
        <div class="flex gap-1 items-center">
          <Icon
            v-if="itemCanBeLocked"
            size="2rem"
            :name="`uil:${itemLocked ? 'unlock' : 'lock'}`"
            class="bg-zinc-900 rounded-full p-2"
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
  id: {
    type: Number,
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
});

/** Emits **/
const emits = defineEmits(["lockItem"]);

/** Methods **/
const showMore = ref(props.showMore);
const toggleShowMore = () => {
  showMore.value = !showMore.value;
};
const onLockItem = (itemLocked: boolean) => {
  emits("lockItem", props.id, itemLocked);
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
