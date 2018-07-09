# react-testing-helpers
Some Helper function to remove some of the boilerplate code in tests

# Test Utils


## renderComponent
renderComponent is a helper function to assist with the rendering of components for testing.

### Use 
#### With only a component
```js
describe('A really Cool Test', () => {
  beforeEach(() => {
    testSetup();
  });

  const renderFunComponent = renderComponent(FunComponent);

  it('renders', () => {
    const { output } = renderFunComponent();

    expect(getByTestId('fun-guy').textContent).toEqual('Some Stuff');
  });

});
```
#### With default props
```js
describe('A really Cool Test', () => {
  beforeEach(() => {
    testSetup();
  });

  const renderFunComponent = renderComponent(FunComponent)
    .withDefaultProps({
      some: 'default-thing',
    });

  it('renders', () => {
    const { output } = renderFunComponent();

    expect(getByTestId('fun-guy').textContent).toEqual('Some Stuff');
  });

});
```

#### With a Wrapper Component
```js
describe('A really Cool Test', () => {
  beforeEach(() => {
    testSetup();
  });

  const renderFunComponent = renderComponent(FunComponent)
    .withWrapper(IceTea);

  it('renders', () => {
    const { output } = renderFunComponent();

    expect(getByTestId('fun-guy').textContent).toEqual('Some Stuff');
  });

});
```

#### With custom props
```js
describe('A really Cool Test', () => {
  beforeEach(() => {
    testSetup();
  });

  const renderFunComponent = renderComponent(FunComponent)
    .withDefaultProps({
        some: 'default-thing',
      });

  it('renders', () => {
    const { output } = renderFunComponent();

    expect(getByText('default-thing').textContent).toEqual('Some Stuff');
  });

  it('renders with different props', () => {
    const { output } = renderFunComponent({ customProps: {some: 'different-thing'}});

    expect(getByTestId('different-thing').textContent).toEqual('Some Stuff');
  });

});
```

#### With a different renderer
```js
describe('A really Cool Test', () => {
  beforeEach(() => {
    testSetup();
  });

  const renderFunComponent = renderComponent(FunComponent)
    .withDefaultProps({
        some: 'default-thing',
      });

  it('renders', () => {
    const { output } = renderFunComponent();

    expect(getByText('default-thing').textContent).toEqual('Some Stuff');
  });

  it('renders with enzyme', () => {
    const { output } = renderFunComponent({ renderer: mount });

    expect(output.props()).toEqual({some: 'default-thing'});
  });

});
```