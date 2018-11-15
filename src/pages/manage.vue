<template>
  <q-page class="flex flex-center">
    <!-- Binds to parent QInput -->
    <q-label>Switch IP address:&nbsp;</q-label>
    <q-input v-model="terms" color="#00274c" placeholder="Ex.: 10.50...."/>
      <q-autocomplete @search="search"
        :min-characters="3"
        @selected="selected"
      />
    </q-input>

    <!-- Binds to parent QSearch -->
    <q-search v-model="terms" placeholder="Start typing a country name">
      <q-autocomplete @search="search" @selected="selected" />
    </q-search>

    <!-- Adds a separator between results -->
    <q-search v-model="terms">
      <q-autocomplete
        separator
        @search="search"
        @selected="selected"
      />
    </q-search>

    <!-- Binds to parent QChipsInput -->
    <q-chips-input v-model="terms" placeholder="Start typing a country name">
      <q-autocomplete @search="search" @selected="selected" />
    </q-chips-input>
  </q-page>
</template>

<style>
</style>

<script>
</script>