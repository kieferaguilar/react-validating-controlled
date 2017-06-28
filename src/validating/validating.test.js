import React from 'react';
import { shallow } from 'enzyme';
import validating from './validating';

let Wrapped, Validator;

function setup() {
  Wrapped = (props) => {
    return <div {...props}/>;
  };
  Validator = validating(Wrapped);
}

describe('validating rendering', () => {

  beforeEach(setup);

  it('renders higher order component of the wrapped component', () => {
    const rendered = shallow(<Validator/>);
    expect(rendered.type()).toBe(Wrapped);
    expect(rendered.dive().is("div")).toBe(true);
  });

  it('passes through non-validation props correctly', () => {
    const rendered = shallow(<Validator name="baz"/>);
    expect(rendered.props().name).toBe("baz");

    const div = rendered.dive();
    expect(div.props().name).toBe("baz");
  });

  it('does not pass through props related to validation', () => {
    const rendered = shallow(
      <Validator
        checkerOnChange={s => true}
        modifierOnChange={s => s}
        modifierOnBlur={s => s}
      />
    );
    const shallowProps = rendered.props();
    expect(shallowProps.checkerOnChange).toBe(undefined);
    expect(shallowProps.modifierOnChange).toBe(undefined);
    expect(shallowProps.modifierOnBlur).toBe(undefined);

    const deepProps = rendered.dive().props();
    expect(deepProps.checkerOnChange).toBe(undefined);
    expect(deepProps.modifierOnChange).toBe(undefined);
    expect(deepProps.modifierOnBlur).toBe(undefined);
  });
});

describe('validation and change callbacks', () => {

  let mockOnChange, rendered;
  beforeEach(() => {
    setup();
    mockOnChange = jest.fn();
    rendered = shallow(
      <Validator
        name="baz"
        onChange={mockOnChange}
        checkerOnChange={s => s === "bar"}
        modifierOnChange={s => s + s}
        modifierOnBlur={s => s + s + s}
      />
    );
  });

  it('checks and modifies text on change', () => {
    const div = rendered.dive();

    const simulatedEventA = {target: {value: "foofoo"}};
    div.props().onChange(simulatedEventA);
    expect(mockOnChange.mock.calls.length).toBe(0);

    const simulatedEventB = {target: {value: "bar"}};
    div.props().onChange(simulatedEventB);

    // onChange callback arguments are event, newValue, name
    expect(mockOnChange.mock.calls[0][0]).toBe(simulatedEventB);
    expect(mockOnChange.mock.calls[0][1]).toBe("barbar");
    expect(mockOnChange.mock.calls[0][2]).toBe("baz");
  });

  it('modifies text on blur', () => {
    const div = rendered.dive();
    const simulatedEvent = {target: {value: "bar"}};
    div.props().onBlur(simulatedEvent);

    // onChange callback arguments are event, newValue, name
    expect(mockOnChange.mock.calls[0][0]).toBe(simulatedEvent);
    expect(mockOnChange.mock.calls[0][1]).toBe("barbarbar");
    expect(mockOnChange.mock.calls[0][2]).toBe("baz");
  });

  it('updates value with second (value) argument to onChange if one is provided', () => {
    const div = rendered.dive();
    const simulatedEvent = {target: {value: "foofoo"}};
    div.props().onChange(simulatedEvent, "bar");

    // onChange callback arguments are event, newValue, name
    expect(mockOnChange.mock.calls[0][0]).toBe(simulatedEvent);
    expect(mockOnChange.mock.calls[0][1]).toBe("barbar");
    expect(mockOnChange.mock.calls[0][2]).toBe("baz");
  });
});
