
DISCLAIMER
==========

**This library isn't production-ready. It needs testing.**


React-MainLoop
==============

[![Travis](https://img.shields.io/travis/ThomWright/react-mainloop.svg?style=flat-square)](https://travis-ci.org/ThomWright/react-mainloop)
[![npm](https://img.shields.io/npm/v/react-mainloop.svg?style=flat-square)](https://www.npmjs.com/package/react-mainloop)
[![David](https://img.shields.io/david/ThomWright/react-mainloop.svg?style=flat-square)](https://david-dm.org/ThomWright/react-mainloop)
[![David](https://img.shields.io/david/dev/ThomWright/react-mainloop.svg?style=flat-square)](https://david-dm.org/ThomWright/react-mainloop#info=devDependencies)

A React Component that runs a game loop.

## Why
I wanted a way to animate a canvas-based app with [React ART](https://github.com/reactjs/react-art).

## How
Using [Isaac Sukin's](http://www.isaacsukin.com/) excellent [MainLoop.js library](https://github.com/IceCreamYou/MainLoop.js).

To read more about game loops, you can read [Isaac's excellent blog post](http://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing) or the [Game Loop chapter](http://gameprogrammingpatterns.com/game-loop.html) of Robert Nystrom's book [Game Programming Patterns](http://gameprogrammingpatterns.com/).

#### Why isn't this a mixin?
I favour composition. See [this blog post](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) which explains much better than I could why this is favourable.

#### What's with using `forceUpdate()`?
**Isn't that against best practice?**
Yes, but it gives me greater control of when `render` gets called in the loop cycle. Please raise an issue if you can think of a better way!

## How to use

All examples use [ES6 syntax](https://github.com/lukehoban/es6features).

```javascript
import Animator from 'react-mainloop';

const TIMESTEP = 1000 / 60,
      MAX_FPS = 60;

const animate = new Animator(TIMESTEP, MAX_FPS);

const getUpdate = (ref) => (delta) => {
  /* ... */
  return {
    context,
    props
  };
};

const MyAnimatedComponent = animate(MyComponent, getUpdate);

React.render(<MyAnimatedComponent />, document.getElementById('someID'));

```

## API

```javascript
import Animator from 'react-mainloop';
```

### `Animator`

Creates a function that wraps a React component with an animator for the given FPS settings.

```javascript
const animate = new Animator(timestep, maxFPS);
```

**Params**
- **timestep** `number` *optional* - Sets how many milliseconds should be simulated by every run of `update()`. *Default: `1000 / 60`* ([reference](https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setSimulationTimestep))
- **maxFPS** `number` *optional* - Limit the maximum FPS. *Default: `60`* ([reference](https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setMaxAllowedFPS))

**Returns**
- **animate()** `function` - Used to animate a React component.

### `animate()`

Wraps a given React component in an `Animate` component, which controls the `props` and `context` for the given component.

```javascript
const MyAnimatedComponent = animate(Component, getUpdate);
```

**Params**
- **Component** `ReactComponent` - The component to wrap and animate.
- **getUpdate()** `function` - Takes a reference to the backing instance of the animated component and returns the `update()` function. It is called after the component is mounted.

**Returns**
- **AnimatedComponent** `ReactComponent` - A normal React component, but animated!

### `getUpdate()`
*User-supplied*

Returns the `update()` function.

```javascript
const getUpdate = (ref) => (delta) => {
  /* has access to the component instance being animated using ref */
  return {
    context,
    props
  };
};
```

**Params**
- **ref** `ReactComponent instance` - The running instance of the animated component.

**Returns**
- **update()** `function` - Takes the time since the last update and returns the next set of `props` for `Component`.

**See**
[React refs docs](https://facebook.github.io/react/docs/more-about-refs.html)

### `update()`
*User-supplied*

Runs updates (e.g. AI and physics).

The `update()` function should simulate anything that is affected by time. It can be called zero or more times per frame depending on the frame rate.

Both `props` and `context` can be returned.

See [MainLoop.setUpdate()](https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setUpdate).

```javascript
function update(delta) {
  /* ... */
  return {
    context,
    props
  }
}

```

**Params**
- **delta** `number` - The amount of time in milliseconds to simulate in the update.

**Returns**
- **context** `object` - The next context properties to feed your component. This will be saved in `context.animContext`.
- **props** `object` - The next set of props to feed your component.

**See**
[Introductin to Contexts in React.js](https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html)

### `AnimatedComponent`
Returned from `animate()`. A normal React component, but animated!

All supplied props will be passed through to the wrapped component.

```javascript
<AnimatedComponent thisProp="getsPassedThrough" />
```

**props**
- **run** `boolean` *optional* - Animate if `true`. *Default: `true`*

# License
[Eclipse Public License v1.0](LICENSE)
