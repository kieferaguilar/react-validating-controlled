import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import validatingControlled from './validatingControlled';

let Wrapped, ValidatingController;

function setup() {
  Wrapped = (props) => {
    return <div {...props}/>;
  };
  Wrapped.propTypes = {value: PropTypes.string};
  ValidatingController = validatingControlled(Wrapped);
}

describe('validatingControlled rendering', () => {

  beforeEach(setup);

  it('renders double higher order component of the wrapped component', () => {
    const rendered = shallow(<ValidatingController/>);
    // ValidatingComponent is the lower higher order component
    expect(rendered.type().name).toBe("ValidatingComponent");
    const child = rendered.dive();
    expect(child.type()).toBe(Wrapped);
    expect(child.dive().is("div")).toBe(true);
  });
});

describe('validation and change callbacks', () => {

  let mockOnChange, rendered;
  beforeEach(() => {
    setup();
    mockOnChange = jest.fn();
    rendered = shallow(
      <ValidatingController
        name="baz"
        initialValue="foo"
        onChange={mockOnChange}
        checkerOnChange={s => s === "bar"}
        modifierOnChange={s => s + s}
        modifierOnBlur={s => s + s + s}
      />
    );
  });

  it('checks and modifies Wrapper value on change', () => {
    let div = rendered.dive().dive();
    expect(div.props().value).toBe("foo");
    
    const simulatedEventA = {target: {value: "foofoo"}};
    div.props().onChange(simulatedEventA);
    div = rendered.dive().dive();
    expect(div.props().value).toBe("foo");

    const simulatedEventB = {target: {value: "bar"}};
    div.props().onChange(simulatedEventB);
    div = rendered.dive();
    expect(div.props().value).toBe("barbar");
  });

  it('modifies Wrapper value on blur', () => {
    let div = rendered.dive().dive();
    expect(div.props().value).toBe("foo");

    const simulatedEvent = {target: {value: "bar"}};
    div.props().onBlur(simulatedEvent);
    div = rendered.dive().dive();
    expect(div.props().value).toBe("barbarbar");
  });

  it('updates Wrapper value with second (value) argument to callback if one is provided', () => {
    let div = rendered.dive().dive();
    expect(div.props().value).toBe("foo");

    const simulatedEvent = {target: {value: "foofoo"}};
    div.props().onChange(simulatedEvent, "bar");
    div = rendered.dive().dive();
    expect(div.props().value).toBe("barbar");
  });
});
