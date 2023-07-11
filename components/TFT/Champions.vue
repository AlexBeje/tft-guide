<template>
  <TFTDropdown
    v-for="championsCategory in championsCategoriesDB"
    :description="championsCategory.name"
    :key="championsCategory.id"
    :id="championsCategory.id"
  >
    <div
      v-for="champion in sortChampions(championsCategory.champions)"
      :key="championsCategory.id"
      class="flex"
    >
      <img
        :src="`champions/set9/${champion.name}.png`"
        class="w-[62px] h-[62px]"
      />
      <div v-for="item in champion.items">
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
  </TFTDropdown>
</template>

<script setup lang="ts">
/** Imports **/
import itemsDB from "@/data/items.json";

/** Interfaces **/
interface Champions {
  id: number;
  name: string;
  items: string[];
  tier: string;
}
interface ChampionsCategory {
  id: number;
  name: string;
  champions: Champions[];
}

/** Props **/
const props = defineProps<{
  data: ChampionsCategory[];
}>();

/** Computed **/
const championsCategoriesDB = computed(() => {
  return props.data;
});

/** Methods **/
const sortChampions = (champions: Champions[]) => {
  return champions.sort((a, b) => {
    if (a.tier < b.tier) {
      return -1;
    }
    if (a.tier > b.tier) {
      return 1;
    }
    return 0;
  });
};
</script>
