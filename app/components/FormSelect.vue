<script lang="ts" setup>
interface SelectOption {
  value: string;
  label: string;
}

defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
  options: { type: Array as () => SelectOption[], default: () => [] },
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
    <select
      :value="modelValue"
      class="w-full p-4 border border-wedding-beige bg-wedding-ivory text-wedding-dark focus:outline-none focus:border-wedding-gold transition-colors"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>
