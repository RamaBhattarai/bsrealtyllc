'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Award, Users, Target } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: CheckCircle,
    title: "Integrity",
    description: "We operate with complete transparency and honesty in every transaction.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive to exceed expectations and deliver outstanding results.",
  },
  {
    icon: Users,
    title: "Client-Focused",
    description: "Your goals and satisfaction are at the center of everything we do.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "We focus on achieving measurable outcomes for our clients.",
  },
];

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/realestate.jpg" 
            alt="About BS Realty" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your Trusted Real Estate Partner
            </h1>
            <p className="text-gray-300 text-lg">
              At BS Realty LLC, we&apos;re dedicated to helping you achieve your real estate dreams with 
              comprehensive services and personalized attention.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section ref={ref} className="py-20 md:py-28">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <Image
                  src="/realestate2.jpg"
                  alt="BS Realty Team"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-4xl font-bold">10+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Building Dreams, One Property at a Time
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                BS Realty LLC was founded with a vision to provide comprehensive real estate and 
                financial services under one roof. Our team brings together expertise in real estate, 
                mortgage lending, tax & accounting, and home improvement to serve all your property needs.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                We believe in building lasting relationships with our clients through trust, 
                transparency, and exceptional service. Whether you&apos;re buying your first home, 
                investing in property, or seeking financial guidance, we&apos;re here to help you 
                every step of the way.
              </p>
              <Button size="lg" href="/contact">
                Get in Touch
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Drives Us</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
