"use client";

import { motion } from 'framer-motion';
import BlurText from './../BlurText';
import Counter from '../Counter';
import { Users, FileCheck, Target, Briefcase } from 'lucide-react';

export default function Accomplishments() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
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
          <span className="text-green-500 font-semibold text-lg uppercase tracking-wider block mb-4">Our Track Record</span>
          <BlurText
            text="Our Accomplishments"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl font-bold text-black mb-16 align-items-center justify-center"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-600/20 border border-emerald-500/50 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-emerald-500" />
              </div>
              <Counter end={32} duration={2000} className="text-5xl md:text-4xl font-bold text-black mb-2" />
              <div className="text-gray-600 text-lg">Happy Clients</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-600/20 border border-emerald-500/50 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <FileCheck className="w-8 h-8 text-emerald-500" />
              </div>
              <Counter end={41} duration={2000} className="text-5xl md:text-4xl font-bold text-black mb-2" />
              
              <div className="text-gray-600 text-lg">Transactions</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-600/20 border border-emerald-500/50 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Target className="w-8 h-8 text-emerald-500" />
              </div>
              <Counter end={63} duration={2000} className="text-5xl md:text-4xl font-bold text-black mb-2" />
              <div className="text-gray-600 text-lg">Active Leads</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-600/20 border border-emerald-500/50 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Briefcase className="w-8 h-8 text-emerald-500" />
              </div>
              <Counter end={21} duration={2000} className="text-5xl md:text-4xl font-bold text-black mb-2" />
              <div className="text-gray-600 text-lg">Hard Workers</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}