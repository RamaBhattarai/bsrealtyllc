"use client";

import { motion } from 'framer-motion';
import BlurText from './BlurText';
import { FaUsers, FaHandshake, FaBullseye, FaUserFriends } from 'react-icons/fa';

export default function Accomplishments() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Our Accomplishments Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <BlurText
            text="Our Accomplishments"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-3xl md:text-4xl font-bold text-black mb-12 align-items-center justify-center"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <FaUsers className="text-4xl text-blue-500 mb-4 mx-auto" />
              <div className="text-5xl md:text-4xl font-bold text-black mb-2">32</div>
              <div className="text-black text-lg">Happy Clients</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <FaHandshake className="text-4xl text-blue-500 mb-4 mx-auto" />
              <div className="text-5xl md:text-4xl font-bold text-black mb-2">41</div>
              <div className="text-black text-lg">Transactions</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <FaBullseye className="text-4xl text-blue-500 mb-4 mx-auto" />
              <div className="text-5xl md:text-4xl font-bold text-black mb-2">63</div>
              <div className="text-black text-lg">Active Leads</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <FaUserFriends className="text-4xl text-blue-500 mb-4 mx-auto" />
              <div className="text-5xl md:text-4xl font-bold text-black mb-2">21</div>
              <div className="text-black text-lg">Hard Workers</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}