import React from 'react';
import renderComponent from './renderComponent';

const TestComponent = props => (
  <React.Fragment>
    <div>test component</div>
    {Object.entries(props).map(([key, value]) => (
      <div key={key}> {`${key}:${value}`} </div>
    ))}
  </React.Fragment>
);

const WrapperComponent = props => (
  <React.Fragment>
    <div>wrapper component</div>
    {/* eslint-disable-next-line react/prop-types */}
    {props.children}
  </React.Fragment>
);
describe('renderComponent', () => {
  it('renders with just the component', () => {
    const { rendered } = renderComponent(TestComponent)();
    const { getByText } = rendered;

    expect(getByText('test component')).toBeDefined();
  });

  it('renders with default props', () => {
    const { rendered, props } = renderComponent(TestComponent)
      .withDefaultProps({ ilove: 'testing!' })();
    const { getByText } = rendered;

    expect(getByText('ilove:testing!')).toBeDefined();
    expect(props).toEqual({ ilove: 'testing!' });
  });

  it('renders with custom props', () => {
    const { rendered, props } = renderComponent(TestComponent)
      .withDefaultProps({ ilove: 'testing!' })({
        customProps: {
          ilove: 'doge',
          scrum: 'kitty',
        },
      });
    const { getByText } = rendered;

    expect(getByText('ilove:doge')).toBeDefined();
    expect(props).toEqual({ ilove: 'doge', scrum: 'kitty' });
  });

  it('renders with wrapper component', () => {
    const { rendered } = renderComponent(TestComponent)
      .withWrapper(WrapperComponent)();
    const { getByText } = rendered;

    expect(getByText('wrapper component')).toBeDefined();
  });

  it('renders with wrapper component and default props', () => {
    const { rendered } = renderComponent(TestComponent)
      .withDefaultProps({ ilove: 'testing!' })
      .withWrapper(WrapperComponent)();
    const { getByText } = rendered;

    expect(getByText('wrapper component')).toBeDefined();
    expect(getByText('ilove:testing!')).toBeDefined();
  });
});
