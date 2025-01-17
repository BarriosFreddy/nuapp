import React from 'react';

type IfProps = {
  condition: boolean;
  children: React.ReactNode;
};

const If = ({condition, children}: IfProps) => {
  return condition ? children : null;
};

export default If;
