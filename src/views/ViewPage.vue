<template lang="pug">
v-container
  .display-4.text-center(v-if="!page") 404
  .d-flex.justify-end.w-100(v-else-if="page.sources.length == 0")
    .display-1.pt-4.d-flex.flex-wrap.justify-center
      span.mx-1 No sources yet,
      span.mx-1 create one!
    v-icon(large).ml-4.mr-7.mr-md-3 mdi-arrow-up-right
  .d-flex.justify-end.w-100(v-else-if="page.widgets.length == 0")
    .display-1.pt-4.d-flex.flex-wrap.justify-center
      span.mx-1 No widgets yet,
      span.mx-1 create one!
    v-icon(large).ml-4.mr-7.mr-md-3 mdi-arrow-up-right
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