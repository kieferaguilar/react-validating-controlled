import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import controlled from './controlled';

let Wrapped, Controlled;

function setup() {
  Wrapped = (props) => {
    return <div {...props}/>;
  };
  Wrapped.propTypes = {value: PropTypes.string};
  Controlled = controlled(Wrapped);
}

describe('controlled rendering', () => {

  beforeEach(setup);

  it('renders higher order component of the wrapped component', () => {
    const rendered = shallow(<Controlled/>);
    expect(rendered.type()).toBe(Wrapped);
    expect(rendered.dive().is("div")).toBe(true);
  });

  it('passes through non-controleld props correctly', () => {
    const rendered = shallow(<Controlled name="baz"/>);
    expect(rendered.props().name).toBe("baz");

    const div = rendered.dive();
    expect(div.props().name).toBe("baz");
  });

  it('sets initial value correctly', () => {
    const rendered = shallow(<Controlled initialValue="foo"/>);

    const shallowProps = rendered.props();
    expect(shallowProps.value).toBe("foo");
    expect(shallowProps.initialValue).toBe(undefined);

    const deepProps = rendered.dive().props();
    expect(deepProps.value).toBe("foo");
    expect(deepProps.initialValue).toBe(undefined);
  });

  it('does not pass through props related to control', () => {
    const rendered = shallow(<Controlled initialValue="foo"/>);
    const shallowProps = rendered.props();
    expect(shallowProps.initialValue).toBe(undefined);

    const deepProps = rendered.dive().props();
    expect(deepProps.initialValue).toBe(undefined);
  });
});

describe('onChange callback', () => {

  let mockOnChange, rendered;
  beforeEach(() => {
    setup();
    mockOnChange = jest.fn();
    rendered = shallow(
      <Controlled
        name="baz"
        initialValue="foo"
        onChange={mockOnChange}
      />
    );
  });

  it('sets value on wrapped component on change', () => {
    let div = rendered.dive();
    expect(div.props().value).toBe("foo");
    
    const simulatedEvent = {target: {value: "bar"}};
    div.props().onChange(simulatedEvent);
    div = rendered.dive();
    expect(div.props().value).toBe("bar");
    expect(rendered.state().value).toBe("bar");

    // onChange callback arguments are event, newValue, name
    expect(mockOnChange.mock.calls[0][0]).toBe(simulatedEvent);
    expect(mockOnChange.mock.calls[0][1]).toBe("bar");
    expect(mockOnChange.mock.calls[0][2]).toBe("baz");
  });

  it('updates value with second (value) argument to onChange if one is provided', () => {
    let div = rendered.dive();
    expect(div.props().value).toBe("foo");

    const simulatedEvent = {target: {value: "foofoo"}};
    div.props().onChange(simulatedEvent, "bar");
    div = rendered.dive();
    expect(div.props().value).toBe("bar");
    expect(rendered.state().value).toBe("bar");

    // onChange callback arguments are event, newValue, name
    expect(mockOnChange.mock.calls[0][0]).toBe(simulatedEvent);
    expect(mockOnChange.mock.calls[0][1]).toBe("bar");
    expect(mockOnChange.mock.calls[0][2]).toBe("baz");
  });
});
