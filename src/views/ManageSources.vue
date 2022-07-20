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
          :color="item.active ? '' : 'grey lighten-4'"
          @click="openEdit(item.id)"
        )
          v-card-text(:class="item.active ? '' : 'grey--text text--lighten-1'")
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
        v-btn(
          color="primary"
          block
          dark
          @click="openCreate"
        ) Create New Source
  v-dialog(v-model="dialog" width="500" persistent)
    v-card
      v-card-title.d-flex.justify-space-between
        span(v-if="mode === 'create'") Create Source
        span(v-if="mode === 'edit'") Edit Source
        v-btn(icon @click="dialog = false")
          v-icon mdi-close
      v-card-text
        v-text-field(
          v-model="input.name"
          label="Source Name"
          hide-details="auto"
        )
        .d-flex.align-end
          v-text-field.mr-2(
            v-model="input.amount"
            label="Amount"
            type="number"
            hide-details="auto"
          )
          v-btn-toggle(v-model="input.type" mandatory dense)
            v-btn Expense
            v-btn Income
        v-select(
          v-model="input.regularity"
          label="Regularity"
          :items="regularities"
          hide-details="auto"
        )
        v-menu
          template(v-slot:activator="{ on, attrs }")
            v-text-field(
              :value="inputFormattedDate"
              label="Occurrence Date"
              readonly
              v-bind="attrs"
              v-on="on"
              hide-details="auto"
              hint="Provide a single date (past or future) on which the bill occurs."
              persistent-hint
            )
          v-date-picker(
            v-model="input.date"
            no-title
          )
        v-checkbox(
          v-model="input.active"
          label="Active"
          hide-details="auto"
        )
        .d-flex.mx-n1.mt-2
          v-btn.ma-1.flex-grow-1(
            v-if="mode === 'edit'"
            color="primary"
            dark
            @click="edit"
          ) Edit Source
          v-btn.ma-1.flex-grow-1.white--text(
            v-if="mode === 'edit'"
            color="red"
            @click="del"
          ) Delete Source
          v-btn.ma-1.flex-grow-1(
            v-if="mode === 'create'"
            color="primary"
            dark
            @click="create"
          ) Create Source
          v-btn.ma-1.flex-grow-1(
            @click="dialog = false"
          ) Cancel
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters, mapMutations } from 'vuex'
import WidthSetter from '../components/WidthSetter.vue'

export default {
  components: {
    WidthSetter
  },
  data: () => ({
    dialog: false,
    input: {},
    mode: undefined, // 'edit' OR 'create'
    selectedSourceId: undefined,
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
    ]),
    selectedSource() {
      return this.page.sources.find(it => it.id == this.selectedSourceId)
    },
    inputFormattedDate() {
      if(this.input.date)
        return dayjs(this.input.date).format('dddd, MMMM D, YYYY')
      return null
    },
    fixedInput() {
      return {
        name: this.input.name,
        amount: Math.abs(this.input.amount) * (this.input.type ? -1 : 1),
        regularity: this.input.regularity,
        date: this.input.date,
        active: this.input.active
      }
    }
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
          to: `/page/${id}`,
          exact: true
        },
        {
          text: 'Sources'
        }
      ])
    },
    openEdit(id) {
      this.mode = 'edit'
      this.selectedSourceId = id
      this.input = {
        name: this.selectedSource.name,
        amount: Math.abs(this.selectedSource.amount),
        type: this.selectedSource.amount > 0 ? 1 : 0,
        regularity: this.selectedSource.regularity,
        date: this.selectedSource.date,
        active: this.selectedSource.active
      }
      this.dialog = true
    },
    openCreate() {
      this.mode = 'create'
      this.input = {
        name: undefined,
        amount: undefined,
        type: undefined,
        regularity: undefined,
        date: undefined,
        active: true
      }
      this.dialog = true
    },
    edit() {
      this.editSource({
        pageId: this.page.id,
        sourceId: this.selectedSourceId,
        data: this.fixedInput
      })
      this.dialog = false
    },
    del() {
      this.deleteSource({
        pageId: this.page.id,
        sourceId: this.selectedSourceId
      })
    },
    create() {
      this.createSource({
        pageId: this.page.id,
        data: this.fixedInput
      })
      this.dialog = false
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