import React from 'react';
import MainLoop from 'mainloop.js/build/mainloop.min.js';

const FPS = 60;
const TIMESTEP = 1000 / FPS;
const MAX_FPS = 60;

const noop = () => {};

/**
 * A wrapper to animate a given component.
 * All props are passed down to the child component.
 *
 * The getUpdate callback takes a reference to the animated component's backing instance,
 * and returns the update function.
 *
 * The update function takes the elapsed time (in milliseconds) since the last update,
 * and returns the props and context for the animated component.
 *
 * @param  {ReactComponent} AnimatedComponent
 * @param  {function} updateF
 * @return {ReactComponent} An animated version of the given component.
 */
export default (timestep = TIMESTEP, maxFPS = MAX_FPS) => (AnimatedComponent, updateF, beginF) => {

  class Animator extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        animatedProps: {}
      };
    }

    componentDidMount() {
      const begin = beginF || noop,

            update = (delta) => {
              const {context, props} = updateF(delta);
              this.setState({
                context,
                animatedProps: props
              });
            },

            draw = (/* interpolationPercentage */) => this.forceUpdate(),

            endOfFrame = (/*fps*/_, panic) => {
              // TODO let user supply callback for this
              if (panic) {
                loop.resetFrameDelta();
              }
            },

            loop = MainLoop
              .setMaxAllowedFPS(maxFPS)
              .setSimulationTimestep(timestep)
              .setBegin(begin)
              .setUpdate(update)
              .setDraw(draw)
              .setEnd(endOfFrame);

      this.setState({
        loop,
        animatedProps: {}
      });

      if (this.props.run) {
        loop.start();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.run) {
        this.state.loop.start();
      } else {
        this.state.loop.stop();
      }
    }

    shouldComponentUpdate() {
      // doesn't affect initial render
      return false; // take control of when we render using forceUpdate
    }

    componentWillUnmount() {
      this.state.loop.stop();
    }

    getChildContext() {
      return {
         animContext: this.state.context
      };
    }

    render() {
      return (
        <AnimatedComponent ref='animated'
          {...this.props}
          {...this.state.animatedProps}
          context={this.state.context}
        />
      );
    }
  }

  Animator.propTypes = {
    run: React.PropTypes.bool
  };

  Animator.defaultProps = {
    run: true
  };

  Animator.childContextTypes = {
    animContext: React.PropTypes.any
  };

  return Animator;
};
