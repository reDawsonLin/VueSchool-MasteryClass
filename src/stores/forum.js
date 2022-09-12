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
  const authUser = computed(() => {
    return users.find((user) => user.id === authId.value);
  });

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
    // authId,
    authUser,
    categories,
    forums,
    posts,
    stats,
    threads,
    users,
    createPost,
  };
});
