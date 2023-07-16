<template>
  <div class="flex gap-4 px-2">
    <el-select
      v-model="leveling"
      class="py-2"
      placeholder="Leveling"
      size="large"
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
      @change="onTeamChange"
    >
      <el-option
        v-for="teamListItem in getTeamList"
        :key="teamListItem.value"
        :label="teamListItem.label"
        :value="teamListItem.value"
      >
        <div
          class="flex items-center gap-2"
          v-if="teamListItem.value !== 'all'"
        >
          <img
            :src="`classes/${teamListItem.value}.png`"
            class="w-[16px] h-[16px]"
            v-if="teamListItem.value !== 'all'"
          />
          <span>{{ teamListItem.label }}</span>
        </div>
      </el-option>
      <template #prefix>
        <img
          v-if="selectedTeamListItem && selectedTeamListItem !== 'all'"
          :src="`classes/${selectedTeamListItem}.png`"
          class="w-[16px] h-[16px]"
        />
      </template>
    </el-select>
  </div>
  <div v-for="buildsGuide in buildsGuidesDB">
    <TFTDropdown
      :title="buildsGuide.team"
      :leftIcons="buildsGuide.icons"
      :key="buildsGuide.id"
      :id="buildsGuide.id"
      :itemLocked="buildsGuide.locked"
      :itemCanBeLocked="buildsGuidesDB.length > 1"
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
const leveling = ref("all");
const team = ref("all");
const levelingList = ref([
  {
    id: 0,
    label: "All",
    value: "all",
  },
  {
    id: 1,
    label: "Standard",
    value: "standard",
  },
  {
    id: 2,
    label: "Hyper Roll",
    value: "hyper-roll",
  },
  {
    id: 3,
    label: "Slow Roll (6)",
    value: "slow-roll-6",
  },
  {
    id: 4,
    label: "Slow Roll (7)",
    value: "slow-roll-7",
  },
  {
    id: 5,
    label: "Fast 8",
    value: "fast-8",
  },
]);
const teamList = ref([
  {
    id: 0,
    label: "All",
    value: "all",
  },
  {
    id: 1,
    label: "Bastion",
    value: "bastion",
    visible: false,
  },
  {
    id: 2,
    label: "Bruiser",
    value: "bruiser",
    visible: false,
  },
  {
    id: 3,
    label: "Challenger",
    value: "challenger",
    visible: false,
  },
  {
    id: 4,
    label: "Deadeye",
    value: "deadeye",
    visible: false,
  },
  {
    id: 5,
    label: "Demacia",
    value: "demacia",
    visible: false,
  },
  {
    id: 6,
    label: "Freljord",
    value: "freljord",
    visible: false,
  },
  {
    label: "Gunner",
    value: "gunner",
  },
  {
    id: 7,
    label: "Invoker",
    value: "invoker",
    visible: false,
  },
  {
    id: 8,
    label: "Ionia",
    value: "ionia",
    visible: false,
  },
  {
    id: 9,
    label: "Juggernaut",
    value: "juggernaut",
    visible: false,
  },
  {
    id: 10,
    label: "Multicaster",
    value: "multicaster",
    visible: false,
  },
  {
    id: 11,
    label: "Noxus",
    value: "noxus",
    visible: false,
  },
  {
    id: 12,
    label: "Piltover",
    value: "piltover",
    visible: false,
  },
  {
    id: 13,
    label: "Rogue",
    value: "rogue",
    visible: false,
  },
  {
    id: 14,
    label: "Shadowisle",
    value: "shadowisle",
    visible: false,
  },
  {
    id: 15,
    label: "Shuriman",
    value: "shuriman",
    visible: false,
  },
  {
    id: 16,
    label: "Slayer",
    value: "slayer",
    visible: false,
  },
  {
    id: 17,
    label: "Sorcerer",
    value: "sorcerer",
    visible: false,
  },
  {
    id: 18,
    label: "Strategist",
    value: "strategist",
    visible: false,
  },
  {
    id: 19,
    label: "Targon",
    value: "targon",
    visible: false,
  },
  {
    id: 20,
    label: "Void",
    value: "void",
    visible: false,
  },
  {
    id: 21,
    label: "Yordle",
    value: "yordle",
    visible: false,
  },
  {
    id: 22,
    label: "Zaun",
    value: "zaun",
    visible: false,
  },
]);
const selectedTeamListItem = ref("all");

/** Computed **/
const buildsGuidesDB = computed(() => {
  if (lockedBuildGuide.value) {
    return lockedBuildGuide.value;
  }
  return props.data;
});
const getTeamList = computed(() => {
  const visibleTeamList = teamList.value?.map((teamListItem) => {
    if (
      props.data?.find(
        (buildGuide) =>
          buildGuide.icons.includes(teamListItem.value) ||
          teamListItem.value === "all"
      )
    ) {
      return {
        ...teamListItem,
        visible: true,
      };
    }
    return {
      ...teamListItem,
      visible: false,
    };
  });

  return visibleTeamList.filter((teamListItem) => teamListItem.visible);
});

/** Methods **/
const lockItem = (item: number, itemLocked: boolean) => {
  console.log("😳", item);
  console.log("👾", itemLocked);
  if (itemLocked) {
    lockedBuildGuide.value = props.data;
    if (leveling.value === "all" && team.value === "all") {
      lockedBuildGuide.value = props.data;
    } else if (leveling.value === "all" && team.value !== "all") {
      lockedBuildGuide.value = props.data.filter((buildGuide: BuildsGuide) =>
        buildGuide.icons.find((icon) => icon === team.value)
      );
    } else if (leveling.value !== "all" && team.value === "all") {
      lockedBuildGuide.value = props.data.filter(
        (buildGuide: BuildsGuide) => buildGuide.leveling === leveling.value
      );
    } else {
      lockedBuildGuide.value = props.data.filter(
        (buildGuide: BuildsGuide) =>
          buildGuide.leveling === leveling.value &&
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
const onLevelingChange = (value: string) => {
  selectedTeamListItem.value = "all";
  team.value = "all";
  leveling.value = value;
  if (lockedBuildGuide.value?.length) {
    lockedBuildGuide.value = props.data.filter(
      (buildGuide: BuildsGuide) => buildGuide.leveling === leveling.value
    );
    if (leveling.value === "all") {
      lockedBuildGuide.value = props.data;
    }
  } else {
    lockedBuildGuide.value = props.data.filter(
      (buildGuide: BuildsGuide) => buildGuide.leveling === leveling.value
    );
    if (leveling.value === "all") {
      lockedBuildGuide.value = props.data;
    }
  }
};
const onTeamChange = (value: string) => {
  leveling.value = "all";
  team.value = value;
  if (lockedBuildGuide.value?.length) {
    lockedBuildGuide.value = props.data.filter((buildGuide: BuildsGuide) =>
      buildGuide.icons.find((icon) => icon === team.value)
    );
    if (team.value === "all") {
      lockedBuildGuide.value = props.data;
    }
    selectedTeamListItem.value = team.value;
  } else {
    lockedBuildGuide.value = undefined;
    lockedBuildGuide.value = props.data.filter((buildGuide: BuildsGuide) =>
      buildGuide.icons.find((icon) => icon === team.value)
    );
    if (team.value === "all") {
      lockedBuildGuide.value = props.data;
    }
    selectedTeamListItem.value = team.value;
  }
};

const constGetWidth = computed(() => {
  if (selectedTeamListItem.value === "all") {
    return "0px";
  }
  return "auto";
});
</script>

<style scoped lang="scss">
:deep(.el-input__prefix-inner) {
  width: v-bind(constGetWidth);
}
</style>
