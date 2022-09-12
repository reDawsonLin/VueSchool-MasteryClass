<script setup>
defineProps({
  forums: Array,
  title: {
    type: String,
    default: "Forum",
  },
  categoryId: {
    type: String,
  },
});

const forumThreadsWord = (forum) => {
  if (!forum.threads?.length) return "no threads";
  return forum.threads.length === 1 ? "thread" : "threads";
};
</script>

<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <router-link
          v-if="categoryId"
          :to="{ name: 'category', params: { id: categoryId } }"
        >
          {{ title }}
        </router-link>
        <span v-else>{{ title }}</span>
      </h2>

      <div class="forum-listing" v-for="forum in forums" :key="forum.id">
        <div class="forum-details">
          <router-link
            :to="{ name: 'forum', params: { id: forum.id } }"
            class="text-xlarge"
          >
            {{ forum.name }}
          </router-link>
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p>
            <span class="count">{{ forum.threads?.length }}</span>
            {{ forumThreadsWord(forum) }}
          </p>
        </div>

        <div class="last-thread"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
