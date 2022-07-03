<template lang="pug">
v-app
  v-app-bar(app)
    div.d-flex.justify-space-between.w-100.mx-auto(:style="maxWidthStyle")
      v-breadcrumbs(:items="breadcrumbs" large)
        template(v-slot:divider)
          v-icon mdi-chevron-right
      v-icon.mr-4(large) mdi-menu
  v-main
    router-view
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      breadcrumbs: 'breadcrumbs/breadcrumbs'
    }),
    maxWidth () {
      let widths = {
        xs: 900,
        sm: 900,
        md: 900,
        lg: 1185,
        xl: 1785
      }
      return widths[this.$vuetify.breakpoint.name]
    },
    maxWidthStyle () {
      return `max-width:${this.maxWidth}px`
    }
  },
  methods: {
    ...mapMutations({
      resetBreadcrumbs: 'breadcrumbs/resetBreadcrumbs'
    })
  }
};
</script>

<style lang="stylus">
.w-100
  width: 100%
</style>