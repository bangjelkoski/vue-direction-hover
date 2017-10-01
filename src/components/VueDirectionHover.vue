<template>
    <div id="dh__container">
    	<slot></slot>
    </div>
</template>

<script>
export default {
  name: 'VueDirectionHover',

  data () {
   return {
  	   options: {
  	   	   container: 'body', 
  	   	   transition: 'linear', 
  	   	   speed: '300', 
	   },
	}
  },
  props: ['settings'],
  created () {
  	this.options = this.settings;
  }
}
</script>

<style scoped>


</style>