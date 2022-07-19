<template lang="pug">
div.mx-auto(:style="`max-width: ${width}px;`")
  slot
</template>

<script>
export default {
  computed: {
    width () {
      let widths = {
        xs: 900,
        sm: 900,
        md: 900,
        lg: 1185,
        xl: 1785
      }
      return widths[this.$vuetify.breakpoint.name]
    }
  }
}
</script>