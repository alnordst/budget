<template lang="pug">
  span {{result}}
</template>

<script>
import { mapGetters }

export default {
  computed: {
    ...mapGetters('pages', [
      'data
    ]),
    result () {
      return 0 //todo
    }
  }
}