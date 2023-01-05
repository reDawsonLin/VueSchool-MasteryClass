<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useForumStore } from "../stores/forum";
import { findById } from "@/helpers";
import ThreadEditor from "../components/ThreadEditor.vue";

const props = defineProps({
  threadId: String,
});

const router = useRouter();
const store = useForumStore();
const { updateThread } = store;
const { threads, posts } = storeToRefs(store);

const thread = computed(() => findById(threads.value, props.threadId));

console.log("thread.value :>> ", thread.value);

const title = ref(thread.value.title);
const text = ref(findById(posts.value, thread.value.posts[0]).text);
// posts.value.find((post) => post.id === thread.value.posts[0]).text

const save = async ({ title, text }) => {
  const thread = await updateThread(props.threadId, title, text);
  router.push({ name: "threadShow", params: { id: thread.id } });
};

const cancel = () => {
  router.push({ name: "threadShow", params: { id: props.threadId } });
};
</script>

<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ thread.title }}</i>
    </h1>

    <ThreadEditor :title="title" :text="text" @save="save" @cancel="cancel" />
  </div>
</template>

<style lang="scss" scoped></style>
