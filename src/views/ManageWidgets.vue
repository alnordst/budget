<template lang="pug">
v-container
  .display-4.text-center(v-if="!page") 404
  .mx-auto(v-else style="max-width:500px")
    v-card.ma-1(
      v-for="(item, index) in page.widgets"
      :key="item"
      outlined
    )
      v-card-text.d-flex
        .overline {{capitalize(item)}}
        v-spacer
        v-btn(
          icon
          :disabled="index == 0"
          @click="moveWidgetUp({pageId:page.id, index: index})"
        )
          v-icon mdi-arrow-up
        v-btn(
          icon
          :disabled="index == page.widgets.length - 1"
          @click="moveWidgetDown({pageId:page.id, index: index})"
        )
          v-icon mdi-arrow-down
        v-btn(
          icon
          @click="removeWidget({pageId:page.id, index: index})"
        )
          v-icon mdi-delete
    .bottom-bar.pa-4.elevation-10
      width-setter.d-flex.align-baseline
        v-select.flex-grow-1.pt-0.mt-0.mr-2(
          v-model="widgetSelection"
          :items="widgetOptions"
          mandatory
          hide-details="auto"
        )
        v-btn.flex-grow-1(
          color="primary"
          dark
          @click="addWidget({pageId: page.id, type: widgetSelection})"
        ) Add Widget
</template>

<script>
import { capitalCase, snakeCase } from 'change-case'
import { mapGetters, mapMutations } from 'vuex'
import WidthSetter from '../components/WidthSetter.vue'

export default {
  components: {
    WidthSetter
  },
  data: () => ({
    widgetSelection: undefined
  }),
  computed: {
    ...mapGetters([
      'page',
      'widgetTypes'
    ]),
    widgetOptions () {
      return this.widgetTypes.map(it => ({
        text: capitalCase(it),
        value: snakeCase(it),
        disabled: this.page.widgets.includes(snakeCase(it))
      }))
    }
  },
  methods: {
    ...mapMutations([
      'setAdditionalBreadcrumbs',
      'setPage',
      'addWidget',
      'moveWidgetUp',
      'moveWidgetDown',
      'removeWidget'
    ]),
    init() {
      let id = this.$route.params.pageId
      this.setPage(id)
      this.setAdditionalBreadcrumbs([
        {
          text: this.page ? this.page.name : 'Not Found',
          to: `/page/${id}`,
          exact: true
        },
        {
          text: 'Widgets'
        }
      ])
      this.widgetSelection = snakeCase(this.widgetTypes[0])
    },
    capitalize(it) {
      return capitalCase(it)
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