<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useForumStore } from "../stores/forum";
import { findById } from "@/helpers";

const props = defineProps({ id: String });
const {
  forums,
  // threads: storeThreads,
  thread: storeThread,
} = storeToRefs(useForumStore());
const forum = computed(() => findById(forums.value, props.id));
const threads = computed(() => {
  return forum.value.threads.map((threadId) => storeThread.value(threadId));
  // return storeThreads.value.filter((thread) => thread.forumId === props.id);
});
</script>

<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link
        :to="{ name: 'threadCreate', params: { forumId: forum.id } }"
        class="btn-green btn-small"
        >Start a thread</router-link
      >
    </div>
  </div>

  <div class="col-full push-top">
    <ThreadList :threads="threads" />
  </div>
</template>

<style lang="scss" scoped></style>
