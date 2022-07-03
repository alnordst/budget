<template lang="pug">
v-container
  .d-flex.justify-end.w-100(v-if="pages.length==0")
    .display-1.pt-4.d-flex.flex-wrap.justify-center
      span.mx-1 No pages yet,
      span.mx-1 create one!
    v-icon(large).ml-4.mr-7.mr-md-3 mdi-arrow-up-right
  v-btn(
    v-for="page in pages" :key="page.slug"
    block
    color="primary"
    dark
    :to="`/page/${page.slug}`"
  ) {{page.name}}
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      pages: state => state.pages.pages
    })
  },
  mounted() {
    this.$store.commit('breadcrumbs/resetBreadcrumbs')
  }
}
</script>
