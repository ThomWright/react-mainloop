React-MainLoop
==============

```javascript
import Animator from 'react-mainloop';

const FPS = 30,
      MAX_FPS = 60;

const animate = Animator(FPS, MAX_FPS);

const update = (delta) => {
  /* ... */
  return props;
};

const MyAnimatedComponent = animate(MyComponent, update);

React.render(<MyAnimatedComponent />, document.getElementById('someID'));

```
