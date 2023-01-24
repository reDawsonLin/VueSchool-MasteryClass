import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import sourceData from "@/data.json";
import { findById, upsert } from "@/helpers";

export const useForumStore = defineStore("forum", () => {
  const { categories, forums, posts, stats, threads, users } =
    reactive(sourceData);
  const authId = ref("VXjpr2WHa8Ux4Bnggym8QFLdv5C3");

  // -------
  const createPost = (post) => {
    post.id = "gggg" + Math.random();
    post.userId = authId.value;
    post.publishedAt = Math.floor(Date.now() / 1000);

    console.log("post :>> ", post);
    setPost(post);
    appendPostToThread(post.id, post.threadId);
    appendContributorToThread(post.userId, post.threadId);
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
    appendThreadToForum(id, forumId);
    appendThreadToUser(id, userId);
    createPost({ text, threadId: id });
    // 這裡的寫法真的很帥，甩尾寫法；這樣寫就算 param 只有一個，他也會判斷是 param.text, param.threadId。
    return findById(threads, id);
  };

  const updateThread = async (threadId, title, text) => {
    const thread = findById(threads, threadId);
    const post = findById(posts, thread.posts[0]);
    const newThread = { ...thread, title }; //  利用解構，若有相同的key，後面的會覆蓋前面的
    const newPost = { ...post, text };

    setThread(newThread);
    setPost(newPost);

    return newThread;
  };

  const user = computed(() => findById(users, authId.value));
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

  // 增加留言數量顯示選項 ---
  const thread = computed(() => {
    return (threadId) => {
      const thread = findById(threads, threadId);
      return {
        ...thread,
        get author() {
          return findById(users, thread.userId);
        },
        get repliesCount() {
          return thread.posts.length - 1;
        },
        get contributorsCount() {
          return thread.contributors?.length || 0;
        },
      };
    };
  });

  // function --------
  function setPost(post) {
    upsert(posts, post);
  }

  function setThread(thread) {
    upsert(threads, thread);
  }

  function appendPostToThread(postId, threadId) {
    const thread = findById(threads, threadId);
    thread.posts = thread.posts || [];
    thread.posts.push(postId);

    console.log("thread :>> ", thread);
  }

  function appendThreadToForum(threadId, forumId) {
    const forum = findById(forums, forumId);
    forum.threads = forum.threads || [];
    forum.threads.push(threadId);
  }

  function appendThreadToUser(threadId, userId) {
    const user = findById(users, userId);
    user.threads = user.threads || [];
    user.threads.push(threadId);
  }

  function appendContributorToThread(contributorId, threadId) {
    const thread = findById(threads, threadId);
    thread.contributors = thread.contributors || [];
    if (!thread.contributors.includes(contributorId)) {
      thread.contributors.push(contributorId);
    }
  }

  return {
    authUser,
    categories,
    forums,
    posts,
    stats,
    thread,
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
    updateThread,
  };
});
