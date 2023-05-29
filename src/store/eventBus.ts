import {defineStore} from 'pinia'
import {reactive, Ref, ref} from "vue";
export const useEventBusStore = defineStore('eventBus', () => {
    const openSideBar = ref(false)
    const machineState = ref(0)
    return {
        openSideBar,
        machineState
    }
})