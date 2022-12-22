<script setup>
import router from "@/router";
import { storeToRefs } from "pinia";
import { useNoteStore } from "../stores/note";

const { note } = storeToRefs(useNoteStore());

if (note.value.id == null) {
    router.push({ name: "read" });
}

const handleCopy = async () => {
    await navigator.clipboard.writeText(note.value.content);
};
const handleShare = async () => {
    var link = `${window.location.origin}/read/${note.value.id}`;
    if (note.value.password != null) link += "?secure=true";
    await navigator.clipboard.writeText(link);
};
</script>

<template>
    <h2 class="mt-4 text-center text-xl font-bold text-accent">
        {{ note.title }}
    </h2>
    <p class="max-w-[320px] break-words p-8 text-center text-xl text-neutral">
        {{ note.content }}
    </p>
    <div class="flex w-[320px] flex-wrap justify-evenly pt-5">
        <button
            @click="handleCopy"
            class="text-md h-12 rounded-lg border-2 border-secondary px-4 text-[goldenrod]"
        >
            Copy Content
        </button>
        <button
            @click="handleShare"
            class="text-md h-12 rounded-lg border-2 border-secondary px-4 text-[goldenrod]"
        >
            Share Link
        </button>
        <p class="max-w-[320px] p-8 text-center text-xl text-secondary">
            This note has been seen <b>{{ note.view }}</b> times.
        </p>
    </div>
</template>
