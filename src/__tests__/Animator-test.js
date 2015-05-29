
/*global describe*/
/*global it*/
/*global after*/
// global afterEach
/*global expect*/

import React from 'react/addons';
import Animator from '../Animator.jsx';

const TestUtils = React.addons.TestUtils;

const animate = new Animator();

const SimpleComponent = React.createClass({
  render: function(){
    return (
      <div></div>
    );
  }
});

describe('Animator', function() {

  describe('animate()', function() {

    it('should successfully create a renderable component', function() {
      let component = null;
      after(function() {
        React.unmountComponentAtNode(React.findDOMNode(component).parentNode);
      });

      expect(() => {
        const AnimatedSimpleComponent = animate(SimpleComponent, () => {});
        component = TestUtils.renderIntoDocument(<AnimatedSimpleComponent />);
      }).to.not.throw();
    });
  });
});
