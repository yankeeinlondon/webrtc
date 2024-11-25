<script setup lang="ts">
definePage({
  meta: {
    layout: "home"
  }
})

defineOptions({
  name: 'IndexPage',
});

const user = useUserStore();
const username = ref('');
const router = useRouter();

function start() {
  if (username.value.length > 2) {
    user.name = username.value
    console.log(`Go ${username.value}`)
    router.push({name: "Friends"})
  }
}

const { t } = useI18n()
</script>

<template>
  <div class="home">
    <div text-4xl>
      <div i-carbon-chat inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/yankeeinlondon/chatter" target="_blank">
        {{ t('app.title') }}
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('app.desc') }}</em>
    </p>

    <div py-4 />

    <div>
      <TheInput
        id="username"
        type="string"
        v-model="username"
        :placeholder="t('login.username')"
        autocomplete=false
        @keydown.enter="start"
      />
    </div>
    <label class="hidden" for="input">{{ t('login.username') }}</label>

    <div class="cta">
      <button
        m-3 text-sm btn
        :disabled="username.length <  2 "
        @click="start"
      >
        {{ t('login.start_btn') }}
      </button>

    </div>
  </div>
</template>


