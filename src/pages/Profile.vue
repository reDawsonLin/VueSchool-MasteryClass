<script setup>
// import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useForumStore } from "../stores/forum";
defineProps({
  edit: {
    type: Boolean,
    default: false,
  },
});
const store = useForumStore();
const { user, userPosts, userPostsCount, userThreadsCount } =
  storeToRefs(store);
const { setUser } = store;
// const save = (authUser) => {
//   console.log("authUser :>> ", authUser);
//   setUser(authUser);
// };
</script>

<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <UserProfileCard
          v-if="!edit"
          :user="user"
          :userPostsCount="userPostsCount"
          :userThreadsCount="userThreadsCount"
        />
        <UserProfileCardEditor
          v-else
          :user="user"
          :userPostsCount="userPostsCount"
          :userThreadsCount="userThreadsCount"
          @save="setUser"
        />
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> {{ user.username }} recent activity </span>
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
