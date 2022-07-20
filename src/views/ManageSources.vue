<template lang="pug">
v-container
  .display-4.text-center(v-if="!page") 404
  div.d-flex.flex-column.mx-auto(v-else style="max-width:500px")
    v-data-iterator(
      :items="page.sources"
      sort-by="name"
    )
      template(v-slot:default="{ items }")
        v-card.ma-1(
          v-for="item in items"
          :key="item.id"
          outlined
          :color="item.active ? '' : 'grey lighten-3'"
        )
          v-card-text(:class="{'grey--text': !item.active}")
            v-row.pa-1
              v-col.pa-0(cols=9)
                .font-weight-bold {{item.name}}
              v-col.pa-0.text-right(cols=3)
                span(:class="item.amount > 0 ? 'green--text text--darken-2' : ''")
                  span {{`${item.amount > 0 ? '+' : ''}`}}${{Math.abs(item.amount)}}
              v-col.pa-0(cols=6)
                span {{item.regularity}}
              v-col.pa-0.text-right(cols=6)
                span {{item.date}}
  .bottom-bar.pa-4.elevation-10
    width-setter
      v-dialog(v-model="createSourceDialog" width="500")
        template(v-slot:activator="{ on, attrs }")
          v-btn(
            color="primary"
            block
            dark
            v-bind="attrs"
            v-on="on"
            @click="resetNewSource"
          ) Create New Source
        v-card
          v-card-title.d-flex.justify-space-between
            span Create Source
            v-btn(icon @click="createSourceDialog = false")
              v-icon mdi-close
          v-card-text
            v-text-field(
              v-model="newSource.name"
              label="Source Name"
              hide-details="auto"
            )
            .d-flex.align-end
              v-text-field.mr-2(
                v-model="newSource.amount"
                label="Amount"
                type="number"
                hide-details="auto"
              )
              v-btn-toggle(v-model="newSource.type" mandatory dense)
                v-btn Expense
                v-btn Income
            v-select(
              v-model="newSource.regularity"
              label="Regularity"
              :items="regularities"
              hide-details="auto"
            )
            v-menu
              template(v-slot:activator="{ on, attrs }")
                v-text-field(
                  v-model="newSource.date"
                  label="An Occurrence Date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                )
              v-date-picker(
                v-model="newSource.date"
                no-title
              )
            v-btn(
              color="primary"
              dark
              block
              @click="createNewSource"
            ) Create
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import WidthSetter from '../components/WidthSetter.vue'

export default {
  components: {
    WidthSetter
  },
  data: () => ({
    createSourceDialog: false,
    newSource: {},
    regularities: [
      'annually',
      'semi-annually',
      'quarterly',
      'monthly',
      'semi-monthly',
      'bi-weekly',
      'weekly',
      'daily'
    ]
  }),
  computed: {
    ...mapGetters([
      'page'
    ])
  },
  methods: {
    ...mapMutations([
      'setAdditionalBreadcrumbs',
      'setPage',
      'createSource',
      'editSource',
      'removeSource'
    ]),
    init() {
      let id = this.$route.params.pageId
      this.setPage(id)
      this.setAdditionalBreadcrumbs([
        {
          text: this.page ? this.page.name : 'Not Found',
          to: `/page/${id}`
        },
        {
          text: 'Sources'
        }
      ])
    },
    resetNewSource () {
      this.newSource = {
        name: undefined,
        amount: undefined,
        type: undefined,
        regularity: undefined,
        date: undefined
      }
    },
    createNewSource() {
      let n = this.newSource
      let data = {
        name: n.name,
        amount: Math.abs(n.amount) * (n.type ? -1 : 1),
        regularity: n.regularity,
        date: n.date
      }
      this.createSource({pageId: page.id, data: data})
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