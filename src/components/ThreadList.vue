<script setup>
import { storeToRefs } from "pinia";
import { useForumStore } from "../stores/forum";
import { findById } from "@/helpers";

const props = defineProps({
  id: String,
  threads: Array,
});

const { users } = storeToRefs(useForumStore());
const userById = (userId) => findById(users.value, userId);
console.log("threads :>> ", props.threads);
</script>

<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <router-link
              :to="{ name: 'threadShow', params: { id: thread.id } }"
              >{{ thread.title }}</router-link
            >
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{ userById(thread.userId).name }}</a
            >, <AppDate :timestamp="thread.publishedAt" />.
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">
            {{ thread.repliesCount }}
            {{ thread.repliesCount !== 1 ? "replies" : "reply" }}
          </p>

          <img
            class="avatar-medium"
            :src="userById(thread.userId).avatar"
            alt=""
          />

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId).name }}</a>
            </p>
            <p class="text-xsmall text-faded">
              <AppDate :timestamp="thread.publishedAt" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
