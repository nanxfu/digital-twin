<template>
  <div class="right-bar">
    <a-scrollbar style="height: 100vh;overflow-y: scroll;">
      <div class="scroll-wrapper">
      <a-typography>
        <a-typography-title :heading="5">
          注肥单元
        </a-typography-title>
        <a-divider></a-divider>
      <div class="charts" ref="volumechartRef"></div>
        <a-typography-title :heading="5">
          施肥策略
        </a-typography-title>
        <a-divider></a-divider>
        <a-table :columns="columns" :data="data" />
      </a-typography>
      </div>
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive} from "vue";

import * as echarts from 'echarts';

let volumechartRef = ref(null)
let volumeChart: echarts.EChartsType;

onMounted(() => {
  if (volumechartRef.value) {
    volumeChart = echarts.init(volumechartRef.value, 'dark')
    volumeChart.setOption({
      title: {
        text: '肥液余量'
      },
      xAxis: {
        type: 'category',
        data: [
          '0:00',
          '1:00',
          '2:00',
          '3:00',
          '4:00',
          '5:00',
          '6:00',
          '7:00',
          '8:00',
          '9:00'
        ]
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} L'
        },
        max: 1600
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: [
        {
          data: [
            900,
            800,
            700,
            600,
            500,
            400,
            300,
            200,
            100,
            100
          ],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          smooth:true
        }
      ]
    })
  }
})
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];
const data = reactive([{
  key: '1',
  name: 'Jane Doe',
  salary: 23000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
}, {
  key: '2',
  name: 'Alisa Ross',
  salary: 25000,
  address: '35 Park Road, London',
  email: 'alisa.ross@example.com'
}, {
  key: '3',
  name: 'Kevin Sandra',
  salary: 22000,
  address: '31 Park Road, London',
  email: 'kevin.sandra@example.com'
}, {
  key: '4',
  name: 'Ed Hellen',
  salary: 17000,
  address: '42 Park Road, London',
  email: 'ed.hellen@example.com'
}, {
  key: '5',
  name: 'William Smith',
  salary: 27000,
  address: '62 Park Road, London',
  email: 'william.smith@example.com'
}]);

</script>

<style scoped>
.right-bar {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 30%;
  right: 0;
  background-color: #100c2a;
  /*pointer-events: none;*/
  padding: 10px;
}
.charts {
  height: 400px;
  width: 100%;
  /*padding: 10px 5px;*/
  /*border: #3c7eff 10px solid;*/
}
.scroll-wrapper{
  padding-bottom: 32px;
}
</style>