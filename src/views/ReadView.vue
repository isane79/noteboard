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
const invalidId = () => {
    return id.value == null || id.value.trim().length != 24;
};
const invalidPassword = () => {
    return route.query.secure === "true" && password.value == null;
};
const readNote = async () => {
    switch (await noteStore.read(id.value, password.value)) {
        case 200:
            router.push({ name: "note" });
            break;
        case 404:
            alert("ID or password is wrong.");
            break;
        case 410:
            alert("Note is expired.");
            break;
        default:
            alert("something went wrong!");
    }
};
const handleRead = async () => {
    if (invalidId()) return alert("ID is invalid!");
    if (invalidPassword()) return alert("Password is empty!");
    readNote();
};

onBeforeMount(() => {
    if (route.query.secure !== "true" && !invalidId()) {
        readNote();
    }
});
</script>

<template>
    <div
        class="mt-5 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-4 text-center"
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
