React-MainLoop
==============

```javascript
import animate from 'react-mainloop';

const MyAnimatedComponent = animate(MyComponent, (delta) => {
  /* ... */
  return props;
});

React.render(<MyAnimatedComponent />, document.getElementById('someID'));

```
