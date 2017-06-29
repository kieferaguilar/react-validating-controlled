# react-validating-controlled
React higher order components for controlled components and components requiring value validation.

[![Build Status](https://circleci.com/gh/kieferaguilar/react-validating-controlled.svg?style=shield&circle-token=e08250f635d3197674c27bd841b1960ed993daa0)](https://circleci.com/gh/kieferaguilar/react-validating-controlled)

### Installation

```
npm install --save react-validating-controlled
```

If you use the `validating` or `validatingControlled` higher order components, you may be interested in using checkers and modifiers from the [check-modify](https://www.npmjs.com/package/check-modify) NPM package.

## How to import/require

Currently, there is no option to reference a minified version directly. Rather, import/require the modules you need.

```js
import { controlled } from 'react-validating-controlled';
// OR
import { validating } from 'react-validating-controlled';
// OR
import { validatingControlled } from 'react-validating-controlled';
```

## `controlled` components

A `controlled` component manages the `value` prop of any lower order component for you with an internal state.

You can optionally specify an `initialValue` prop on the `controlled` component.

```js
// TextInput.js

import { controlled } from 'react-validating-controlled';

function LowerOrderTextInput(props) {
  const handleChange = (event) => {
    // You can simply call
    props.onChange(event);

    // Or optionally, you can transform the value and pass it in a second argument
    // The original value will still be preserved in event.target.value on the first argument
    props.onChange(event, event.target.value.trim());
  };

  return (
    <input type="text"
      name={props.name}
      value={props.value}
      onChange={handleChange}/>
  );
}

export default controlled(LowerOrderTextInput);

// Use elsewhere:

// With empty initialValue
<TextInput name="foo" onChange={
  (event, value) => { ... }
}/>

// With "bar" as initialValue
<TextInput name="foo" initialValue="bar" onChange={...}/>
```

If your lower order component's value type is anything other than `String`, you can provide an `emptyValue` generator that will be used to set your lower order component's empty value.

For example, if you want an empty array as your empty value, do this:

```
MyLowerOrderComponent.emptyValue = (() => []);
```

The default `emptyValue` generator is `(() => "")`.

## `validating` components

A `validating` component receives `onChange` events from a lower order component and does three things (each optionally) before calling its own `onChange` prop.

1. First, it checks whether it should call its own `onChange` prop.

  > `<ValidatingComponent checkerOnChange={f}/>`
  > where `f` is `function(value) --> Boolean`.

2. Then, if `checkerOnChange` passes, it modifies the value it will call `onChange` with.

  > `<ValidatingComponent modifierOnChange={f}/>`
  > where `f` is `function(value) --> value`.

3. Finally, when the lower order component fires an `onBlur` event, it calls its own `onChange` prop once again with a modified value (if and only if the value actually changed).

  > `<ValidatingComponent modifierOnBlur={f}/>`
  > where `f` is `function(value) --> value`.

The `validating` component always calls its `onChange` prop with two arguments: `props.onChange(originalEvent, modifiedValue)`.

**Note:** No example usage is provided here because you almost always want to use `validatingControlled` instead of just `validating` alone.

## `validatingControlled` components

A `validatingControlled` component is the composition of behaviors of a `controlled` component and `validating` component.

```js
// CurrencyInput.js

import { validatingControlled } from 'react-validating-controlled';

// Optional, but easy way to get checkers and modifiers
// npm install --save check-modify
import { CurrencyChecker, CurrencyOnChangeModifier, CurrencyOnBlurModifier } from 'check-modify';

function LowerOrderTextInput(props) {
  return (<input {...props} type="text"/>);
}

const ValidatingControlledTextInput = validatingControlled(LowerOrderTextInput);

export default function CurrencyInput(props) {
  return (
    <ValidatingControlledTextInput
      {...props}
      checkerOnChange={CurrencyChecker()}
      modifierOnChange={CurrencyOnChangeModifier()}
      modifierOnBlur={CurrencyOnBlurModifier()}/>
  );
}

// Use elsewhere:

// With empty initialValue
<CurrencyInput name="foo" placeholder="99.99" onChange={
  (event, value) => {
    // Do something with value
    // Do not depend on event.target.value which may have an unmodified/outdated value
  }
}/>

// Initial values are not checked or modified
<CurrencyInput name="foo" initialValue="49.95" onChange={...}/>
```

**Note:** Just as with `controlled` components, be sure to set `emptyValue` if needed.

## Contributing

### Setup

You will want to clone the repository and `npm install`.

### Testing

`npm test`: Tests modules with changes since last commit.
`CI=true npm test`: Tests all modules.

Branch pushes to Github will trigger CI tests on [CircleCI](http://circleci.com).

### Building lib

The `lib` directory contains transpiled code that is gets shipped. To update this directory, `npm run build` and commit changes.
