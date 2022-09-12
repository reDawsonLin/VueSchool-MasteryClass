<script setup>
import { storeToRefs } from "pinia";
import { useForumStore } from "../stores/forum";

defineProps({
  categories: Array,
});

const { forums } = storeToRefs(useForumStore());

const getForumsForCategory = (category) => {
  return forums.value.filter((forum) => forum.categoryId === category.id);
};
</script>

<template>
  <ForumList
    v-for="category in categories"
    :key="category.id"
    :forums="getForumsForCategory(category)"
    :title="category.name"
    :category-id="category.id"
  />
</template>

<style lang="scss" scoped></style>
