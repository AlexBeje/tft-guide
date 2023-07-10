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
        <strong>
          {{ title }}
          <el-tag effect="dark" v-if="description">
            {{ description }}
          </el-tag>
        </strong>
        <div class="flex gap-1 items-center">
          <Icon
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
      <div v-if="showMore" class="p-2 w-full">
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
  description: {
    type: String,
    default: "",
  },
  id: {
    type: Number,
  },
  itemLocked: {
    type: Boolean,
    default: false,
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
