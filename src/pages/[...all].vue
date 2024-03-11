<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    {{ t('404.not-found') }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
