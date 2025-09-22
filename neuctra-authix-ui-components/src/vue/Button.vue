<template>
  <button
    @click="onClick"
    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  onClick?: () => void;
}>();
</script>
