<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const homeUrl = router.resolve({ name: 'home' }).href
</script>

<template>
  <br-header
    title="Obras - Você por dentro"
    is-sticky="true"
    has-search="true"
    placeholder-search="Digite o texto da pesquisa"
    label-search="Que obra você procura?"
    has-title-link="true"
    :title-link-url="homeUrl"
  ></br-header>
</template>
