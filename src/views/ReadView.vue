<script setup>
import { storeToRefs } from "pinia";
import { useNoteStore } from "../stores/note";
import { ref } from "vue";
import { computed } from "@vue/reactivity";

const noteStore = useNoteStore();
const { note } = storeToRefs(noteStore);
const id = ref(note.value.id);
const password = ref(note.value.password);
const isSame = computed(() => {
    return id.value == note.value.id || id.value.trim().length != 24;
});
const handleRead = async () => {
    if ((await noteStore.read(id.value, password.value)) == null) {
        noteStore.reset();
        alert("Note is expired or password is wrong.");
    }
};
</script>

<template>
    <h2 v-if="note.title" class="mt-4 text-2xl font-bold text-accent">
        {{ note.title }}
    </h2>
    <p
        v-if="note.content"
        class="max-w-[320px] p-8 text-center text-2xl text-secondary"
    >
        {{ note.content }}
    </p>
    <div
        class="mt-8 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-4 text-center"
    >
        <span class="uppercase text-accent">ID:</span>
        <input
            v-model="id"
            class="block h-8 w-full border-none bg-transparent text-center text-lg text-neutral outline-none placeholder:italic placeholder:text-secondary"
            type="text"
            placeholder="24 character hex id of note"
            autocomplete="off"
            maxlength="24"
            minlength="24"
        />
    </div>
    <div
        class="mt-5 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-5 text-center"
    >
        <span class="uppercase text-accent">Password:</span>
        <input
            v-model="password"
            class="block h-10 w-full border-none bg-transparent text-center text-lg text-neutral outline-none placeholder:italic placeholder:text-secondary"
            type="password"
            placeholder="password for secure notes"
            autocomplete="off"
            maxlength="30"
        />
    </div>
    <div class="flex w-full flex-wrap justify-center pt-5">
        <button
            @click="handleRead"
            :disabled="isSame"
            class="text-md h-12 w-32 rounded-lg border-2 border-secondary text-[goldenrod] disabled:opacity-50"
        >
            Read
        </button>
    </div>
</template>
