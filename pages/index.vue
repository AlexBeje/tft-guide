<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Builds" name="builds">
      <TFTBuilds :data="buildsGuidesDB" />
    </el-tab-pane>
    <el-tab-pane label="Leveling" name="leveling">
      <TFTLeveling :data="levelingGuidesDB" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
/** Imports **/
import levelingGuidesDB from "@/data/levelingGuides.json";
import buildsGuidesDB from "@/data/buildsGuides.json";

/** Vatriables **/
const activeName = ref("leveling");
</script>

<style lang="scss" scoped>
:deep(.el-tabs__item):nth-child(2) {
  @apply ml-4;
  &:after {
    @apply ml-4;
  }
}
</style>
