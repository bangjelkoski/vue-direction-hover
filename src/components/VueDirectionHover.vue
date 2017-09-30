<template>
    <div class="direction-hover">
        <slot :options="options"></slot> <!-- to include the Items here -->
    </div>
</template>

<script>

export default {
  name: 'VueDirectionHover',

  data () {
    return {
     
      options: {
          speed: 300, // Transitions in miliseconds 
          easing: 'ease', // Animation type: (ease, ease-in, ease-in-out, ease-out-in, ease-out, linear ...)
          hoverDelay: 0, // Delay in miliseconds
      }

    }
  },

}
</script>

<style scoped>


</style>