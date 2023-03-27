<script setup>
// 1. Imports
import {ref, watch} from 'vue';
import MenuItem from "@/components/MenuItem.vue";

// 2. Props 及 Emits
const props = defineProps({
  item: {
    type: Object,
  },
  selected: {
    type: String,
  },
});

const emit = defineEmits(['item-clicked']);

// 3. 展開判斷是否開啟邏輯
const isOpen = ref(false);
// selected 改變就觸發判斷是否展開 updateIsOpen
const updateIsOpen = (item, selected) => {
  // title 與 selected 符合就在當前的 isOpen 值改為true
  if (item.title === selected) {
    isOpen.value = true;
    return true;
  }
  // 當還有 children 判斷
  if (item.children && item.children.length > 0) {
    // some 陣列元素的數值是否存在，檢查使否有符合 selected 值
    const hasMatchingChild = item.children.some(child => updateIsOpen(child, selected));
    if (hasMatchingChild) {
      isOpen.value = true;
      return true;
    }
  }
  // 預設 false
  isOpen.value = false;
  return false;
};
// ---監聽 selected 改變、isOpen 開啟或關閉邏輯處---
watch(() => props.selected, (newVal) => {
  updateIsOpen(props.item, newVal);
});

// 4. 點擊展開邏輯處
const handleItemClick = (clickedTitle) => {
  console.log('子元件');
  emit('item-clicked', clickedTitle);
};

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
  if(!isOpen.value) {
    localStorage.removeItem('selectItem');
  }
  if (isOpen.value) {
    emit("item-clicked", props.item.title); // 在此處觸發 item-clicked 事件
  }
};
</script>

<template>
  <div>
    <div class="title-bar"
         :class="{ 'selected': item.title === selected }"
         @click.prevent="toggleOpen(item.title)"
    >
      <template v-if="item.children">
        <span class="arrow" :class="{ 'arrow-down': isOpen }"></span>
      </template>
      <p>{{ item.title }}</p>
    </div>
    <template v-if="item.children">
      <MenuItem
          v-show="isOpen"
          v-for="item in item.children"
          :key="item.title"
          :item="item"
          :selected="selected"
          @item-clicked="handleItemClick"
          class="sub-menu"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.sub-menu {
  margin-left: 40px;
}
.title-bar {
  display: flex;
  align-items: center;
  padding: 0 50px;
  cursor: pointer;
  width: 350px;

  &:hover,
  &.selected {
    background-color: #ededed;
  }
}
/* 箭頭 */
.arrow {
  margin-right: 15px;
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid gray;

  &.arrow-down {
    transform: rotate(90deg);
  }
}
</style>
