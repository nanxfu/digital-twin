<template>
  <div class="wrapper">
    <div class="chart" ref="ecchartRef"></div>
    <div class="chart" ref="pHchartRef"></div>
    <a-typography>
      <a-typography-title :heading="5">
        日志
      </a-typography-title>
      <a-divider/>
    </a-typography>
    <a-timeline>
      <a-timeline-item label="2017-03-10" dotColor="#00B42A">
        设备一切正常，准备就绪
      </a-timeline-item>
      <a-timeline-item label="2018-05-22">尝试重连设备</a-timeline-item>
      <a-timeline-item label="2020-06-22" dotColor="#F53F3F">
        尝试连接设备
        <IconExclamationCircleFill
            :style="{ color: 'F53F3F', fontSize: '12px', marginLeft: '4px' }"
        />
      </a-timeline-item>
      <a-timeline-item label="2020-09-30" :dotColor="colorMaper.pass">
        安装施肥机设备
      </a-timeline-item>
    </a-timeline>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts';
import {useMachineStore} from "../../store/machine";


let ecchartRef = ref<HTMLElement | null>(null)
let pHchartRef = ref<HTMLElement | null>(null)
let ecChart: echarts.EChartsType;
let pHchart: echarts.EChartsType;
let machineStore = useMachineStore()
let colorMaper = {
  'pass': '#00B42A',
  'info': '#C9CDD4',
  'warning': '#F53F3F'
}


function changeCurrentMachine() {
  machineStore.currentMachine++

}

machineStore.$subscribe((mutation, state) => {
  let index = state.currentMachine;
  if (ecChart && pHchart) {
    ecChart.setOption({
      series: [
        {
          name: 'ec',
          type: 'line',
          yAxisIndex: 0,
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: state.ec[index]
        }
      ]
    })
    pHchart.setOption({
      series: [
        {
          name: 'pH',
          type: 'line',
          yAxisIndex: 0,
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: state.pH[index]
        }
      ]
    })
  }
})
onMounted(() => {
  ecChart = echarts.init(ecchartRef.value as HTMLElement, 'dark')
  pHchart = echarts.init(pHchartRef.value as HTMLElement, 'dark')

  ecChart.setOption({
        title: {
          text: '肥液参数-ec'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['ec']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'EC (ms/cm)'
          }
        ],
        series: [
          {
            name: 'ec',
            type: 'line',
            yAxisIndex: 0,
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [1.2, 1.32, 1.01, 1.34, 0.9, 2.3, 2.1, 1.8]
          }
        ]
      }
  )
  pHchart.setOption({
    color: "#91cc75",
    title: {
      text: '肥液参数-pH'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['pH']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [
          '00:00',
          '03:00',
          '06:00',
          '09:00',
          '12:00',
          '15:00',
          '18:00',
          '21:00'
        ]
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'pH',
        min: 0,
        max: 10
      }
    ],
    series: [
      {
        name: 'pH',
        type: 'line',
        yAxisIndex: 0,
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [6.2, 6.8, 7.4, 6.5, 7.1, 8.2, 7.6, 6.9]
      }
    ]
  })
})
</script>

<style scoped>
.chart {
  height: 200px;
}

.wrapper {
  padding: 10px 5px;

}
</style>