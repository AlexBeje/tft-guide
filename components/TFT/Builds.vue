<template>
  <div v-for="buildsGuide in buildsGuidesDB">
    <div class="flex items-center" v-if="buildsGuide.tier">
      <p
        :class="`ml-2 font-bold
          ${buildsGuide.tier === 'S' && 'text-[#FF00FF]'}
          ${buildsGuide.tier === 'A' && 'text-[#E69138]'}
          ${buildsGuide.tier === 'B' && 'text-[#FFE599]'}
          ${buildsGuide.tier === 'C' && 'text-[#6D9EEB]'}`"
      >
        {{ buildsGuide.tier }}
      </p>
      <div
        :class="`w-full h-[2px] ml-2 mr-2
          ${buildsGuide.tier === 'S' && 'bg-[#FF00FF]'}
          ${buildsGuide.tier === 'A' && 'bg-[#E69138]'}
          ${buildsGuide.tier === 'B' && 'bg-[#FFE599]'}
          ${buildsGuide.tier === 'C' && 'bg-[#6D9EEB]'}`"
      />
    </div>
    <TFTDropdown
      :title="buildsGuide.team"
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
          :zoomFactor="0.6"
          :mgBorderWidth="1"
        />
        <div class="p-2 flex flex-col gap-2 select-none">
          <div
            v-for="carry in buildsGuide.carries"
            :key="carry.id"
            class="flex gap-[4px] mb-[4px] last-of-type:mb-0"
          >
            <img
              :src="`champions/${carry.name}.png`"
              class="w-[60px] h-[60px]"
            />
            <div v-for="item in carry.items" :key="item">
              <div v-for="items in itemsDB">
                <div v-if="items.name === item" class="flex">
                  <img
                    :src="`items/${items.name}.png`"
                    class="w-[60px] h-[60px] opacity-25"
                  />
                  <div class="flex flex-col">
                    <img
                      v-for="component in items.components"
                      :src="`components/${component.name}.png`"
                      class="w-[30px] h-[30px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t-[1px] border-t-[#414243] p-2 flex flex-col gap-2">
          <p class="text-xl font-black">
            {{ getTitle(buildsGuide.id) }}
          </p>
          <p class="text-sm">{{ getDescription(buildsGuide.id) }}</p>
        </div>
      </div>
    </TFTDropdown>
  </div>
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
  tier: string;
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
const getTitle = (id: number) => {
  const title = props.data?.find(
    (buildGuide: BuildsGuide) => buildGuide.id === id
  )?.description;
  switch (title) {
    case "standard":
      return "Standard";
    case "hyper-roll":
      return "Hyper Roll";
    case "slow-roll-6":
      return "Slow Roll (6)";
    case "slow-roll-7":
      return "Slow Roll (7)";
    case "fast-8":
      return "Fast 8";
  }
};
const getDescription = (id: number) => {
  const description = props.data?.find(
    (buildGuide: BuildsGuide) => buildGuide.id === id
  )?.description;
  switch (description) {
    case "fast-8":
      return "The goal is to reach level 8 early in Stage 4 to find 4 and 5 cost units before your opponents. You generally need long win or losestreaks to have enough gold for it.";
    case "slow-roll-6":
      return "3-star units at level 6 by rolling your excess gold every round.";
    case "slow-roll-7":
      return "3-star units at level 7 by rolling your excess gold every round.";
    case "hyper-roll":
      return "Save up and then 3-star units at stage 3-1 by rolling all your gold.";
    case "standard":
      return "Flexible strategy focused around a healthy economy while still keeping up in levels. General rules are Level 6 by 3-2, Level 7 by 4-1, and Level 8 by 5-1.";
  }
};
</script>
