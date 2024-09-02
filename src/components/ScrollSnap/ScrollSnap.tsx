import React, { ReactNode } from 'react';

interface ScrollSnapComponentProps {
  children: ReactNode;
}

const ScrollSnap: React.FC<ScrollSnapComponentProps> = ({ children }) => {
  return <div className='flex px-3 overflow-x-auto no-scrollbar gap-x-3'>{children}</div>;
};

export default ScrollSnap;
