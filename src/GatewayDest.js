import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GatewayContext from './GatewayContext';

function GatewayDest({ name, component, unmountOnEmpty, ...attrs }) {
  const {addContainer, removeContainer, getContainerChildren} = useContext(GatewayContext);
  const children = getContainerChildren(name);

  useEffect(() => {
    addContainer(name);
    return () => {
      removeContainer(name);
    };
  }, []);

  return unmountOnEmpty && !children.length
    ? null
    : React.createElement(component || 'div', attrs, children);
}

GatewayDest.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  unmountOnEmpty: PropTypes.bool
};

export default GatewayDest;
