<template>
      <div :class="['dh__item', itemClass]">
        <a :href="link" :target="target ? '_blank' : '_self'">
            <img :src="image" class="dh__image"/>
            <div class="dh__overlay">
                  <slot name="overlay"></slot>
            </div>
        </a>
      </div>    
</template>

<script>
import Helpers from '../helpers/helpers'

export default {
  name: 'VueDirectionHoverItem',

  data () {
    return {
      options: {
        item: '.dh__item',
        container: '',
        overlay: '.dh__overlay',
        transition: '',
        speed: '',
      },
    }
  },
  props: {
    link: {
        type: String,
        default: '#',
    },
    image: {
        type: String,
        default: '/',
    },
    target: {
        type: Boolean,
        default: true
    },
    itemClass: {
      type: String,
      default: '', 
    },
  },
  methods: {
    getOptions(parent){
        this.options.transition = parent.options.transition;
        this.options.speed = parent.options.speed;
        this.options.container = parent.options.container;
    }
  },
  mounted () {
    this.getOptions(this.$parent);
    var item = this.$el
    var child = item.querySelector(this.options.overlay)

    // Set Initial CSS Attributes to the overlay
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
    position: relative;
    overflow: hidden;
    width: 33%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    float: left;
  }
  .dh__item img {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .dh__overlay{
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    text-align: center;
  }
</style>