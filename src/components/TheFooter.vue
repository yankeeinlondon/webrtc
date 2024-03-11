<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <div class="vertical-pad flex grow"></div>
  <nav flex="~ gap-4" mt-6 justify-center text-xl>
    <RouterLink
      v-if="$route.path !== '/'" icon-btn to="/" :title="t('app.title')"
    >
      <div i-carbon-chat />
    </RouterLink>

    <button icon-btn :title="t('global.toggle-dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <a icon-btn :title="t('global.switch-lang')" @click="toggleLocales()">
      <div i-carbon-language />
    </a>

    <a icon-btn rel="noreferrer" href="https://github.com/yankeeinlondon/chatter" target="_blank" title="GitHub">
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
