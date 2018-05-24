<template>
  <q-page class="flex flex-center">
	<q-card class="row">
	<q-card-title class="row">Subnet Mask Calculator</q-card-title>
	<q-card-main><br/>
	<div class="row">
	<q-input v-model="text" float-label="Subnet mask / length" />
	</div>
	</q-card-main>
	</q-card>

	<q-card class="row">
	<q-card-title>IP Subnet Range</q-card-title>
	<q-card-main>

	</q-card-main>
	</q-card>
</q-page>
</template>

<style>
</style>

<script>

export default {
  name: 'PageTools'
}
</script>
