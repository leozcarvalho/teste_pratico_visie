<template>
  <div>
  </div>
</template>
  
<script>
export default {
  name: 'ToastAlert',

  methods: {
    showToast(message, variant) {
      switch (variant) {
        case 'success':
          this.$toast.success(message)
          break;
        case 'error':
          this.$toast.danger(message)
          break
        default:
          this.$toast.info(message)
          break;
      }
    },
  },
}
</script>