React-MainLoop
==============

A React Component that runs a game loop.

## Why
I wanted a way to animate a canvas-based app with [React ART](https://github.com/reactjs/react-art).

## How
Using [Isaac Sukin's](http://www.isaacsukin.com/) excellent [MainLoop.js library](https://github.com/IceCreamYou/MainLoop.js).

To read more about game loops, you can read [Isaac's excellent blog post](http://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing) or the [Game Loop chapter](http://gameprogrammingpatterns.com/game-loop.html) of Robert Nystrom's book [Game Programming Patterns](http://gameprogrammingpatterns.com/).

### Why isn't this a mixin?
I favour composition. See [this blog post](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) which explains much better than I could why this is favourable.

### What's with using `forceUpdate()`?
**Isn't that against best practice?**
Yes, but it gives me greater control of when `render` gets called in the loop cycle. Please raise an issue if you can think of a better way!

## How to use

All examples use [ES6 syntax](https://github.com/lukehoban/es6features).

```detailed-explanation-javascript-game-loops-and-timing
import Animator from 'react-mainloop';

const FPS = 30,
      MAX_FPS = 60;

const animate = new Animator(FPS, MAX_FPS);

const update = (delta) => {
  /* ... */
  return props;
};

const MyAnimatedComponent = animate(MyComponent, update);

React.render(<MyAnimatedComponent />, document.getElementById('someID'));

```

## API

`import Animator from 'react-mainloop';`

### `Animator`

Creates a function that wraps a React component with an animator for the given FPS settings.

`const animate = new Animator(fps, maxFPS);`

**Params**
- **timestep** `number` *optional* - Sets how many milliseconds should be simulated by every run of `update()`. *Default: `1000 / 60`* ([reference](https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setSimulationTimestep))
- **maxFPS** `number` *optional* - Limit the maximum FPS. *Default: `60`* ([reference](https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setMaxAllowedFPS))

**Returns**
- **animate()** `function` - Used to animate a React component.

### `animate()`

Wraps a given React component in an `Animate` component, which controls the `props` for the given component.

`const MyAnimatedComponent = animate(Component, update);`

**Params**
- **Component** `ReactComponent` - The component to wrap and animate.
- **update()** `function` - Takes the time since the last update and returns the next set of `props` for `Component`.

**Returns**
- **AnimatedComponent** `ReactComponent` - A normal React component, but animated!

### `update()`

The function that runs updates (e.g. AI and physics).

The `update()` function should simulate anything that is affected by time. It can be called zero or more times per frame depending on the frame rate.

See [MainLoop.setUpdate()](https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setUpdate).

```
function update(delta) {
  /* ... */
  return props;
}
```

**Params**
- **delta** `number` - The amount of time in milliseconds to simulate in the update.

**Returns**
- **props** `object` - The next set of props to feed your component.

### `AnimatedComponent`
Returned from `animate()`. A normal React component, but animated!

All supplied props will be passed through to the wrapped component.

```<AnimatedComponent thisProp="getsPassedThrough" />```

**props**
- **run** `boolean` *optional* - Animate if `true`. *Default: `true`*

# License
[Eclipse Public License v1.0](LICENSE)
