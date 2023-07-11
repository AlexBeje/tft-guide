<template>
  <div class="flex justify-center w-full bg-zinc-900">
    <el-tabs v-model="activeName" class="w-full flex flex-col bg-zinc-900">
      <el-tab-pane
        label="Builds"
        name="builds"
        class="max-w-[380px] m-auto mt-12"
      >
        <TFTBuilds :data="buildsGuidesDB" />
      </el-tab-pane>
      <el-tab-pane
        label="Champions"
        name="champions"
        class="max-w-[380px] m-auto mt-12"
      >
        <TFTChampions :data="championsCategoriesDB" />
      </el-tab-pane>
      <el-tab-pane
        label="Leveling"
        name="leveling"
        class="max-w-[380px] m-auto mt-12"
      >
        <TFTLeveling :data="levelingGuidesDB" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
/** Imports **/
import levelingGuidesDB from "@/data/levelingGuides.json";
import championsCategoriesDB from "@/data/champions.json";
import buildsGuidesDB from "@/data/builds.json";

/** Vatriables **/
const activeName = ref("builds");
</script>

<style lang="scss" scoped>
:deep(.el-tabs__item):nth-child(2) {
  @apply ml-2;
  &:after {
    @apply ml-2;
  }
}
:deep(.el-tabs__header) {
  @apply mb-0 fixed w-full z-10 bg-zinc-900;
}
</style>
