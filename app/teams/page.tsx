'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";

const teamMembers = [
  {
    id: 1,
    name: "Bal Khadka",
    role: "Founder & CEO",
    title: "Licensed Realtor & Mortgage Loan Officer",
    bio: "With over 10 years of experience in real estate and mortgage lending, Bal leads BS Realty with a commitment to exceptional client service and comprehensive solutions.",
    specialties: ["Real Estate", "Mortgage", "Tax Planning", "Investment Strategy"],
    phone: "+1 (706) 261-8948",
    email: "bsrealtyllc@gmail.com",
  },
];

export default function Team() {
  return (
    <>
      {/* Hero */}
      <section className="py-32 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
              Our People
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Meet Our Team
            </h1>
            <p className="text-white/80 text-lg">
              Our team of dedicated professionals is committed to providing you with the best 
              service and expertise in real estate, mortgage, and financial services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-slate-100 py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-500">Team</span>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="overflow-hidden bg-white rounded-2xl border-0 shadow-xl">
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                          <span className="text-5xl font-bold text-white">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-2">
                          {member.name}
                        </h3>
                        <p className="text-white/80 text-sm">{member.role}</p>
                      </div>
                    </div>
                    <div className="md:col-span-3 p-8 md:p-12">
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-600 font-semibold text-sm">{member.title}</span>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {member.bio}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Specialties</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {member.phone}
                        </a>
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          {member.email}
                        </a>
                      </div>

                      <div className="mt-8">
                        <Button asChild>
                          <Link href="/contact">Schedule a Meeting</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Join Our Team
            </h2>
            <p className="text-gray-600 mb-8">
              We're always looking for talented individuals to join our growing team. 
              If you're passionate about real estate and helping clients achieve their dreams, 
              we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/become-agent">Become an Agent</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/job-listings">Apply for a Job</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
