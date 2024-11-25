<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { Friend } from '~/types';

definePage({
  name: "Friends",
  meta: {
    requiresAuth: false,
    layout: "app"
  }
})
const user = useUserStore();
const lc = new RTCPeerConnection();
const dc = lc.createDataChannel(user.name);
const localDesc = ref<RTCSessionDescription | null>(null);
const source = ref<string>('');
const friends = ref<Friend[]>([]);

const { copy, isSupported } = useClipboard({source});

dc.onopen = e => console.log(`${user.name}'s data channel opened`, e);

lc.createOffer().then(o => {
  lc.setLocalDescription(o)
  source.value = JSON.stringify(o);
});


lc.onicecandidate = async (e) => {
  localDesc.value = lc.localDescription;
  console.log(`New ICE candidate!`, lc.localDescription);
}

async function clippy() {
  await copy();
}

</script>

<template>
  <div class="friends">
    <h1 text-4xl>Friends of {{user.name}}</h1>
    <div text-xs>uid: <span text="gray-400 dark:gray-500">{{ user.uid }}</span></div>
    <div text-xs>connection state: <span text="gray-400 dark:gray-500">{{ lc.connectionState }}</span></div>
    <div text-xs>
      <span class="not-supported" v-if="!isSupported">Offer: {{ source }}</span>
      <span class="supported" v-else>
        <div v-if="source.length > 0">
          Offer
          <button
            class="btn"

            @click="clippy"
            bg-green-900
            text-gray-100
            active:bg-orange-900
            p-1
          >
            <span v-if="!copied">Copy</span>
            <span v-else>Copied!</span>
          </button>
        </div>
        <div v-else class="not-ready">
          Preparing Offer
        </div>
      </span>
    </div>


    <div text-xs><span text="gray-400 dark:gray-500">
      <div class="offer-ready" v-if="lc.localDescription" text-sm>

      </div>
    </span></div>
    <div m="t-8" />

    <div class="friend-cards" grid gap-4>
      <div v-for="friend in friends" border-1 rounded-2 border-gray-500 p-8 max-w-sm hover:(dark:bg-gray-900 bg-gray-200) cursor-pointer>
        <div class="friend-name">{{ friend.name }}</div>
        <div class="friend-email">{{ friend.email }}</div>
      </div>
      <div class="add-friend" border-1 border-white p-8 max-w-sm rounded-2 hover:(dark:bg-gray-900 bg-gray-200) cursor-pointer>
        <div i-carbon-add-filled inline-block />
        Add a new Friend
      </div>
    </div>

  </div>
</template>
