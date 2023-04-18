import {defineStore} from 'pinia'
import {reactive, Ref, ref} from "vue";
export const useEventBusStore = defineStore('eventBus', () => {
    const openSideBar = ref(false)

    return {
        openSideBar
    }
})