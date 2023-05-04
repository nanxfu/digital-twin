<template>
  <!--  难点1.使用v-show控制组件显示会导致echart图表宽度塌缩。原因：其父元素可能会在DOM中获得一个新的尺寸。这可能会导致某些元素无法正确渲染-->
  <!--  解决方案：使用nexttick更新dom-->
  <div class="right-bar" v-show="eventBus.openSideBar">
    <a-scrollbar style="height: 100vh;overflow-y: scroll;">
      <div class="scroll-wrapper">
        <a-typography>
          <a-typography-title :heading="5">
            注肥单元
          </a-typography-title>
          <a-divider></a-divider>
          <div class="charts" ref="volumechartRef"></div>
          <a-typography-title :heading="5">
            施肥任务
          </a-typography-title>
          <a-divider></a-divider>
          <a-table :columns="columns" :data="data">
            <template #detail="{ record }">
              <a-button @click="$modal.info({ title:'Name', content:record.name })">查看</a-button>
            </template>
          </a-table>
        </a-typography>
      </div>
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive, nextTick, watch} from "vue";

import * as echarts from 'echarts';
import {useEventBusStore} from "../../store/eventBus";

let volumechartRef = ref(null)
let volumeChart: echarts.EChartsType;
let eventBus = useEventBusStore()
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
          smooth: true
        }
      ]
    })
  }
})
watch(() => eventBus.openSideBar, () => {
  nextTick(() => volumeChart.resize())
})
const columns = [
  {
    title: '任务',
    dataIndex: 'task',
  },
  {
    title: '时间点',
    dataIndex: 'time',
  },
  {
    title: '操作设备',
    dataIndex: 'equipment',
  },
  {
    title: '详情',
    slotName: 'detail',
  },
];
const data = reactive([{
  "key": "1",
  "task": "A田施肥",
  "time": "2023/4/12 00:30",
  "equipment": "设备A",
  "isLoop": "false"
},
  {
    "key": "2",
    "task": "B田灌溉",
    "time": "2023/4/13 09:00",
    "equipment": "设备B",
    "isLoop": "true"
  },
  {
    "key": "3",
    "task": "C田施肥",
    "time": "2023/4/14 14:30",
    "equipment": "设备C",
    "isLoop": "false"
  },
  {
    "key": "4",
    "task": "B田施肥",
    "time": "2023/4/15 11:45",
    "equipment": "设备C",
    "isLoop": "true"
  },
  {
    "key": "5",
    "task": "C田灌溉",
    "time": "2023/4/16 08:00",
    "equipment": "设备A",
    "isLoop": "false"
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

.scroll-wrapper {
  padding-bottom: 32px;
}
</style>