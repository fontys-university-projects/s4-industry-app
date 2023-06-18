<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full">
      <body class="h-full">
      ```
    -->
    <main class="grid h-[calc(100vh-(130px+124px))] md:h-[calc(100vh-(130px+64px))] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
            <p class="text-base font-semibold text-indigo-600">Offline</p>
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Uh oh!</h1>
            <p class="mt-6 text-base leading-7 text-gray-600" v-if="language == 'en-US'">It looks like you might have lost your internet connection! We
                are currently not supporting offline mode.</p>
            <p class="mt-6 text-base leading-7 text-gray-600" v-if="language == 'nl-NL'">Het lijkt erop dat u uw internetverbinding bent kwijtgeraakt!
                We ondersteunen momenteel geen offline modus.</p>
            <p class="mt-6 text-base leading-7 text-gray-600" v-if="language == 'fr-FR'">Il semble que vous ayez perdu votre connexion Internet ! Nous
                ne prenons actuellement pas en charge le mode hors ligne.</p>
        </div>
    </main>
</template>
<script setup>
const language = localStorage.getItem('language')
</script>