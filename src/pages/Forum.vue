<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useForumStore } from "../stores/forum";

const props = defineProps({
  id: String,
});

const { forums, threads: storeThreads } = storeToRefs(useForumStore());

const forum = computed(() =>
  forums.value.find((forum) => forum.id === props.id)
);

const threads = computed(() =>
  storeThreads.value.filter((thread) => thread.forumId === props.id)
);
</script>

<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <a href="new-thread.html" class="btn-green btn-small">Start a thread</a>
    </div>
  </div>

  <div class="col-full push-top">
    <ThreadList :threads="threads" />
  </div>
</template>

<style lang="scss" scoped></style>
