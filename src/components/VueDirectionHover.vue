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
  	   	   container: '', 
  	   	   transition: '', 
  	   	   speed: '', 
	   },
	}
  },
  props: {
      container: {
          default: 'body', 
          type: String,
      },
      transition: {
          default: 'linear',
          type: String,
      },
      speed: {
          default: 300,
          type: Number
      }
  },
  created () {
    this.options.container = this.container;
    this.options.transition = this.transition;
  	this.options.speed = this.speed;
  }
}
</script>

<style scoped>


</style>