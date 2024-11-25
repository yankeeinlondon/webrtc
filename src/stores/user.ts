import { acceptHMRUpdate, defineStore } from 'pinia'
import { ulid } from "ulidx";

export const useUserStore = defineStore('user', () => {
  const name = ref('');
  const uid = ref(ulid());

  return {
    uid,
    name
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
