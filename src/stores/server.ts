import { acceptHMRUpdate, defineStore } from 'pinia'
import { Chat, Friend, RegistryEntry, UserProfile } from '~/types';
import nacl from "tweetnacl";

export type LoginResponse = [token: Uint8Array, profile: UserProfile];

export const useServer = defineStore('server', () => {
  const friends = useLocalStorage<Friend[]>("friends", []);
  const chats = useLocalStorage<Record<string, Chat>>("chats", {})
  const user = useUserStore();
  const URL = import.meta.env.VITE_SERVER_URL || null as string | null;
  const PORT = import.meta.env.VITE_SERVER_PORT || 4000;
  const hasServer = typeof URL === "string";
  const address = computed(() => hasServer ? `${URL}:${PORT}` : `http://localhost:${PORT}`);

  async function register(
    email: string,
    name: string,
  ): Promise<UserProfile> {
    const registered = Date.now();
    const { secretKey, publicKey } = crypt.signing_key_pair();

    const entry: RegistryEntry = {
      ...(user.registrar[email] || {}),
      registered,
      signing_key: secretKey,
      public_key: publicKey
    };

    user.registrar = {
      ...user.registrar,
      [email]: entry
    }

    const profile: UserProfile = {
      ...entry,
      email,
      friends: friends.value,
      chats: chats.value
    }
    user.profile = profile;

    return profile;
  }

  async function login(email: string, password: string): Promise<LoginResponse> {
   if(hasServer) {
      const res = await fetch(`${URL}:${PORT}/login`);
      if(res.ok) {
        return res.json() as Promise<LoginResponse>;
      } else {
        throw new Error("Server Error");
      }
   } else {
    const {publicKey, secretKey} = nacl.box.keyPair();
      return {
        email,
        publicKey,

      }
   }
  }


  return {
    login,
    register,
    hasServer,
    address
  }

})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
