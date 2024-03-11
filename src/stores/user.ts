import { acceptHMRUpdate, defineStore } from 'pinia'
import { Registrar, RegistryEntry, UserProfile } from '~/types';
import { ulid } from "ulidx";

export type UserState = "logged-out" | "registering" | "logged-in";

export const useUserStore = defineStore('user', () => {
  const server = useServer();
  const registrar = useLocalStorage<Registrar>("registrar", {});
  const hasAtLeastOneUser = computed(() => Object.keys(registrar).length > 0);
  const lastRegistered = ref('');

  /** The user's private key */
  const secretKey = ref('');

  /**
   * Session token
   */
  const session = useLocalStorage<string>("session", ulid());

  const profile = useLocalStorage<UserProfile | null>("profile", null);

  function fromRegistrar(email: string): UserProfile {
    if(!registrar.value[email]) {
      throw new Error(`No record of the user ${email}`);
    }
    const entry: RegistryEntry = registrar.value[email];
    return {
      email,
      friends: [],
      chats: {},
      ...entry
    }
  }

  return {
  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param email - new name to set
   */
    registrar,
    hasAtLeastOneUser,
    fromRegistrar,
    profile,
    secretKey,
    session,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
