import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import sourceData from "@/data.json";

export const useForumStore = defineStore("forum", () => {
  const { categories, forums, posts, stats, threads, users } =
    reactive(sourceData);
  const authId = ref("VXjpr2WHa8Ux4Bnggym8QFLdv5C3");

  const createPost = (post) => {
    post.id = "gggg" + Math.random();
    post.userId = authId.value;
    post.publishedAt = Math.floor(Date.now() / 1000);

    console.log("post :>> ", post);
    setPost(post);
    pushPostToThread(post.id, post.threadId);
  };

  const createThread = async (forumId, title, text) => {
    const id = "qqqq" + Math.random();
    const userId = authId.value;
    const publishedAt = Math.floor(Date.now() / 1000);
    const thread = {
      forumId,
      text,
      title,
      publishedAt,
      userId,
      id,
    };

    setThread(thread);
    pushThreadToForum(forumId, id);
    pushThreadToUser(userId, id);
    createPost({ text, threadId: id });
    // 這裡的寫法真的很帥，甩尾寫法；這樣寫就算param只有一個，他也會判斷是 param.text, param.threadId。
    return threads.find((thread) => thread.id === id);
  };

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
    posts.push(post);
  }

  function setThread(thread) {
    threads.push(thread);
  }

  function pushPostToThread(postId, threadId) {
    const thread = threads.find((thread) => thread.id === threadId);
    console.log("thread :>> ", thread);
    thread.posts = thread.posts || [];
    // thread.posts?.push(postId);
    thread.posts.push(postId);
  }

  function pushThreadToForum(forumId, threadId) {
    const forum = forums.find((forum) => forum.id === forumId);
    forum.posts = forum.posts || [];
    forum.posts.push(threadId);
  }

  function pushThreadToUser(userId, threadId) {
    const user = users.find((user) => user.id === userId);
    user.posts = user.posts || [];
    user.posts.push(threadId);
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
    createThread,
    setUser,
  };
});
