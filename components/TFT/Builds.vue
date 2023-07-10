<template>
  <TFTDropdown
    v-for="buildsGuide in buildsGuidesDB"
    :descriptions="buildsGuide.team"
    :key="buildsGuide.id"
  >
    <div>
      <img :src="`builds/${buildsGuide.image}`" class="w-full h-auto" />
      <h1>Carries</h1>
      <div v-for="carry in buildsGuide.carries" :key="carry.id" class="flex">
        <img :src="`champions/set9/${carry.name}.png`" />
        <div v-for="item in carry.items" :key="item">
          <div v-for="items in itemsDB">
            <div v-if="items.name === item" class="flex">
              <img :src="`items/${items.name}.png`" class="w-full"/>
              <div class="flex flex-col">
                <img
                  v-for="component in items.components"
                  :src="`components/${component.name}.png`"
                />
              </div>
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
import componentsDB from "@/data/components.json";

/** Types **/
interface Carries {
  id: number;
  name: string;
  items: string[];
}

interface BuildsGuide {
  id: number;
  team: string[];
  image: string;
  carries: Carries[];
}

/** Props **/
const props = defineProps<{
  data: BuildsGuide[];
}>();

/** Computed **/
const buildsGuidesDB = computed(() => props.data);
</script>
