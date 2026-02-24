<script lang="ts" setup>
defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label
      class="block text-xs tracking-widest uppercase text-wedding-dark mb-2 font-medium"
    >
      {{ label }}
    </label>

    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      rows="4"
      class="w-full p-4 border border-wedding-beige bg-wedding-ivory text-wedding-dark resize-y focus:outline-none focus:border-wedding-gold transition-colors"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
    />
  </div>
</template>
