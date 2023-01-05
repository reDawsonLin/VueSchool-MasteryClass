<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useForumStore } from "../stores/forum";
import { findById } from "@/helpers";

const props = defineProps({
  id: String,
});

const { categories, forums } = storeToRefs(useForumStore());

const category = computed(() => findById(categories.value, props.id));

const getForumsForCategory = (category) =>
  forums.value.filter((forum) => forum.categoryId === category.id);
</script>

<template>
  <h1>{{ category.name }}</h1>
  <ForumList :title="category.name" :forums="getForumsForCategory(category)" />
</template>

<style lang="scss" scoped></style>
