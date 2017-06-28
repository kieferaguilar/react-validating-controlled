import React from 'react';
import PropTypes from 'prop-types';

/**
 * Higher order component that adds value control to the WrappedComponent
 * 
 * @param {any} WrappedComponent Component to wrap with value control
 * @returns {any}
 */
function controlled(WrappedComponent) {
  class ControlledComponent extends React.Component {

    render() {
      const {
        initialValue,
        onChange,
        ...passThroughProps
      } = this.props;

      return (
        <WrappedComponent
          value={this.state.value || ControlledComponent.emptyValue()}
          onChange={this.handleChange}
          {...passThroughProps}/>
      );
    }

    constructor(props) {
      super(props);
      this.state = {
        value: this.props.initialValue
      };

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
      const newValue = value === undefined ?  event.target.value : value;
      this.setState({value: newValue});
      if (this.props.onChange) {
        this.props.onChange(event, newValue, this.props.name);
      }
    }
  }

  ControlledComponent.propTypes = {
    ...WrappedComponent.propTypes,
    initialValue: WrappedComponent.propTypes.value,
    name: PropTypes.string,
    onChange: PropTypes.func
  };

  ControlledComponent.defaultProps = WrappedComponent.defaultProps;

  ControlledComponent.emptyValue = WrappedComponent.emptyValue ?
    WrappedComponent.emptyValue : (() => "");
  
  return ControlledComponent;
}

export default controlled;
