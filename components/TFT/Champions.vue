<template>
  <div v-for="championClass in championClassesDB">
    <div class="flex items-center" v-if="championClass.index">
      <p class="ml-2 font-bold">{{ championClass.index }}</p>
      <div class="w-full h-[2px] bg-[#E5EAF3] ml-2 mr-2" />
    </div>
    <TFTDropdown
      :title="championClass.name[0].toUpperCase() + championClass.name.slice(1)"
      :key="championClass.id"
      :id="championClass.id"
      :left-icons="[championClass.name]"
      :itemLocked="championClass.locked"
      itemCanBeLocked
      @lockItem="lockItem"
    >
      <div v-for="champion in sortChampions(championsDB)" :key="champion.id">
        <div
          v-if="champion.class && champion.class.includes(championClass.name)"
          class="flex gap-[4px] mb-2 first:mt-2 ml-2"
        >
          <img
            :src="`champions/${champion.name}.png`"
            :class="`w-[60px] h-[60px] relative
          ${champion.cost === 2 && 'border-[2px] border-[#156831]'}
          ${champion.cost === 3 && 'border-[2px] border-[#12407c]'}
          ${champion.cost === 4 && 'border-[2px] border-[#893088]'}
          ${champion.cost === 5 && 'border-[2px] border-[#b89d27]'}
          `"
          />
          <div
            :class="`absolute w-[14px] h-[14px] mt-[40px] ml-[6px] rounded-full border-[2px] border-black
          ${champion.tier === 1 && 'bg-[#FF00FF]'}
          ${champion.tier === 2 && 'bg-[#E69138]'}
          ${champion.tier === 3 && 'bg-[#FFE599]'}
          ${champion.tier === 4 && 'bg-[#6D9EEB]'}
          ${champion.tier === 5 && 'bg-[#00FF01]'}
        `"
          />
          <div v-for="item in champion.items">
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
    </TFTDropdown>
  </div>
</template>

<script setup lang="ts">
/** Imports **/
import championClasses from "@/data/championClasses.json";
import itemsDB from "@/data/items.json";

/** Interfaces **/
interface Champion {
  id: string;
  name: string;
  cost: number;
  class: string[];
  items: string[];
  tier: number;
}

/** Props **/
const props = defineProps<{
  data: Champion[];
}>();

/** Variables **/
const lockedChampionClass = ref();

/** Computed **/
const championsDB = computed(() => {
  return props.data;
});
const championClassesDB = computed(() => {
  if (lockedChampionClass.value) {
    return lockedChampionClass.value;
  }
  return championClasses;
});

/** Methods **/
const sortChampions = (champions: Champion[]) => {
  return champions.sort((a, b) => a.cost - b.cost);
};

const lockItem = (item: string, itemLocked: boolean) => {
  console.log('👰', championClasses)
  if (itemLocked) {
    lockedChampionClass.value = championClasses;
  } else {
    lockedChampionClass.value = championClasses
      .filter((championClass) => championClass.name === item.toLowerCase())
      .map((championClass) => {
        return {
          ...championClass,
          locked: true,
        };
      });
  }
};
</script>
