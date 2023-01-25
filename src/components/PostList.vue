<script setup>
import { storeToRefs } from "pinia";
import { useForumStore } from "../stores/forum";

defineProps({ posts: Array });

const store = useForumStore();
const { user } = storeToRefs(store);
const userById = (userId) => user.value(userId);
</script>

<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="user-info">
        <a href="#" class="user-name">{{ userById(post.userId).name }}</a>

        <a href="#">
          <img
            class="avatar-large"
            :src="userById(post.userId).avatar"
            alt=""
          />
        </a>

        <p class="desktop-only text-small">
          {{ userById(post.userId).postsCount }} posts
          <!-- <pre>{{ userById(post.userId) }}</pre> -->
        </p>
        <p class="desktop-only text-small">
          {{ userById(post.userId).threadsCount }} threads
        </p>
      </div>

      <div class="post-content">
        <div>
          <p>{{ post.text }}</p>
        </div>
      </div>

      <div class="post-date text-faded">
        <AppDate :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
