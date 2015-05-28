import React from 'react';
import MainLoop from 'mainloop.js';

const FPS = 60;
const TIMESTEP = 1000 / FPS;
const MAX_FPS = 60;

/**
 * A wrapper to animate a given component.
 * All props are passed down to the child component.
 * The update callback takes the elapsed time (in milliseconds) since the last update,
 * and returns the props for the animated component.
 *
 * @param  {ReactComponent} AnimatedComponent
 * @param  {function} update
 * @return {ReactComponent} An animated version of the given component.
 */
export default (timestep = TIMESTEP, maxFPS = MAX_FPS) => (AnimatedComponent, update) => {

  class Animator extends React.Component {

    constructor(props) {
      super(props);
      this.update = this.update.bind(this);
      this.endOfFrame = this.endOfFrame.bind(this);

      const loop = MainLoop
        .setMaxAllowedFPS(maxFPS)
        .setSimulationTimeStep(timestep)
        .setUpdate(this.update)
        .setDraw(this.forceUpdate)
        .setEnd(this.endOfFrame);

      this.state = {
        loop,
        animatedProps: {}
      };
    }

    componentDidMount() {
      if (this.props.run) {
        this.state.loop.start();
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

    update(delta) {
      this.setState({
        animatedProps: update(delta)
      });
    }

    endOfFrame(/*fps*/_, panic) {
      if (panic) {
        this.state.loop.resetFrameDelta();
      }
    }

    render() {
      return (
        <AnimatedComponent
          {...this.props}
          {...this.state.animatedProps}
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

  return Animator;
};
