<script setup>
import { storeToRefs } from "pinia";
import { useNoteStore } from "../stores/note";

const noteStore = useNoteStore();
const { note } = storeToRefs(noteStore);
</script>

<template>
    <h1 class="mt-20 text-3xl text-accent">{{ note.id }}</h1>
    <h1 class="mt-20 text-3xl text-accent">{{ note.title }}</h1>
    <h1 class="mt-20 text-3xl text-accent">{{ note.content }}</h1>
    <h1 class="mt-20 text-3xl text-accent">{{ note.password }}</h1>
</template>
