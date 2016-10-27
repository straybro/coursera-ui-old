import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

/**
 * A HOC to detect the window's scroll direction and position
 * then pass the information to the child component
 * Check 'SmartScrollWrapper' for example
 */

const withScrollInfo = ({delta = 5}) => {
  return (Component) => {
    const componentName = Component.displayName || Component.name || 'Component';
    class HOC extends React.Component {
      static displayName = `withScrollInfo(${componentName})`;

      static propTypes = {
        delta: React.PropTypes.number,
      }

      state = {
        isScrollingDown: true,
        lastScrollPosition: 0,
        didScroll: false,
      }


      componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
      }

      shouldComponentUpdate(nextProps, {lastScrollPosition, isScrollingDown}) {
        return lastScrollPosition !== this.state.lastScrollPosition ||
          isScrollingDown !== this.state.isScrollDown;
      }

      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      }

      handleScroll = () => {
        const newScrollPosition = document.body.scrollTop;
        const {lastScrollPosition} = this.state;
        // Only update state if the scroll has reached delta.
        const scrollDifference = Math.abs(lastScrollPosition - newScrollPosition);
        // Prioritize prop delta over HOC delta.
        const deltaLocal = this.props.delta || delta;
        if (scrollDifference < deltaLocal) return;

        const isScrollingDown = lastScrollPosition <= newScrollPosition;
        this.setState({
          didScroll: true,
          isScrollingDown,
          lastScrollPosition: newScrollPosition,
        });
      }

      render() {
        return (
          <Component
            {...this.props}
            {...this.state}
          />
        );
      }
    }

    hoistNonReactStatic(Component, HOC);

    return HOC;
  };
};


export default withScrollInfo;