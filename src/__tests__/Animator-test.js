
import React from 'react';
import reactdom from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Animator from '../Animator.jsx';

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
        reactdom.unmountComponentAtNode(reactdom.findDOMNode(component).parentNode);
      });

      expect(() => {
        const AnimatedSimpleComponent = animate(SimpleComponent, () => {});
        component = TestUtils.renderIntoDocument(<AnimatedSimpleComponent />);
      }).to.not.throw();
    });
  });
});
