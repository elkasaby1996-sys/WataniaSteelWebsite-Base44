import React from 'react';
import { motion } from 'framer-motion';

export default function ContactCard({ 
  icon: Icon, 
  title, 
  content, 
  href,
  color = 'maroon',
  delay = 0 
}) {
  const colorClasses = {
    maroon: 'bg-[#7B1F32]',
    navy: 'bg-[#1E3A5F]'
  };

  const ContentWrapper = href ? 'a' : 'div';
  const linkProps = href ? { href, className: 'hover:underline' } : {};

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
          <ContentWrapper {...linkProps}>
            {typeof content === 'string' ? (
              <p className={`text-gray-700 ${href ? 'font-semibold' : ''}`}>
                {content}
              </p>
            ) : (
              content
            )}
          </ContentWrapper>
        </div>
      </div>
    </motion.div>
  );
}