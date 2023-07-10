<template>
  <TFTDropdown
    v-for="buildsGuide in buildsGuidesDB"
    :description="buildsGuide.team"
    :key="buildsGuide.id"
    :id="buildsGuide.id"
    :itemLocked="buildsGuide.locked"
    @lockItem="lockItem"
  >
    <div class="flex flex-col gap-2">
      <img :src="`builds/${buildsGuide.image}`" class="w-full h-auto" />
      <h1 class="text-xl">Carries</h1>
      <div
        v-for="carry in buildsGuide.carries"
        :key="carry.id"
        class="flex gap-[4px] mb-[4px] last-of-type:mb-0"
      >
        <img
          :src="`champions/set9/${carry.name}.png`"
          class="w-[50px] h-[50px]"
        />
        <div v-for="item in carry.items" :key="item">
          <div v-for="items in itemsDB">
            <div v-if="items.name === item" class="flex">
              <img
                :src="`items/${items.name}.png`"
                class="w-[50px] h-[50px] opacity-25"
              />
              <div class="flex flex-col">
                <img
                  v-for="component in items.components"
                  :src="`components/${component.name}.png`"
                  class="w-[25px] h-[25px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 class="text-xl">Fast 8</h1>
      <p>
        The goal is to reach level 8 early in Stage 4 to find 4 and 5 cost units
        before your opponents. You generally need long win or losestreaks to
        have enough gold for it.
      </p>
    </div>
  </TFTDropdown>
</template>

<script setup lang="ts">
/** Imports **/
import itemsDB from "@/data/items.json";
import componentsDB from "@/data/components.json";

/** Types **/
interface Carries {
  id: number;
  name: string;
  items: string[];
}

interface BuildsGuide {
  id: number;
  team: string;
  image: string;
  locked: boolean;
  carries: Carries[];
}

/** Props **/
const props = defineProps<{
  data: BuildsGuide[];
}>();

/** Variables **/
const lockedBuildGuide = ref<BuildsGuide[]>();

/** Computed **/
const buildsGuidesDB = computed(() => {
  if (lockedBuildGuide.value) {
    return lockedBuildGuide.value;
  }
  return props.data;
});

/** Methods **/
const lockItem = (item: number, itemLocked: boolean) => {
  if (itemLocked) {
    lockedBuildGuide.value = props.data;
  } else {
    lockedBuildGuide.value = props.data
      .filter((buildGuide: BuildsGuide) => buildGuide.id === item)
      .map((buildGuide: BuildsGuide) => {
        return {
          ...buildGuide,
          locked: true,
        };
      });
  }
};
</script>
