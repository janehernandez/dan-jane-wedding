<script lang="ts" setup>
defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  required: { type: Boolean, default: false },
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

    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      class="w-full p-4 border border-wedding-beige bg-wedding-ivory text-wedding-dark focus:outline-none focus:border-wedding-gold transition-colors"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>
