<script setup>
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { useForumStore } from "../stores/forum";

const store = useForumStore();
const { authUser: user, posts, threads } = storeToRefs(store);

const userPosts = computed(() =>
  posts.value.filter((post) => post.userId === user.value.id)
);
const userPostsCount = computed(() => userPosts.value.length);

const userThreads = computed(() =>
  threads.value.filter((thread) => thread.userId === user.value.id)
);
const userThreadsCount = computed(() => userThreads.value.length);
</script>

<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
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

        <p class="text-xsmall text-faded text-center">
          Member since june 2003, last visited 4 hours ago
        </p>

        <div class="text-center">
          <hr />
          <a href="edit-profile.html" class="btn-green btn-small"
            >Edit Profile</a
          >
        </div>
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> Joker's recent activity </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr />

        <PostList :posts="userPosts" />

        <!-- <div class="activity-list">
          <div class="activity">
            <div class="activity-header">
              <img
                src="https://i.imgur.com/OqlZN48.jpg"
                alt=""
                class="hide-mobile avatar-small"
              />
              <p class="title">
                How can I chop onions without crying?
                <span>Joker started a topic in Cooking</span>
              </p>
            </div>

            <div class="post-content">
              <div>
                <p>
                  I absolutely love onions, but they hurt my eyes! Is there a
                  way where you can chop onions without crying?
                </p>
              </div>
            </div>

            <div class="thread-details">
              <span>4 minutes ago</span>
              <span>1 comments</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
