'use client'

import { motion } from 'framer-motion';
import BlurText from './BlurText';
import CardSwap, { Card } from './CardSwap';

const testimonials = [
  {
    image: `https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face`,
    name: 'Durga Kutal',
    title: 'Professor @ Augusta University',
    review: 'Awesome! I did not have to deal much, he made everything ready made.',
    rating: 5
  },
  {
    image: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face`,
    name: 'Ranju Kutal',
    title: 'Amazon.com',
    review: 'Wow, he is amazing! I plan to purchase more investment property with him in future.',
    rating: 5
  },
  {
    image: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
    name: 'Dipak Timilsina',
    title: 'Business Owner',
    review: 'I am so happy to have him my realtor for the awesome bunglaw!',
    rating: 5
  },
  {
    image: `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face`,
    name: 'Saru Timilsina',
    title: 'Business Owner',
    review: 'Highly recommended! Very professional and easy going personality!',
    rating: 5
  },
  {
    image: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face`,
    name: 'Santosh Rijal',
    title: 'Amazon.com employee',
    review: 'Recommended to everyone who needs seamless real estate and mortgage transaction.',
    rating: 5
  },
  {
    image: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face`,
    name: 'Sunita Pudasaini',
    title: 'Amazon.com employee',
    review: 'Down to earth personality, very talented realtor and loan officer.',
    rating: 5
  }
];

export default function Testimonials() {
  const handleAnimationComplete = () => {
    console.log('Testimonials title animation completed!');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Title */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <BlurText
                text="Customer Reviews"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-5xl md:text-7xl font-bold text-white mb-6"
              />
              <BlurText
                text="What our clients say about working with us"
                delay={50}
                animateBy="words"
                direction="top"
                className="text-xl text-gray-200 max-w-md leading-relaxed"
              />
            </motion.div>
          </div>

          {/* Right Side - CardSwap */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative h-[600px] w-full mt-8"
            >
              <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={4000}
                pauseOnHover={true}
                width={420}
                height={320}
              >
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    className="bg-white/10 backdrop-blur-lg border-white/20 p-6 flex flex-col justify-center items-center text-center shadow-2xl"
                  >
                    {/* Client Image */}
                    <div className="mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-white/30 shadow-lg"
                      />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">★</span>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-white mb-6 leading-relaxed text-sm italic max-w-[350px]">
                      "{testimonial.review}"
                    </p>

                    {/* Client Info */}
                    <div className="border-t border-white/20 pt-4 w-full">
                      <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                      <div className="text-gray-300 text-sm">{testimonial.title}</div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}