<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useForumStore } from "../stores/forum";

const props = defineProps({
  user: Object,
});

const store = useForumStore();
const { posts, threads } = storeToRefs(store);

const userPosts = computed(() =>
  posts.value.filter((post) => post.userId === props.user.id)
);
const userPostsCount = computed(() => userPosts.value.length);

const userThreads = computed(() =>
  threads.value.filter((thread) => thread.userId === props.user.id)
);
const userThreadsCount = computed(() => userThreads.value.length);
</script>

<template>
  <div class="profile-card">
    <p class="text-center">
      <img
        :src="user.avatar"
        alt="`${user.name} profile picture`"
        class="avatar-xlarge"
      />
    </p>

    <h1 class="title">{{ user.username }}</h1>

    <p class="text-lead">{{ user.name }}</p>

    <p class="text-justify">{{ user.bio || "No bio specified" }}</p>

    <span class="online">{{ user.username }} is online</span>

    <div class="stats">
      <span>{{ userPostsCount }} posts</span>
      <span>{{ userThreadsCount }} threads</span>
    </div>

    <hr />

    <p v-if="user.website" class="text-large text-center">
      <i class="fa fa-globe"></i>
      <a :href="user.website">{{ user.wibsite }}</a>
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
