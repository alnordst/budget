<template lang="pug">
v-app
  v-app-bar(app)
    width-setter.d-flex.justify-space-between.w-100
      v-breadcrumbs(:items="breadcrumbs" large).overline.nowrap.d-flex.flex-nowrap
        template(v-slot:divider)
          v-icon mdi-chevron-right
      v-menu(bottom left nudge-bottom="53")
        template(v-slot:activator="{ on, attrs }")
          v-btn(icon v-bind="attrs" v-on="on").my-auto.mr-4
            v-icon(large) mdi-menu
        v-list
          v-list-item(v-if="pageIsSet" :to="`/page/${pageId}/manage-sources`")
            v-list-item-title Manage Sources
          v-list-item(v-if="pageIsSet" :to="`/page/${pageId}/manage-widgets`")
            v-list-item-title Manage Widgets
          v-list-item(to="/manage-pages")
            v-list-item-title Manage Pages
          v-list-item(disabled)
            v-list-item-title Backup to File
          v-list-item(disabled)
            v-list-item-title Restore from File
          v-list-item(disabled)
            v-list-item-title Backup to Dropbox
          v-list-item(disabled)
            v-list-item-title Restore from Dropbox
  v-main
    router-view
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import WidthSetter from './components/WidthSetter.vue'

export default {
  components: {
    WidthSetter
  },
  name: 'App',
  computed: {
    ...mapState({
      pageId: state => state.pages.pageId
    }),
    ...mapGetters([
      'pageIsSet'
    ]),
    breadcrumbs () {
      return this.$vuetify.breakpoint.xsOnly ? this.$store.getters.truncatedBreadcrumbs : this.$store.getters.breadcrumbs
    }
  },
  methods: {
    ...mapMutations([
      'resetBreadcrumbs'
    ])
  }
};
</script>

<style lang="stylus">
.w-100
  width: 100%
.nowrap
  overflow:hidden
  white-space:nowrap
.bottom-bar
  position: absolute
  bottom: 0
  left: 0
  width: 100%
  background-color: rgb(245, 245, 245)
</style>