<script setup lang="ts">
definePage({
  meta: {
    layout: "home"
  }
})

defineOptions({
  name: 'IndexPage',
})
const user = useUserStore();
const username = ref(user.savedEmail);
const password = ref('');

const validEmail = computed( () => {
  const req_chars = ["@", "."];
  const alpha_char= /.*[a-zA-Z]$/;

  return alpha_char.test(username.value) && req_chars.every(i => username.value.includes(i))
});

const router = useRouter()
async function login() {
  if (username.value && password.value) {
    const result = await user.login(username.value, password.value);
    if (result) {
      router.push({path: `/app/friends`, params: { username }})
    } else {
      // set error status
    }
  }
}

function register() {
  if (username.value) {
    user.setNewEmail(username.value);
    router.push({ path: `/register/${username.value}` });
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

    <div class="has-users" v-if="user.hasAtLeastOneUser">
      <div>
        <TheInput
          id="username"
          type="email"
          v-model="username"
          :placeholder="t('login.username')"
          autocomplete="false"
          @keydown.enter="register"
        />
      </div>
      <label class="hidden" for="input">{{ t('login.username') }}</label>

      <div class="mt-2">
        <TheInput
          v-model="password"
          type="password"
          id="password"
          :placeholder="t('login.password')"
          autocomplete="false"
          @keydown.enter="login"
        />
        <label class="hidden" for="input">{{ t('login.password') }}</label>
      </div>

      <div>
        <button
          m-3 text-sm btn
          :disabled="!username || password.length < 4 || !password"
          @click="login"
        >
          {{ t('login.login_btn') }}
        </button>

        <button
          m-3 text-sm btn
          :disabled="!username || !validEmail || !!password"
          @click="register"
        >
          {{ t('login.register_btn') }}
        </button>
      </div>

    </div>
  </div>
</template>


