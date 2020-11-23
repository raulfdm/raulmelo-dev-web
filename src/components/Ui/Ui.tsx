import React from 'react';
import { motion } from 'framer-motion';

/* TODO: fix this type */
export const Container = (props: any) => {
  return (
    <motion.div
      className="container mx-auto px-4 md:px-0 max-w-screen-md"
      {...props}
    />
  );
};
