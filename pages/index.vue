<template>
  <div class="flex justify-center w-full bg-zinc-900 min-h-screen">
    <el-tabs v-model="activeName" class="w-full flex flex-col bg-zinc-900">
      <el-tab-pane label="Builds" name="builds" class="max-w-[320px] m-auto">
        <TFTBuilds :data="buildsGuidesDB" />
      </el-tab-pane>
      <el-tab-pane label="Leveling" name="leveling" class="max-w-[320px] m-auto">
        <TFTLeveling :data="levelingGuidesDB" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
/** Imports **/
import levelingGuidesDB from "@/data/levelingGuides.json";
import buildsGuidesDB from "@/data/builds.json";

/** Vatriables **/
const activeName = ref("builds");
</script>

<style lang="scss" scoped>
:deep(.el-tabs__item):nth-child(2) {
  @apply ml-4;
  &:after {
    @apply ml-4;
  }
}
</style>
