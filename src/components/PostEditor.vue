<script setup>
import { ref } from "vue";

const text = ref("");
const emit = defineEmits(["save"]);

const save = () => {
  if (!text.value) return;
  const postId = "gggg" + Math.random();
  const post = {
    id: postId,
    text: text.value,
    publishedAt: Math.floor(Date.now() / 1000),
    userId: "rpbB8C6ifrYmNDufMERWfQUoa202",
  };

  emit("save", { post });

  text.value = "";
};
</script>

<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          v-model.trim="text"
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
        ></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
