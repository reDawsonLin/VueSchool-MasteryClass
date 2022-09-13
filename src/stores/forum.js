import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import sourceData from "@/data.json";

export const useForumStore = defineStore("forum", () => {
  const { categories, forums, posts, stats, threads, users } =
    reactive(sourceData);

  const createPost = (post) => {
    setPost(post);
    pushPostToThread(post.id, post.threadId);
  };

  const authId = ref("VXjpr2WHa8Ux4Bnggym8QFLdv5C3");

  const user = users.find((user) => user.id === authId.value);
  const userPosts = computed(() =>
    posts.filter((post) => post.userId === user.id)
  );
  const userPostsCount = computed(() => userPosts.value.length);
  const userThreads = computed(() =>
    threads.filter((thread) => thread.userId === user.id)
  );
  const userThreadsCount = computed(() => userThreads.value.length);

  const authUser = computed(() => {
    return {
      ...user,
      userPosts: userPosts.value,
      userPostsCount: userPostsCount.value,
      userThreads: userThreads.value,
      userThreadsCount: userThreadsCount.value,
    };
  });

  const setUser = (user, id) => {
    console.log("user :>> ", user);
    const userIndex = users.findIndex((user) => user.id === id);
    console.log("userIndex :>> ", userIndex);
    console.log("users[userIndex] :>> ", users[userIndex]);
    users[userIndex] = user;
  };

  // --------
  function setPost(post) {
    console.log("posts :>> ", posts);
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
    createPost,
    setUser,
  };
});
