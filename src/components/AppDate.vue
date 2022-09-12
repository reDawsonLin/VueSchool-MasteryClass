<script setup>
import { computed } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(relativeTime).extend(localizedFormat);

const props = defineProps({
  timestamp: Number,
});

// dayjs ------------
// const diffForHumans = (timestamp) => dayjs.unix(timestamp).fromNow();
// const humanFriendlyDate = (timestamp) => dayjs.unix(timestamp).format("llll");
const diffForHumans = computed(() => dayjs.unix(props.timestamp).fromNow());
const humanFriendlyDate = computed(() =>
  dayjs.unix(props.timestamp).format("llll")
);
</script>

<template>
  <span :title="humanFriendlyDate">
    {{ diffForHumans }}
  </span>
</template>

<style lang="scss" scoped></style>
