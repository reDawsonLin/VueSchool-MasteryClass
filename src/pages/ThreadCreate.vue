<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useForumStore } from "../stores/forum";
import { findById } from "@/helpers";
import ThreadEditor from "../components/ThreadEditor.vue";

const props = defineProps({
  forumId: String,
});

const router = useRouter();
const store = useForumStore();
const { createThread } = store;
const { forums } = storeToRefs(store);

const forum = computed(() => findById(forums.value, props.forumId));

const save = async ({ title, text }) => {
  const thread = await createThread(props.forumId, title, text);
  router.push({ name: "threadShow", params: { id: thread.id } });
};

const cancel = () => {
  router.push({ name: "forum", params: { id: forum.value.id } });
};
</script>

<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>

    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>

<style lang="scss" scoped></style>
