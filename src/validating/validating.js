import React from 'react';
import PropTypes from 'prop-types';

/**
 * Higher order component that adds value validation to the WrappedComponent
 * onBlur and onChange
 * 
 * @param {any} WrappedComponent Component to wrap with value validation
 * @returns {any}
 */
function validating(WrappedComponent) {
  class ValidatingComponent extends React.Component {

    render() {
      const {
        checkerOnChange,
        modifierOnChange,
        modifierOnBlur,
        onChange,
        ...passThroughProps
      } = this.props;

      return (
        <WrappedComponent
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          {...passThroughProps}/>
      );
    }

    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
      this.updateValue = this.updateValue.bind(this);
    }

    handleChange(event, value) {
      let newValue = value === undefined ?  event.target.value : value;
      if (!this.props.checkerOnChange(newValue)) { return; }

      newValue = this.props.modifierOnChange(newValue);
      this.updateValue(event, newValue);
    }

    handleBlur(event) {
      const oldValue = event.target.value;
      const newValue = this.props.modifierOnBlur(oldValue);
      if (oldValue !== newValue) {
        this.updateValue(event, newValue);
      }
    }

    updateValue(event, newValue) {
      if (this.props.onChange) {
        this.props.onChange(event, newValue, this.props.name);
      }
    }
  }

  ValidatingComponent.propTypes = {
    ...WrappedComponent.propTypes,
    name: PropTypes.string,
    onChange: PropTypes.func,
    checkerOnChange: PropTypes.func.isRequired,
    modifierOnChange: PropTypes.func.isRequired,
    modifierOnBlur: PropTypes.func.isRequired
  };

  ValidatingComponent.defaultProps = {
    ...WrappedComponent.defaultProps,
    checkerOnChange: () => true,
    modifierOnChange: s => s,
    modifierOnBlur: s => s
  }
  
  return ValidatingComponent;
}

export default validating;
