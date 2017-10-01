<template>
      <div class="dh__item">
          <div class="dh__overlay">Image Caption Here</div>
      </div>    
</template>

<script>
import Helpers from '../helpers/helpers'

export default {
  name: 'VueDirectionHoverItem',

  data () {
    return {

      options: {
        item: '.dh__item', // The Item Element
        container: '#content', // The Container of the items (should be the most root element that contains the items)
        overlay: '.dh__overlay', // The Overlay Element inside the item
        transition: 'easeInOutCubic',    // Transition Type
        speed: 300,  // Transition Speed
      },

    }
  },
  mounted () {
    var item = this.$el
    var child = item.querySelector(this.options.overlay)

    // Set Initial CSS Attributes to the Item
    item.style.position = 'relative'
    item.style.overflow = 'hidden'

    // Set Initial CSS Attributes to the overlay
    child.style.position = 'absolute'
    child.style.top = '-' + item.offsetHeight + 'px'
    child.style.left = '-' + item.offsetWidth + 'px'

    var self = this
    // Add the Events
    item.addEventListener('mouseenter', function (e) {
        // Get the target and the Overlay
      child = self.$el.querySelector(self.options.overlay)
      item = self.$el

        // If they are in a container (fix for if you want to have the effect in lets say container that isnt 100% width)
      var parent = document.querySelector(self.options.container)
      var ex = e.pageX - parent.offsetLeft
      var ey = e.pageY - parent.offsetTop

        // On entering with the mouuse, initialize the 'in' effect (sliding in)
      Helpers.slideOverlay(child, 'in', ex, ey, item.offsetWidth, item.offsetHeight,
            Math.floor(item.offsetLeft), item.offsetTop, self.options)
    })
    item.addEventListener('mouseleave', function (e) {
        // Get the target and the Overlay
      child = self.$el.querySelector(self.options.overlay)
      item = self.$el

        // If they are in a container (fix for if you want to have the effect in lets say container that isnt 100% width)
      var parent = document.querySelector(self.options.container)
      var ex = e.pageX - parent.offsetLeft
      var ey = e.pageY - parent.offsetTop

        // On entering with the mouuse, initialize the 'out' effect (sliding out)
      Helpers.slideOverlay(child, 'out', ex, ey, item.offsetWidth, item.offsetHeight,
            Math.floor(item.offsetLeft), item.offsetTop, self.options)
    })
  },
}
</script>

<style scoped>
  .dh__item{
    margin: 15px;
    width: 22.5%;
    box-sizing: border-box;
    height: 300px;
    background: black;
    float: left;
    background-image: url(https://unsplash.it/400/300?image=180);
  }
  .dh__overlay{
    background: rgba(52,73,94,.9);
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 300px;
    color: #fff;
    position: absolute;
  }
</style>