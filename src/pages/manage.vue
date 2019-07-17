<template>
  <q-page class="flex content-start">
    <div class="row gutter self-baseline">
    <q-label style="padding:.5em">Switch IP address:</q-label>
    <q-input v-model="terms"
      class="mgr"
      placeholder="Ex.: 10.50....">
      <q-autocomplete
        @search="search"
        @selected="selected"
        :min-characters="2"
	:max-results="8"
      />
    </q-input>
    </div>
  </q-page>
</template>

<style>
.mgr: {
      color: '#00274c'	// UM blue
}
</style>

<script>
import { fuzzysearch } from "fuzzysearch"
import { filter } from 'quasar'

function get_switches () {
  return [
    { ip: '10.11.22.33', name: 'Switch-1' },
    { ip: '10.12.22.23', name: 'Switch-2' },
    { ip: '10.13.22.34', name: 'Switch-3' }
  ].map(a => { return { ip:a.ip, label:a.ip, value:a.name }})
}

function input_filter (terms, it) {
    const token = terms.toLowerCase();
    return it.list.filter(item => fuzzysearch(token, item[it.field].toLowerCase()));
}

export default {
  data () {
    return {
      terms: '',
      switches: get_switches()
    }
  },
  methods: {
    search (terms, done) {
      setTimeout(() => {
        done(filter(terms, { field: 'ip', list: get_switches() }))
      }, 60)
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.ip}"`)
    }
  }
}
</script>