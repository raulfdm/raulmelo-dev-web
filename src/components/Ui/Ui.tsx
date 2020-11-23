import { styled } from '@styles/styled';
import { motion } from 'framer-motion';
import React from 'react';

/* TODO: fix this type */
export const Container = (props: any) => {
  return (
    <motion.div
      className="container mx-auto px-4 md:px-0 max-w-screen-md"
      {...props}
    />
  );
};

export const LineDivider = styled.hr`
  margin: 2rem 0;
  background-color: ${({ theme }) => theme.color.border};
`;
