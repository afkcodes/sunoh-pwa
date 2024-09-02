import { motion } from 'framer-motion';

const ProgressBar = ({
  progressPercentage,
  isBuffering,
}: {
  progressPercentage: number;
  isBuffering: boolean;
}) => {
  return (
    <motion.div className='relative w-full h-2 overflow-hidden bg-gray-200'>
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300'
        initial={{ right: '100%' }}
        animate={{ right: `${100 - progressPercentage}%` }}
        transition={{ duration: 1, ease: 'linear' }}>
        {isBuffering && (
          <motion.div
            className='absolute inset-0 bg-gradient-to-r from-transparent to-white/30'
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'linear',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProgressBar;
