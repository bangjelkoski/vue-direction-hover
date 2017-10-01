# Vue Component - Direction Hover Effect

Vue.js Component for the Direction Hover Effect. You can see a demo here: <a href="https://bojanxmk.github.io/vue-direction-hover/demo" target="_blank">DEMO</a> <br/>
I'd like to thank: <a href="https://github.com/codrops/DirectionAwareHoverEffect" target="_blank">DirectionAwareHoverEffect</a> for the inspiration in making this component.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [License](#license)
- [TODO](#todo)

# Installation

```
npm install vue-direction-hover --save-dev
```

Import the main component:

```javascript
import Vue from 'vue'
import VueDirectionHover from 'vue-direction-hover'

Vue.use(VueDirectionHover)
```

# Usage
In order to use this component, you need to include the tags in your project. For example: 
```HTML
<vue-dh>
  <vue-dh-item></vue-dh-item>
  <vue-dh-item></vue-dh-item>
  <vue-dh-item></vue-dh-item>
</vue-dh>
```
The above example wont show anything since you havent added any content into the items. <br/>
There are few props you can add to your `<vue-dh-item></vue-dh-item>` tag:

| Name        | Type          | Default  | Description                  |
| ---         | ---           | ---      | ---                          |
| link        | String        | '#'      | Link of the item.            |
| image       | String        | ''       | Image of the item            |
| target      | Boolean       | true     | true: _blank, false: _self   |
| item-class  | String       | ''      | Additional class of the item |

You can also custom `overlay` slot in `vue-dh-item`:
```HTML
<vue-dh-item>
  <div slot="overlay">Any HTML you want.</div>
</vue-dh-item>
```

Also, you can add custom options for the `<vue-dh></vue-dh>` tag as well:

| Name             | Type          | Default        | Description                   |
| ---              | ---           | ---            | ---                           |
| container        | String        | 'body'         | Container holding the items.  |
| transition       | String        | 'linear'       | Transition type               |
| speed            | Number        | 300            | Speed of the transition       |

And you can add it like this:
`<vue-dh :container="'body'" :transition="'linear'" :speed="300">`

Read why you might need container sometimes [HERE](#container).<br/>
Find all available transitions [HERE](#transitions).

# Example
Here is an example use with minimal options
```html
<vue-dh>
  <vue-dh-item v-for="item in items" :key="'item-' + id" :link="item.link" :image="item.image">
  	<div slot="overlay"> {{ item.title }} </div>
  </vue-dh-item>
</vue-dh>
```

Here is an example use with all the options
```html
<vue-dh :container="'#content'" :transition="'easeInElastic'" :speed="500">
  <vue-dh-item v-for="item in items" :key="'item-' + id" :link="item.link" :image="item.image" :item-class="'additionalClass'">
  	<div slot="overlay">
  		<h1>{{ item.title }}</h1>
  		<p>{{ item.description }} </p>
  	</div>
  </vue-dh-item>
</vue-dh>
```

# Container
So the question is when to modify the container property? Lets say that you have a page that has sidebar (30% of the page), and main content (70%) of the content. Then, in order for this plugin to work, you must change the container to `.main-content`, because if you havent do that, than the position of the in/out animations will be relative to the body of the page, and not to the content. <br/>
Tldr; use this when you are not rendering the items in a container that is not 100% width (container.width = body.width);

# Transitions
List of all available transitions: 
```
linear
easeInQuad | easeOutQuad | easeInOutQuad 
easeInCubic | easeOutCubic | easeInOutCubic 
easeInQuart | easeOutQuart | easeInOutQuart
easeInQuint | easeOutQuint | easeInOutQuint 
easeInElastic | easeOutElastic | easeInOutElastic
```

# TODO
Maybe add more settings?

## License

[MIT](http://opensource.org/licenses/MIT)
