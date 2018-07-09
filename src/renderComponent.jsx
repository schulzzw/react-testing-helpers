import React, { Component } from 'react';
import { render } from 'react-testing-library';

/* eslint-disable-next-line react/prop-types */
const addWrapper = ({ TestComponent, Wrapper, props, children, wrapperProps }) => (
  <Wrapper {...wrapperProps}>
    <TestComponent {...props}>{children}</TestComponent>
  </Wrapper>
);

const renderComponent = (
  TestComponent = Component,
  defaultProps = {},
  Wrapper,
  wrapperProps,
) => {
  const renderFunc = ({ customProps = {}, renderer = render } = {}) => {
    const { children: defaultChildren, ...restDefault } = defaultProps;
    const { children: customChildren, ...restCustom } = customProps;

    const children = customChildren || defaultChildren || '';

    const props = {
      ...restDefault,
      ...restCustom,
    };

    const comp = Wrapper ? addWrapper({ TestComponent, Wrapper, props, children, wrapperProps })
      : <TestComponent {...props}>{children}</TestComponent>;

    const rendered = renderer(comp);

    return {
      props,
      rendered,
    };
  };

  renderFunc.withWrapper = (WrapperComponent, props = {}) =>
    renderComponent(TestComponent, defaultProps, WrapperComponent, props);

  renderFunc.withDefaultProps = _defaultProps =>
    renderComponent(TestComponent, _defaultProps, Wrapper);

  return renderFunc;
};

export default renderComponent;
