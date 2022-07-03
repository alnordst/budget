<template lang="pug">
v-container
  .display-4.text-center(v-if="!page") 404
  div(v-else)
    span {{page}}
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('pages', [
      'pages'
    ]),
    pageSlug () {
      return this.$route.params.pageSlug
    },
    page () {
      return this.pages.find(it => it.slug === this.pageSlug)
    }
  },
  methods: {
    ...mapMutations('breadcrumbs', [
      'setAdditionalBreadcrumbs'
    ]),
    init() {
      this.setAdditionalBreadcrumbs([
        {
          text: this.page ? this.page.name : 'Not Found',
          href: `/page/${this.pageSlug}`
        }
      ])
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    $route() {
      this.init()
    }
  }
}
</script>