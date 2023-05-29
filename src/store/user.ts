import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
    const token = ref()
    const logged = ref(false)
    return {
        token,
        logged
    }
})