import axios from "axios";
import { defineStore } from 'pinia';
import { ref } from 'vue';

const BASE_URL = import.meta.env.VITE_API_URL

export const useNoteStore = defineStore("note", () => {

  const note = ref({
    id: null,
    title: null,
    content: null,
    password: null,
  });


  const write = async (title, content, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/notes/create/`, {
        "title": title,
        "content": content,
        "password": password
      },
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        });
      [note.value.id, note.value.title, note.value.content, note.value.password] =
        [...Object.values(data), password]
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    note, write
  }

});