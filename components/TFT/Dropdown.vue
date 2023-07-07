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
        <strong>{{ title }}</strong>
        <Icon
          size="1.5rem"
          :name="`uil:angle-${showMore ? 'down' : 'right'}`"
        />
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
    required: true,
  },
  showMore: {
    type: Boolean,
    default: false,
  },
});

/** SMethods **/
const showMore = ref(props.showMore);
const toggleShowMore = () => {
  showMore.value = !showMore.value;
};
</script>
