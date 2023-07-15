<template>
  <div class="flex gap-4 px-2">
    <el-select
      v-model="leveling"
      class="py-2"
      placeholder="Leveling"
      size="large"
      clearable
      @clear="levelingClear"
      @change="onLevelingChange"
    >
      <el-option
        v-for="levelingListItem in levelingList"
        :key="levelingListItem.value"
        :label="levelingListItem.label"
        :value="levelingListItem.value"
      />
    </el-select>
    <el-select
      v-model="team"
      class="py-2"
      placeholder="Team"
      size="large"
      clearable
      @clear="teamClear"
      @change="onTeamChange"
    >
      <el-option
        v-for="teamListItem in teamList"
        :key="teamListItem.value"
        :label="teamListItem.label"
        :value="teamListItem.value"
      >
        <div class="flex items-center gap-2">
          <img
            :src="`classes/${teamListItem.value}.png`"
            class="w-[16px] h-[16px]"
          /><span>{{ teamListItem.label }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
  <div v-for="buildsGuide in buildsGuidesDB">
    <TFTDropdown
      :title="buildsGuide.team"
      :leftIcons="buildsGuide.icons"
      :key="buildsGuide.id"
      :id="buildsGuide.id"
      :itemLocked="buildsGuide.locked"
      itemCanBeLocked
      :tier="buildsGuide.tier"
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
  leveling: string;
}

/** Props **/
const props = defineProps<{
  data: BuildsGuide[];
}>();

/** Variables **/
const lockedBuildGuide = ref<BuildsGuide[]>();
const leveling = ref();
const team = ref();
const levelingList = ref([
  {
    label: "Standard",
    value: "standard",
  },
  {
    label: "Hyper Roll",
    value: "hyper-roll",
  },
  {
    label: "Slow Roll (6)",
    value: "slow-roll-6",
  },
  {
    label: "Slow Roll (7)",
    value: "slow-roll-7",
  },
  {
    label: "Fast 8",
    value: "fast-8",
  },
]);
const teamList = ref([
  {
    label: "Bastion",
    value: "bastion",
  },
  {
    label: "Bruiser",
    value: "bruiser",
  },
  {
    label: "Challenger",
    value: "challenger",
  },
  {
    label: "Deadeye",
    value: "deadeye",
  },
  {
    label: "Demacia",
    value: "demacia",
  },
  {
    label: "Freljord",
    value: "freljord",
  },
  {
    label: "Gunner",
    value: "gunner",
  },
  {
    label: "Invoker",
    value: "invoker",
  },
  {
    label: "Ionia",
    value: "ionia",
  },
  {
    label: "Juggernaut",
    value: "juggernaut",
  },
  {
    label: "Multicaster",
    value: "multicaster",
  },
  {
    label: "Noxus",
    value: "noxus",
  },
  {
    label: "Piltover",
    value: "piltover",
  },
  {
    label: "Rogue",
    value: "rogue",
  },
  {
    label: "Shadowisle",
    value: "shadowisle",
  },
  {
    label: "Shuriman",
    value: "shuriman",
  },
  {
    label: "Slayer",
    value: "slayer",
  },
  {
    label: "Sorcerer",
    value: "sorcerer",
  },
  {
    label: "Strategist",
    value: "strategist",
  },
  {
    label: "Targon",
    value: "targon",
  },
  {
    label: "Void",
    value: "void",
  },
  {
    label: "Yordle",
    value: "yordle",
  },
  {
    label: "Zaun",
    value: "zaun",
  },
]);

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
    if (leveling.value) {
      lockedBuildGuide.value = lockedBuildGuide.value.filter(
        (buildGuide: BuildsGuide) => buildGuide.leveling === leveling.value
      );
    }
    if (team.value) {
      lockedBuildGuide.value = lockedBuildGuide.value.filter(
        (buildGuide: BuildsGuide) =>
          buildGuide.icons.find((icon) => icon === team.value)
      );
    }
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
  )?.leveling;
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
  const leveling = props.data?.find(
    (buildGuide: BuildsGuide) => buildGuide.id === id
  )?.leveling;
  switch (leveling) {
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
const levelingClear = () => {
  leveling.value = undefined;
  lockedBuildGuide.value = undefined;
};
const onLevelingChange = (value: string) => {
  teamClear();
  leveling.value = value;
  if (lockedBuildGuide.value?.length) {
    lockedBuildGuide.value = props.data.filter(
      (buildGuide: BuildsGuide) => buildGuide.leveling === leveling.value
    );
  } else {
    lockedBuildGuide.value = props.data.filter(
      (buildGuide: BuildsGuide) => buildGuide.leveling === leveling.value
    );
  }
};
const teamClear = () => {
  team.value = undefined;
  lockedBuildGuide.value = undefined;
};
const onTeamChange = (value: string) => {
  levelingClear();
  team.value = value;
  if (lockedBuildGuide.value?.length) {
    lockedBuildGuide.value = props.data.filter((buildGuide: BuildsGuide) =>
      buildGuide.icons.find((icon) => icon === team.value)
    );
  } else {
    lockedBuildGuide.value = undefined;
    lockedBuildGuide.value = props.data.filter((buildGuide: BuildsGuide) =>
      buildGuide.icons.find((icon) => icon === team.value)
    );
  }
};
</script>
