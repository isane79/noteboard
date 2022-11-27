<script setup>
import { ref } from "vue";
import router from "@/router";
import { useNoteStore } from "../stores/note";

const title = ref("");
const secure = ref(false);
const password = ref("");
const content = ref("");

const submitHandler = async (e) => {
    e.preventDefault();

    if (secure.value && password.value.length < 6) {
        alert("Password is less than 6 character or Empty!");
        return;
    } else if (content.value === "") {
        alert("Note Content is Empty!");
        return;
    }

    const noteStore = useNoteStore();
    noteStore.write(title.value, content.value, password.value);

    router.push({ name: "read" });
};
</script>

<template>
    <form
        v-on:submit="submitHandler"
        class="flex max-w-lg flex-col items-center justify-center"
    >
        <div
            class="mt-5 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-4"
        >
            <span class="text-sm uppercase text-accent">Note Title:</span>
            <input
                v-model="title"
                class="placeholder:text-md block h-8 w-full border-none bg-transparent text-lg text-neutral outline-none placeholder:italic placeholder:text-secondary"
                type="text"
                placeholder="leave empty for auto generation"
                autocomplete="off"
                maxlength="30"
            />
        </div>
        <div
            class="mt-5 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-5"
        >
            <span class="text-sm uppercase text-accent">Access via:</span>
            <div class="flex items-center justify-center gap-6 py-2">
                <input
                    class="input-radio hidden"
                    id="radio1"
                    type="radio"
                    name="access-via"
                    v-bind:value="false"
                    v-model="secure"
                    checked
                />
                <label
                    class="label-radio text-md cursor-pointer pl-8 text-secondary before:border-2 before:border-secondary after:bg-accent"
                    for="radio1"
                    >Link - ID</label
                >
                <input
                    class="input-radio hidden"
                    id="radio2"
                    type="radio"
                    name="access-via"
                    v-bind:value="true"
                    v-model="secure"
                />
                <label
                    class="label-radio text-md cursor-pointer pl-8 text-secondary before:border-2 before:border-secondary after:bg-accent"
                    for="radio2"
                    >Password</label
                >
            </div>
        </div>
        <div
            v-show="secure"
            class="mt-5 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-5"
        >
            <span class="text-sm uppercase text-accent">Password:</span>
            <input
                v-model="password"
                class="block h-10 w-full border-none bg-transparent text-xl text-neutral outline-none placeholder:text-lg placeholder:italic placeholder:text-secondary"
                type="password"
                placeholder="set password to access note"
                autocomplete="off"
                maxlength="30"
            />
        </div>
        <div
            class="mt-5 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-5"
        >
            <span class="text-sm uppercase text-accent">Note Content:</span>
            <textarea
                v-model="content"
                class="block w-full border-none bg-transparent text-lg text-neutral outline-none placeholder:text-lg placeholder:italic placeholder:text-secondary"
                name="note"
                rows="5"
                placeholder="text note..."
            ></textarea>
        </div>
        <div class="flex w-full flex-wrap justify-center pt-5">
            <button
                class="text-md h-12 w-32 rounded-lg border-2 border-secondary text-secondary"
            >
                Submit
            </button>
        </div>
    </form>
</template>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px theme("colors.primary") inset;
    box-shadow: 0 0 0 30px theme("colors.primary") inset;
    color: theme("colors.secondary") !important;
}

.label-radio::before {
    content: "";
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    left: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
}

.label-radio::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 6px solid transparent;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
    left: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    display: none;
}

.input-radio:checked + .label-radio::after {
    display: block;
}
</style>
