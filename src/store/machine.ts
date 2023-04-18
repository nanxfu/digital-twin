import {defineStore} from 'pinia'
import {reactive, Ref, ref} from "vue";
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useMachineStore = defineStore('machine', () => {
    const currentMachine = ref(0)
    const MachineVertex = ref([1, 1, 1])
    const ec = ref([
        [0.8, 0.9, 0.7, 0.6, 0.8, 0.9, 0.7, 0.6],
        [2.5, 2.3, 2.7, 2.8, 2.5, 2.3, 2.7, 2.8],
        [3.8, 3.9, 4.2, 4.1, 4.0, 4.2, 4.1, 4.0]])
    const pH = ref([
        [6.5, 6.4, 6.7, 6.6, 6.5, 6.4, 6.7, 6.6],
        [6.0, 6.2, 6.1, 5.9, 6.0, 6.2, 6.1, 5.9],
        [6.0, 6.2, 6.1, 5.9, 6.0, 6.2, 6.1, 5.9]])
    const log = ref([{
        date: '2022/4/10 10:21',
        msg: '设备启动'
    }])
    return {
        ec,
        pH,
        MachineVertex,
        currentMachine,
    }
})