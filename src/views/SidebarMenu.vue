<script setup>
  // 1. Imports
  import {reactive, ref, watch, onMounted} from "vue";
  import MenuItem from "@/components/MenuItem.vue";

  // 2. 飲料資料區塊
  const  menuMax = reactive([
    {
      title: "挑戰極限飲料",
      children: [
        {
          title: '極限黑糖鮮奶',
          children: [
            {
              title: "紅柚翡翠",
              children: [
                {
                  title: "8冰綠",
                  children: [
                    {
                      title: "冰淇淋紅茶",
                      children: [
                        {
                          title: "四季春",
                          children: [
                            {
                              title: "多多綠",
                              children: [
                                {
                                  title: "烏龍綠",
                                  children: [
                                    {
                                      title: "冬片",
                                      children: [
                                        {
                                          title: "紅玉紅茶",
                                          children: [
                                            {
                                              title: "蜜香紅茶",
                                              children: [
                                                {
                                                  title: "青茶",
                                                  children: [
                                                    {
                                                      title: "芋頭鮮奶",
                                                      children: [
                                                        {
                                                          title: "小紫蘇系列",
                                                          children: [
                                                            {
                                                              title: "布丁鮮奶茶",
                                                              children: [
                                                                {
                                                                  title: "測試挑戰極限底層",
                                                                },
                                                              ]
                                                            },
                                                          ]
                                                        },
                                                      ]
                                                    },
                                                  ]
                                                },
                                              ]
                                            },
                                          ]
                                        },
                                      ]
                                    },
                                  ]
                                },
                              ]
                            },
                          ]
                        },
                      ]
                    },
                  ]
                },
              ]
            },
            {
              title: "黑糖芋圓鮮奶",
            },
            {
              title: "黑糖蒟蒻鮮奶",
            },
          ],
        },
        {
          title: '黑糖冬瓜',
          children: [
            {
              title: "黑糖冬瓜牛奶",
            },
            {
              title: "黑糖冬瓜珍珠",
            },
          ],
        }
      ]
    },
    {
      title: "茶",
      children: [
        {
          title: '烏龍綠',
        },
        {
          title: '綠茶',
        },
        {
          title: '紅茶',
        },
        {
          title: '青茶',
        },
      ]
    },
    {
      title: "咖啡",
      children: [
        {
          title: '黑咖啡',
          children: [
            {
              title: '濃縮咖啡'
            },
            {
              title: "美式咖啡",
            },
          ]
        },
        {
          title: '牛奶咖啡',
          children: [
            {
              title: '拿鐵',
              children: [
                {
                  title: '黑糖拿鐵',
                },
                {
                  title: '榛果拿鐵',
                },
                {
                  title: '香草拿鐵',
                }
              ]
            },
            {
              title: "卡布奇諾",
            },
            {
              title: "摩卡",
            },
          ]
        }
      ]
    },
  ]);// 資料假設很多時
  const  menu = reactive([
    {
      title: "好喝黑糖",
      children: [
        {
          title: '黑糖鮮奶',
          children: [
            {
              title: "黑糖珍珠鮮奶",
            },
            {
              title: "黑糖芋圓鮮奶",
            },
            {
              title: "黑糖蒟蒻鮮奶",
            },
          ],
        },
        {
          title: '黑糖冬瓜',
          children: [
            {
              title: "黑糖冬瓜牛奶",
            },
            {
              title: "黑糖冬瓜珍珠",
            },
          ],
        }
      ]
    },
    {
      title: "茶",
      children: [
        {
          title: '烏龍綠',
        },
        {
          title: '綠茶',
        },
        {
          title: '紅茶',
        },
        {
          title: '青茶',
        },
      ]
    },
    {
      title: "咖啡",
      children: [
        {
          title: '黑咖啡',
          children: [
            {
              title: '濃縮咖啡'
            },
            {
              title: "美式咖啡",
            },
          ]
        },
        {
          title: '牛奶咖啡',
          children: [
            {
              title: '拿鐵',
              children: [
                {
                  title: '黑糖拿鐵',
                },
                {
                  title: '榛果拿鐵',
                },
                {
                  title: '香草拿鐵',
                }
              ]
            },
            {
              title: "卡布奇諾",
            },
            {
              title: "摩卡",
            },
          ]
        }
      ]
    },
  ]);// menu 資料定義

  // 3. allOptions邏輯處
  const flattenOptions = (data) => {
    let options = [];// 塞值
    // 先找出所有 item.title 並 push 進陣列
    data.forEach((item) => {
      options.push(item.title);
      // 終止條件如果裡面還有 children 就繼續往下找
      if (item.children) {
        // 呼叫自身並代入item.children並 concat(組合陣列)原options
        options = options.concat(flattenOptions(item.children));
      }
    });
    return options;
  };
  const allOptions = ref(flattenOptions(menu));

  // 4. select 邏輯處
  const selected = ref('');
  // 選中選項將 selected 值修改，接收子元件的值
  const handleItemClick = (clickedTitle) => {
    selected.value = clickedTitle;
  };
  // 監聽 selected 值如改變儲存在 localStorage
  watch(selected, (newVal) => {
    localStorage.setItem('selectItem', newVal);
  });

  // 5. 生命週期處
  onMounted(() => {
    const storedSelectItem = localStorage.getItem('selectItem');
    // 記憶功能如果有儲存值，將 localStorage 值賦予 selected 值
    if (storedSelectItem) {
      selected.value = storedSelectItem;
    }
  });
</script>

<template>
  <div class="menu-bg">
    <MenuItem
        v-for="item in menu"
        :key="item.title"
        :item="item"
        :selected="selected"
        @item-clicked="handleItemClick"
    />
    <!-- select -->
    <select v-model="selected" class="menu-select">
      <option value="" style="display: none">-</option>
      <option v-for="(item, index) in allOptions" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.menu-bg,
.menu-select {
  font-size:x-large;
}
.menu-select {
  margin: 20px 50px;
}
</style>
