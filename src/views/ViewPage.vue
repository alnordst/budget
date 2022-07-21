<template lang="pug">
v-container
  .display-4.text-center(v-if="!page") 404
  div(v-else)
    v-row.pa-2
      widget(v-for="widget in page.widgets" :key="widget" :type="widget")
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Widget from '../components/widget/WidgetIndex.vue'

export default {
  components: {
    Widget
  },
  computed: {
    ...mapGetters([
      'page',
      'data'
    ])
  },
  methods: {
    ...mapMutations([
      'setAdditionalBreadcrumbs',
      'setPage'
    ]),
    init() {
      let id = this.$route.params.pageId
      this.setPage(id)
      this.setAdditionalBreadcrumbs([
        {
          text: this.page ? this.page.name : 'Not Found',
          to: `/page/${id}`
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