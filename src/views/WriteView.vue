<script setup>
import { ref, computed } from "vue";
import router from "@/router";
import { useNoteStore } from "../stores/note";

const title = ref("");
const secure = ref(false);
const password = ref("");
const content = ref("");
const day = ref(0);
const hour = ref(0);
const hasDay = computed(() => ({ "text-neutral": day.value != 0 }));
const hasHour = computed(() => ({ "text-neutral": hour.value != 0 }));

const submitHandler = async () => {
    // empty content check
    if (content.value === "") return alert("Note Content is Empty!");
    // weak or empty password check
    if (secure.value) {
        if (password.value.length < 6)
            return alert("Password is less than 6 character or Empty!");
    }
    // init store & write then push router on success
    switch (
        await useNoteStore().write(
            title.value.trim(),
            content.value,
            secure.value ? password.value : null,
            day.value != 0 || hour.value != 0
                ? day.value * 24 + hour.value
                : null
        )
    ) {
        case 200:
            router.push({ name: "note" });
            break;
        default:
            alert("something went wrong!");
    }
};
</script>

<template>
    <form
        @submit.prevent="submitHandler"
        class="flex max-w-lg flex-col items-center justify-center"
    >
        <!--note title-->
        <div
            class="mt-5 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-4"
        >
            <span class="uppercase text-accent">Note Title:</span>
            <input
                v-model="title"
                class="block h-8 w-full border-none bg-transparent text-lg text-neutral outline-none placeholder:italic placeholder:text-secondary"
                type="text"
                placeholder="leave empty for auto generation"
                autocomplete="off"
                maxlength="30"
            />
        </div>
        <!--note content-->
        <div
            class="mt-5 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-5"
        >
            <span class="uppercase text-accent">Note Content:</span>
            <textarea
                v-model="content"
                class="block w-full border-none bg-transparent text-lg text-neutral outline-none placeholder:italic placeholder:text-secondary"
                name="note"
                rows="5"
                placeholder="text note..."
            ></textarea>
        </div>
        <!--access via-->
        <div
            class="mt-5 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-5"
        >
            <span class="uppercase text-accent">Access via:</span>
            <div class="flex items-center justify-around gap-6 py-2">
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
                    class="label-radio cursor-pointer pl-8 text-secondary before:border-2 before:border-secondary after:bg-accent"
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
                    class="label-radio cursor-pointer pl-8 text-secondary before:border-2 before:border-secondary after:bg-accent"
                    for="radio2"
                    >Password</label
                >
            </div>
        </div>
        <!--password-->
        <div
            v-show="secure"
            class="mt-5 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-5"
        >
            <span class="uppercase text-accent">Password:</span>
            <input
                v-model="password"
                class="block h-10 w-full border-none bg-transparent text-lg text-neutral outline-none placeholder:italic placeholder:text-secondary"
                type="password"
                placeholder="set password to access note"
                autocomplete="off"
                maxlength="30"
            />
        </div>
        <!--expire after-->
        <div
            class="mt-5 min-w-[16rem] rounded-lg border-2 border-secondary py-2 px-5"
        >
            <span class="uppercase text-accent">expire after</span>
            <div class="flex justify-around">
                <span class="uppercase text-accent">day:</span>
                <input
                    :class="hasDay"
                    v-model="day"
                    class="block w-8 border-none bg-transparent text-lg text-secondary outline-none placeholder:italic placeholder:text-secondary"
                    type="number"
                    oninput="this.value=this.value.slice(0,3)"
                />
                <span class="uppercase text-accent">hour:</span>
                <input
                    :class="hasHour"
                    v-model="hour"
                    class="block w-8 border-none bg-transparent text-lg text-secondary outline-none placeholder:italic placeholder:text-secondary"
                    type="number"
                    oninput="this.value=this.value.slice(0,3)"
                />
            </div>
        </div>
        <!--button-->
        <div class="flex w-full flex-wrap justify-center p-5">
            <button
                class="text-md h-12 w-32 rounded-lg border-2 border-secondary text-[goldenrod]"
            >
                Write
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

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
