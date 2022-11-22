<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <nav
        class="my-10 flex w-full max-w-lg justify-center gap-4 sm:gap-14 md:gap-20"
    >
        <RouterLink
            class="text-lg text-secondary hover:text-accent md:text-xl xl:text-2xl"
            to="/"
            >Noteboard</RouterLink
        >
        <RouterLink
            class="text-lg text-secondary hover:text-accent md:text-xl xl:text-2xl"
            to="/write"
            >Write</RouterLink
        >

        <RouterLink
            class="text-lg text-secondary hover:text-accent md:text-xl xl:text-2xl"
            to="/read"
            >Read</RouterLink
        >
        <RouterLink
            class="text-lg text-secondary hover:text-accent md:text-xl xl:text-2xl"
            to="/dashboard"
            >Dashboard</RouterLink
        >
    </nav>
    <RouterView />
</template>

<style lang="postcss" scoped>
.router-link-exact-active {
    @apply cursor-default text-accent;
}
</style>
