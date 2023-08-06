<template>
  <div class="flex gap-4 px-2">
    <el-select
      v-model="championClass"
      class="py-2 w-full"
      placeholder="Team"
      size="large"
      @change="onTeamChange"
    >
      <el-option
        v-for="championClassListItem in getTeamList"
        :key="championClassListItem.value"
        :label="championClassListItem.label"
        :value="championClassListItem.value"
      >
        <div
          class="flex items-center gap-2"
          v-if="championClassListItem.value !== 'all'"
        >
          <img
            :src="`classes/${championClassListItem.value}.png`"
            class="w-[16px] h-[16px] invert dark:invert-0"
            v-if="championClassListItem.value !== 'all'"
          />
          <span>{{ championClassListItem.label }}</span>
        </div>
      </el-option>
      <template #prefix>
        <img
          v-if="selectedTeamListItem && selectedTeamListItem !== 'all'"
          :src="`classes/${selectedTeamListItem}.png`"
          class="w-[16px] h-[16px] invert dark:invert-0"
        />
      </template>
    </el-select>
  </div>
  <div v-for="buildsGuide in buildsGuidesDB">
    <TFTDropdown
      :title="buildsGuide.title"
      :leftIcons="buildsGuide.icons"
      :key="buildsGuide.title"
      :itemLocked="buildsGuide.locked"
      itemCanBeLocked
      :tier="buildsGuide.tier"
      @lockItem="lockItem"
    >
      <div class="flex flex-col">
        <div class="p-2 flex flex-col gap-2 select-none">
          <p class="text-xl font-black text-black dark:text-inherit">Early Game</p>
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
          class="p-2 flex flex-col gap-2 select-none border-t-[1px] dark:border-t-[#414243]"
        >
          <p class="text-xl font-black text-black dark:text-inherit">Late Game</p>
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
          class="p-2 flex flex-col gap-1 select-none border-t-[1px] dark:border-t-[#414243]"
        >
          <p class="text-xl font-black text-black dark:text-inherit">Carries</p>
          <div
            v-for="carry in buildsGuide.carries"
            :key="carry.id"
            class="flex gap-1 last-of-type:mb-0"
          >
            <img
              :src="`champions/${carry.name}.png`"
              :class="`w-[60px] h-[60px] ${getChampionCost(carry.name)}`"
            />
            <div v-for="item in carry.items" :key="item">
              <div v-for="items in itemsDB">
                <div v-if="items.name === item" class="flex">
                  <img
                    :src="`items/${items.name}.png`"
                    class="w-[60px] h-[60px] opacity-25"
                  />
                  <div class="flex flex-col">
                    <div v-if="!items.components" class="w-[30px] h-[30px]" />
                    <img
                      v-else
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
  title: string;
  icons: string[];
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
const championClass = ref("all");
const championClassList = ref([
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
  const visibleTeamList = championClassList.value?.map(
    (championClassListItem) => {
      if (
        props.data?.find(
          (buildGuide) =>
            buildGuide.icons.includes(championClassListItem.value) ||
            championClassListItem.value === "all"
        )
      ) {
        return {
          ...championClassListItem,
          visible: true,
        };
      }
      return {
        ...championClassListItem,
        visible: false,
      };
    }
  );

  return visibleTeamList.filter(
    (championClassListItem) => championClassListItem.visible
  );
});

/** Methods **/
const lockItem = (item: string, itemLocked: boolean) => {
  if (itemLocked) {
    lockedBuildGuide.value = props.data;
    if (championClass.value === "all") {
      lockedBuildGuide.value = props.data;
    } else {
      lockedBuildGuide.value = props.data.filter((buildGuide: BuildsGuide) =>
        buildGuide.icons.find((icon) => icon === championClass.value)
      );
    }
  } else {
    lockedBuildGuide.value = props.data
      .filter((buildGuide: BuildsGuide) => buildGuide.title === item)
      .map((buildGuide: BuildsGuide) => {
        return {
          ...buildGuide,
          locked: true,
        };
      });
  }
};
const onTeamChange = (value: string) => {
  championClass.value = value;
  if (lockedBuildGuide.value?.length) {
    lockedBuildGuide.value = props.data.filter((buildGuide: BuildsGuide) =>
      buildGuide.icons.find((icon) => icon === championClass.value)
    );
    if (championClass.value === "all") {
      lockedBuildGuide.value = props.data;
    }
    selectedTeamListItem.value = championClass.value;
  } else {
    lockedBuildGuide.value = undefined;
    lockedBuildGuide.value = props.data.filter((buildGuide: BuildsGuide) =>
      buildGuide.icons.find((icon) => icon === championClass.value)
    );
    if (championClass.value === "all") {
      lockedBuildGuide.value = props.data;
    }
    selectedTeamListItem.value = championClass.value;
  }
};
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
