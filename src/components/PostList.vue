<script setup>
import { storeToRefs } from "pinia";
import { useForumStore } from "../stores/forum";
import { findById } from "@/helpers";

defineProps({ posts: Array });

const { users } = storeToRefs(useForumStore());
const userById = (userId) => findById(users.value, userId);
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

        <p class="desktop-only text-small">107 posts</p>
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
