<script setup>
// import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useForumStore } from "../stores/forum";
import UserProfileCardEditor from "../components/UserProfileCardEditor.vue";

const store = useForumStore();
const { authUser, user } = storeToRefs(store);

// console.log("user.value :>> ", user.value);
// console.log("user.value.usePosts :>> ", user.value.usePosts);
</script>

<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <UserProfileCard :user="user" />
        <UserProfileCardEditor :user="user" />

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

        <PostList :posts="authUser.userPosts" />

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