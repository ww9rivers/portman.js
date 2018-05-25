<template>
  <q-page class="flex flex-center">
	<q-card color="blue-1" text-color="blue-9" style="width:98%">
	<q-card-title>Subnet Mask Calculator</q-card-title>
	<q-card-main>
		<q-input float-label="Subnet mask / length" v-model="mask1"/>
	</q-card-main>
	<q-card-actions>
		<q-btn flat icon="play_circle_outline" class="q-mr-md" @click="compute_mask"/>
		<q-field :label="result1" :error="mask1err" class="no-wrap items-end" style="width:80%"/>
	</q-card-actions>
	</q-card>

	<q-card color="green-2" text-color="green-9" style="width:98%">
	<q-card-title>IP Subnet Range</q-card-title>
	<q-card-main>
	<q-input v-model="net" float-label="Subnet address" /><br/>
	<q-input v-model="mask2" float-label="Subnet mask" />
	</q-card-main>
	<q-card-actions>
		<q-btn flat icon="play_circle_outline" class="q-mr-md" @click="subnet_range"/>
		<q-field :label="result2" :error="err2" class="no-wrap items-end" style="width:80%"/>
	</q-card-actions>
	</q-card>
</q-page>
</template>

<style>
</style>

<script>
function int2ip (ipInt) {
	return ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) );
}

function ip2int(ip) {
	return ip.split('.').reduce((ipInt, octet) => {
		return (ipInt<<8) + parseInt(octet, 10)
	}, 0) >>> 0;
}

function ip_mask (ipmask) {
	let mask = 0
	if (ipmask.startsWith('/')) {
		let len = parseInt(ipmask.substr(1))
		if (isNaN(len)) { return len }
		for (let bit = 0x80000000; len > 0; len--) {
			mask |= bit
			bit >>= 1
		}
		console.log("Compute mask."+ipmask+' ('+mask+')')
		return mask
	}
	// assuming dotted-quard format
	let ipint = ip2int(ipmask)
	console.log("Compute mask."+ipmask+' ('+ipint+')')
	for (; ipint != 0; ipint <<= 1) {
		mask++;
	}
	console.log("ipint = "+ipint)
	return mask
}

export default {
  name: 'PageTools',
  data () {
	return {
		mask1: "/24",
		result1: "255.255.255.0",
		mask1err: false,
		net: "192.168.89.0",
		mask2: "/24",
		err2: false,
		result2: ""
	}
  },
  methods: {
	compute_mask () {
		let mask = ip_mask(this.mask1)
		if (isNaN(mask)) {
			this.mask1err = true
			this.result1 = 'Invalid net mask'
			return
		}
		this.mask1err = false
		if (this.mask1.startsWith('/')) {
			this.result1 = int2ip(mask)
		} else { // assuming dotted-quard format
			this.result1 = '/'+mask
		}
	},
	subnet_range () {
		let net = ip2int(this.net)
		let mask = this.mask1.startsWith('/') ? ip_mask(this.mask2) : ip2int(this.mask2)
		this.result2 = int2ip(net&mask)+" ~ "+int2ip(net|(mask^0xFFFFFFFF))
	}
  }
}
</script>
