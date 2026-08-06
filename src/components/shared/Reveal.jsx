import { memo } from 'react';
import { motion } from 'framer-motion';

function Reveal({ children, delay = 0, y = 18, className = '', as = 'div', ...props }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export default memo(Reveal);
