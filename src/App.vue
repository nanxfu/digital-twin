<script setup lang="ts">
import ThreeScene from "./components/ThreeScene/ThreeScene.vue";
import MachineState from "./components/MachineState/MachineState.vue";
import {onMounted, ref, watch, reactive} from "vue";
import {useMachineStore} from "./store/machine";
import MachineDetail from "./components/MachineDetail/MachineDetail.vue";
import {useEventBusStore} from "./store/eventBus";
// 难点2. 静态资源生产环境与开发环境不一致
let machineStore = useMachineStore()
let machineState = ref(0)
let eventBus = useEventBusStore()
let buttonTitle = ref("打开")
const images = [
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp',
];
onMounted(() => {
  document.body.setAttribute('arco-theme', 'dark')
})
watch(machineState, (newValue, oldValue) => {
  machineStore.currentMachine = machineState.value
})
const visible = ref(false)
const Loginform = reactive({
  name: '',
  password: '',
});

function handleLogin() {
  visible.value = true
}

function handleSubmit() {

}

function handleOk() {
  visible.value = false;
};

function handleCancel() {
  visible.value = false;
}

function openSideBar(){
  eventBus.openSideBar = !eventBus.openSideBar
}
</script>

<template>
  <a-row class="grid-demo">
    <a-col :span="8">
      <aside class="sidebar">
        <a-scrollbar style="height: 100vh;overflow-y: scroll;">
          <div class="scroll-wrapper">
            <a-typography>
              <a-typography-title :heading="4" style="text-align: center">
                施肥机数字前端设计
              </a-typography-title>
              <a-divider/>
              <div class="user">
                <div style="flex: 1">
                  <a-avatar :size="48" style="margin-right: 10px">
                    <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                    />
                  </a-avatar>
                  <span>普通用户</span>
                </div>
                <a-button style="margin-right: 10px" @click="handleLogin">登录</a-button>
                <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
                  <template #title>
                    管理员登录
                  </template>
                  <a-form :model="Loginform" @submit="handleSubmit">
                    <a-form-item field="name" label="用户名">
                      <a-input
                          v-model="Loginform.name"
                          placeholder="请输入用户名"
                      />
                    </a-form-item>
                    <a-form-item field="password" label="密码">
                      <a-input v-model="Loginform.password" placeholder="请输入密码"/>
                    </a-form-item>
                  </a-form>
                </a-modal>
              </div>
              <div style="display: flex;flex: 1;justify-content: center">
                <a-radio-group type="button" v-model="machineState">
                  <a-radio :value="0">设备A</a-radio>
                  <a-radio :value="1">设备B</a-radio>
                  <a-radio :value="2">设备C</a-radio>
                </a-radio-group>
              </div>
              <machine-state/>
              <a-typography-title :heading="5" style="">
                园区数据
              </a-typography-title>
              <a-divider/>
              <!--   ====  Farm Data ====       -->
              <div class="progressGroup">
                <div style="text-align: center;">
                  <a-progress type="circle" size="large" :percent="0.2"/>
                  <p>
                    <icon-dashboard style="color: #3c7eff"/>
                    园内温度
                  </p>
                </div>
                <div style="text-align: center;">
                  <a-progress type="circle" size="large" :percent="0.63" color="#00B42A"/>
                  <p>
                    <icon-experiment style="color: #00B42A;"/>
                    园内湿度
                  </p>
                </div>
                <div style="text-align: center;">
                  <a-progress type="circle" size="large" :percent="0.4" status="warning"/>
                  <p>
                    <icon-sun style="color: #ff9626"/>
                    土壤湿度
                  </p>
                </div>
              </div>
              <a-carousel
                  :style="{
      height: '240px',
    }"
                  :auto-play="true"
                  indicator-type="dot"
                  show-arrow="hover"
              >
                <a-carousel-item v-for="image in images">
                  <img
                      :src="image"
                      :style="{
          width: '100%',
        }"
                  />
                </a-carousel-item>
              </a-carousel>
            </a-typography>
          </div>
        </a-scrollbar>
        <div class="btn-container">
          <a-button type="primary" long class="detail" @click="openSideBar">
            <template v-if="eventBus.openSideBar">
              关闭
              <icon-left/>
            </template>
            <template v-else>
              施肥机详情
              <icon-right/>
            </template>
          </a-button>
        </div>
      </aside>
    </a-col>
    <a-col :span="16">
      <div class="container">
        <three-scene/>
      </div>
    </a-col>
    <machine-detail></machine-detail>
  </a-row>
</template>

<style>
.scroll-wrapper {
  padding-bottom: 32px;
}

.container {
  height: 100vh;
}

.btn-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.sidebar {
  position: relative;

  background-color: #100c2a;
}

html, body {
  overflow: hidden;
}

.user {
  display: flex;
  align-items: center;
  margin: 10px 0px;
}

.header {
  position: absolute;
}

.progressGroup {
  display: flex;
  justify-content: space-evenly;
}
</style>
