'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, DollarSign, Calculator, Wrench, Truck, Briefcase, ArrowRight } from 'lucide-react';


const services = [
  {
    id: 1,
    title: "Real Estate Services",
    description: "We provide comprehensive real estate services for buying, selling and renting residential and commercial properties. Our expert team helps you find the perfect property and ensures a smooth transaction from start to finish.",
    icon: Home,
    features: ["Property Search", "Market Analysis", "Negotiation Support", "Closing Assistance"],
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Mortgage Solutions",
    description: "We offer tailored mortgage solutions to fit your financial needs. Whether you're a first-time homebuyer or refinancing, we provide access to a variety of loan products and guide you through the loan approval process.",
    icon: DollarSign,
    features: ["First-Time Buyer Programs", "Refinancing", "Investment Loans", "Pre-Approval"],
    color: "from-green-500 to-green-600"
  },
  {
    id: 3,
    title: "Tax & Accounting",
    description: "Our comprehensive tax & accounting services are designed to help individuals and businesses stay financially organized, compliant, and positioned for growth. If you need assistance with tax planning, bookkeeping, payroll, or financial reporting, our expert team provides solutions.",
    icon: Calculator,
    features: ["Tax Preparation", "Bookkeeping", "Payroll Services", "Financial Reporting"],
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 4,
    title: "Home Improvement",
    description: "Our home improvement services cover everything from plumbing, electrical, and HVAC maintenance to renovations and repairs. We ensure your home is well-maintained and meets your comfort and safety standards.",
    icon: Wrench,
    features: ["Plumbing & Electrical", "HVAC Maintenance", "Renovations", "Repairs"],
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 5,
    title: "Insurance P & C",
    description: "We provide personalized auto, home, and commercial property insurance solutions designed to protect what matters most. Our licensed agents help you compare coverage options and secure the right protection at competitive rates.",
    icon: Truck,
    features: ["Utility Setup", "Internet & Cable", "Moving Coordination", "New Home Setup"],
    color: "from-teal-500 to-teal-600"
  },
  {
    
        id: 6,
        title: "Online Courses",
        description: "We offer flexible and practical online courses designed for individuals and professionals seeking knowledge and certification in real estate, mortgage, insurance, and related financial services. Ourcourses are structured to be easy to follow, industry-relevant, and accessible anytime, anywhere.",
        icon: Briefcase,
        features: ["Real Estate Classes", "Mortgage Classes", "Insurance Classes", "Other Professional Services & Training"],
        color: "from-indigo-500 to-indigo-600"
  }
];

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const IconComponent = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative h-full">
        {/* Card Background with Gradient */}
        <div className={`absolute inset-0 bg-linear-to-br ${service.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

        {/* Glassmorphism Card */}
        <div className="relative backdrop-blur-sm bg-white/80 border border-white/20 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-600/20 border border-emerald-500/50 rounded-lg flex items-center justify-center group-hover:bg-emerald-600/30 transition-all duration-300">
              <IconComponent className="w-8 h-8 text-emerald-500 group-hover:text-emerald-600 transition-colors duration-300" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
            <Link href={`/services/${slugify(service.title)}`} className="hover:text-green-600">
              {service.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
            {service.description}
          </p>

          {/* Features List */}
          <div className="space-y-2 mb-6">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-linear-to-r ${service.color}`}></div>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>

          {/* Learn More Button */}
          <Link href={`/services/${slugify(service.title)}`}>
            <motion.button
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>

          {/* Hover Effect Line */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 bg-linear-to-r ${service.color} rounded-b-2xl`}
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen -mt-16">
      {/* Header Section */}
      <section className="pt-45 pb-16 bg-[#0f1729]">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-500 font-semibold text-lg">What We Offer</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white my-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We specialize in providing a one-stop solution for all your needs, whether you are buying, selling, renting, or improving your property. We also offer services in tax and accounting.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-linear-to-r from-gray-50 to-gray-100 py-6 pt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Services</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-linear-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-blue-400 to-purple-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us today to discuss how we can help you achieve your real estate and financial goals.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule a Consultation
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

