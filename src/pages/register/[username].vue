<script setup lang="ts">
  const user = useUserStore();
  definePage({
    name: "Start Registration",
    meta: {
      layout: "home"
    }
  })

  const { t } = useI18n()
</script>



<template>
  <div class="register-step-1">
    <H1 text-4xl>{{ t("register.title") }}</H1>
    <div class="registration" text-sm>
      {{  t("register.sub-title") }}
      <b>{{ username }}</b>
    </div>
    <div i="carbon-badge" text="6xl" inline-block mt-4/>
    <div class="registration-txt" flex flex-col gap-4 m="t-8" pl-16 pr-16 xs:(pl-4 pr-4)>
      <p>
        {{ t("register.message-1") }}
      </p>
      <p>
        {{ t("register.message-2") }}
      </p>
    </div>
  </div>
</template>

