<script setup>
import router from "@/router";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useNoteStore } from "../stores/note";

const noteStore = useNoteStore();
const { note } = storeToRefs(noteStore);
const route = useRoute();
const id = ref(route.params.id);
const password = ref(note.value.password);
const handleRead = async () => {
    if (id.value == null || id.value.trim().length != 24)
        return alert("ID is invalid!");
    if (route.query.secure === "true" && password.value == null)
        return alert("Password is empty!");
    (await noteStore.read(id.value, password.value)) == null
        ? alert("Note is expired or password is wrong.")
        : router.push({ name: "note" });
};

onBeforeMount(async () => {
    if (route.query.secure !== "true") {
        await handleRead();
    }
});
</script>

<template>
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
            class="text-md h-12 w-32 rounded-lg border-2 border-secondary text-[goldenrod] disabled:opacity-50"
        >
            Read
        </button>
    </div>
</template>
