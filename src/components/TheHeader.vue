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

async function logout() {

}

</script>

<template>
  <nav
    flex="~ gap-4"
    mb-6
    justify-center
    text-xl
  >

    <div class="action-panel" flex gap-4>
      <button icon-btn :title="t('global.toggle-dark')" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>
      <a icon-btn :title="t('global.switch-lang')" @click="toggleLocales()">
        <div i-carbon-language />
      </a>
      <button icon-btn :title="t('global.logout')" @click="logout()" m="l-4">
        <div i="carbon-sun dark:carbon-exit" />
      </button>
    </div>
  </nav>
</template>
