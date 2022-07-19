<template lang="pug">
v-container
  v-btn.mb-2(
    v-for="page in pages" :key="page.id"
    block
    @click="managePage(page.id)"
  ) {{page.name}}
  v-dialog(v-if="page" v-model="managePageDialog" width="500")
    v-card
      v-card-title.d-flex.justify-space-between
        span {{page.name}}
        v-btn(icon @click="managePageDialog = false")
          v-icon mdi-close
      v-card-text
        .d-flex.align-center
          v-text-field.mr-2(v-model="editPageTitle" label="New Page Title")
          v-btn(color="primary" dark @click="rename") Rename Page
        v-btn.mb-4(block :to="`/page/${page.id}/manage-sources`") Manage Sources
        v-btn.mb-4(block :to="`/page/${page.id}/manage-widgets`") Manage Widgets
        v-btn(color="red" dark block @click="confirmDelete") Delete Page
  v-dialog(v-if="page" v-model="confirmDeleteDialog" width="500")
    v-card
      v-card-title Are you sure you want to delete&nbsp;
        span.red--text {{page.name}}
        span ?
      v-card-text There is no undo. This page has {{page.sources.length}} sources configured.
      v-card-actions.d-flex.pb-4
        v-btn.flex-grow-1(@click="cancelDelete") Cancel
        v-btn(color="red" dark @click="actuallyDelete").flex-grow-1 Delete
  .bottom-bar.pa-4.elevation-10
    width-setter
      v-dialog(v-model="createPageDialog" width="500")
        template(v-slot:activator="{ on, attrs }")
          v-btn(
            color="primary"
            block
            dark
            v-bind="attrs"
            v-on="on"
            @click="newPageTitle=''"
          ) Create New Page
        v-card
          v-card-title.d-flex.justify-space-between
            span Create Page
            v-btn(icon @click="createPageDialog = false")
              v-icon mdi-close
          v-card-text
            v-text-field(v-model="newPageTitle" label="Page Title")
            v-btn(block color="primary" dark @click="create") Create
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import WidthSetter from '../components/WidthSetter.vue'

export default {
  components: {
    WidthSetter
  },
  data: () => ({
    selectedPageId: undefined,
    managePageDialog: false,
    confirmDeleteDialog: false,
    createPageDialog: false,
    editPageTitle: "",
    newPageTitle: ""
  }),
  computed: {
    ...mapState({
      pages: state => state.pages.pages
    }),
    page () {
      return this.pages.find(it => it.id == this.selectedPageId)
    }
  },
  methods: {
    ...mapMutations([
      'setAdditionalBreadcrumbs',
      'setPage',
      'renamePage',
      'removePage',
      'createPage'
    ]),
    init() {
      this.setAdditionalBreadcrumbs([
        {
          text: 'Manage Pages'
        }
      ])
      this.setPage(undefined)
    },
    managePage(id) {
      this.selectedPageId = id
      this.editPageTitle = ''
      this.managePageDialog = true
    },
    rename() {
      this.renamePage({id: this.selectedPageId, title: this.editPageTitle})
      this.managePageDialog = false
    },
    confirmDelete() {
      this.managePageDialog = false
      this.confirmDeleteDialog = true
    },
    cancelDelete() {
      this.managePageDialog = true
      this.confirmDeleteDialog = false
    },
    actuallyDelete() {
      this.removePage(this.selectedPageId)
      this.managePageDialog = false
    },
    create() {
      this.createPage(this.newPageTitle)
      this.createPageDialog = false
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
