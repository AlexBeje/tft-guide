<template>
  <div class="flex gap-4 px-2">
    <el-select
      v-model="team"
      class="py-2 w-full"
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
      :title="buildsGuide.title"
      :leftIcons="buildsGuide.icons"
      :key="buildsGuide.id"
      :id="buildsGuide.id"
      :itemLocked="buildsGuide.locked"
      itemCanBeLocked
      :tier="buildsGuide.tier"
      @lockItem="lockItem"
    >
      <div class="flex flex-col">
        <div class="p-2 flex flex-col gap-2 select-none">
          <p class="text-xl font-black">Early Game</p>
          <div class="flex gap-1">
            <img
              v-for="earlyGameChampion in buildsGuide.earlyGameChampions"
              :src="`champions/${earlyGameChampion}.png`"
              :class="`w-[54.33px] h-[54.33px] ${getChampionCost(
                earlyGameChampion
              )}`"
            />
          </div>
        </div>
        <div
          class="p-2 flex flex-col gap-2 select-none border-t-[1px] border-t-[#414243]"
        >
          <p class="text-xl font-black">Late Game</p>
          <div class="flex gap-1">
            <img
              v-for="lateGameChampion in buildsGuide.lateGameChampions"
              :src="`champions/${lateGameChampion}.png`"
              :class="`w-[39.75px] h-[39.75px] ${getChampionCost(
                lateGameChampion
              )}`"
            />
          </div>
        </div>
        <div
          class="p-2 flex flex-col gap-2 select-none border-t-[1px] border-t-[#414243]"
        >
          <p class="text-xl font-black">Carries</p>
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
      </div>
    </TFTDropdown>
  </div>
</template>

<script setup lang="ts">
/** Imports **/
import itemsDB from "@/data/items.json";
import championsDB from "@/data/champions.json";
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
  title: string;
  locked: boolean;
  tier: string;
  earlyGameChampions: string[];
  lateGameChampions: string[];
  carries: Carries[];
}

/** Props **/
const props = defineProps<{
  data: BuildsGuide[];
}>();

/** Variables **/
const lockedBuildGuide = ref<BuildsGuide[]>();
const leveling = ref("all");
const team = ref("all");
const teamList = ref([
  {
    id: 0,
    label: "All Classes",
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

const getChampionCost = (champion: string) => {
  const championCost = championsDB.find(
    (championDB) => championDB.name === champion
  )?.cost;

  switch (championCost) {
    case 1:
      return "border-[2px] border-[#9C9EA5]";
    case 2:
      return "border-[2px] border-[#156831]";
    case 3:
      return "border-[2px] border-[#12407c]";
    case 4:
      return "border-[2px] border-[#893088]";
    case 5:
      return "border-[2px] border-[#b89d27]";
    default:
      return;
  }
};
</script>

<style scoped lang="scss">
:deep(.el-input__prefix-inner) {
  width: v-bind(constGetWidth);
}
</style>
