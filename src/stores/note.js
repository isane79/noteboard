import axios from "axios";
import { defineStore } from 'pinia';
import { ref } from 'vue';

const BASE_URL = import.meta.env.VITE_API_URL

export const useNoteStore = defineStore("note", () => {

  const note = ref({
    id: null,
    title: null,
    content: null,
    view: null,
    password: null
  });

  const write = async (title, content, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/notes/create/`, {
        "title": title,
        "content": content,
        "password": password
      });
      [note.value.id, note.value.title, note.value.content, note.value.view, note.value.password] =
        [...Object.values(data), password]
      return note.value.id
    }
    catch (error) { return }
  };

  const read = async (id, password) => {
    try {
      let { data } = await axios.post(`${BASE_URL}/notes/read/`, {
        "id": id,
        "password": password
      });
      [note.value.id, note.value.title, note.value.content, note.value.view, note.value.password] =
        [...Object.values(data), password]
      return note.value.id
    } catch (error) { return }
  }

  const reset = () => {
    note.value.id = ref()
    note.value.title = ref()
    note.value.content = ref()
    note.value.password = ref()
    note.value.view = ref()
  }

  return {
    note, write, read, reset
  }

});