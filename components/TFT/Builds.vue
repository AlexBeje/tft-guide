<template>
  <TFTDropdown
    v-for="buildsGuide in buildsGuidesDB"
    :description="buildsGuide.team"
    :leftIcons="buildsGuide.icons"
    :key="buildsGuide.id"
    :id="buildsGuide.id"
    :itemLocked="buildsGuide.locked"
    itemCanBeLocked
    @lockItem="lockItem"
  >
    <div class="flex flex-col">
      <VueMagnifier
        :src="`builds/${buildsGuide.image}`"
        class="w-full h-auto border-b border-borderLight"
        :mgTouchOffsetX="0"
        :mgTouchOffsetY="0"
        :mgWidth="300"
        :mgHeight="300"
        mgCornerBgColor="#18181B"
        :zoomFactor="0.7"
        :mgBorderWidth="1"
      />
      <div class="p-2 flex flex-col gap-2 select-none">
        <div
          v-for="carry in buildsGuide.carries"
          :key="carry.id"
          class="flex gap-[4px] mb-[4px] last-of-type:mb-0"
        >
          <img
            :src="`champions/set9/${carry.name}.png`"
            class="w-[62px] h-[62px]"
          />
          <div v-for="item in carry.items" :key="item">
            <div v-for="items in itemsDB">
              <div v-if="items.name === item" class="flex">
                <img
                  :src="`items/${items.name}.png`"
                  class="w-[62px] h-[62px] opacity-25"
                />
                <div class="flex flex-col">
                  <img
                    v-for="component in items.components"
                    :src="`components/${component.name}.png`"
                    class="w-[31px] h-[31px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="text-sm">{{ getDescription(buildsGuide.id) }}</p>
      </div>
    </div>
  </TFTDropdown>
</template>

<script setup lang="ts">
/** Imports **/
import itemsDB from "@/data/items.json";
import VueMagnifier from "@websitebeaver/vue-magnifier";
import "@websitebeaver/vue-magnifier/styles.css";

/** Types **/
interface Carries {
  id: number;
  name: string;
  items: string[];
}

interface BuildsGuide {
  id: number;
  icons: string[];
  team: string;
  image: string;
  locked: boolean;
  carries: Carries[];
  description: string;
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
const getDescription = (id: number) => {
  const description = props.data?.find(
    (buildGuide: BuildsGuide) => buildGuide.id === id
  )?.description;
  switch (description) {
    case "fast-8":
      return "The goal is to reach level 8 early in Stage 4 to find 4 and 5 cost units before your opponents. You generally need long win or losestreaks to have enough gold for it.";
    case "slow-roll-7":
      return "3-star units at level 7 by rolling your excess gold every round.";
    case "hyper-roll":
      return "Save up and then 3-star units at stage 3-1 by rolling all your gold.";
    case "standard":
      return "Flexible strategy focused around a healthy economy while still keeping up in levels. General rules are Level 6 by 3-2, Level 7 by 4-1, and Level 8 by 5-1.";
  }
};
</script>
