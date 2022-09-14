import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import sourceData from "@/data.json";

export const useForumStore = defineStore("forum", () => {
  const { categories, forums, posts, stats, threads, users } =
    reactive(sourceData);
  const authId = ref("VXjpr2WHa8Ux4Bnggym8QFLdv5C3");

  const createPost = (post) => {
    post.id = "gggg" + Math.random();
    post.userId = authId;
    post.publishedAt = Math.floor(Date.now() / 1000);
    setPost(post);
    pushPostToThread(post.id, post.threadId);
  };

  // const user = users.find((user) => user.id === authId.value);
  const user = computed(() => users.find((user) => user.id === authId.value));
  const userPosts = computed(() =>
    posts.filter((post) => post.userId === user.value.id)
  );
  const userPostsCount = computed(() => userPosts.value.length);
  const userThreads = computed(() =>
    threads.filter((thread) => thread.userId === user.value.id)
  );
  const userThreadsCount = computed(() => userThreads.value.length);

  const authUser = computed(() => {
    return {
      ...user.value,
      userPosts: userPosts.value,
      userPostsCount: userPostsCount.value,
      userThreads: userThreads.value,
      userThreadsCount: userThreadsCount.value,
    };
  });

  const setUser = (authUser) => {
    const userIndex = users.findIndex((user) => user.id === authUser.id);
    users[userIndex] = authUser;
  };

  // --------
  function setPost(post) {
    // console.log("posts :>> ", posts);
    posts.push(post);
  }

  function pushPostToThread(postId, threadId) {
    const thread = threads.find((thread) => thread.id === threadId);
    thread.posts.push(postId);
  }

  return {
    authUser,
    categories,
    forums,
    posts,
    stats,
    threads,
    user,
    users,
    userPosts,
    userPostsCount,
    userThreads,
    userThreadsCount,
    createPost,
    setUser,
  };
});
