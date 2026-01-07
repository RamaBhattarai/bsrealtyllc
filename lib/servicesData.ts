export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export const services: ServiceItem[] = [
  {
    id: 1,
    title: "Real Estate Services",
    description: "We provide comprehensive real estate services for buying, selling and renting residential and commercial properties. Our expert team helps you find the perfect property.",
    icon: "FaHome",
    color: "from-blue-500 to-blue-600",
    features: ["Property Search", "Market Analysis", "Negotiation Support"]
  },
  {
    id: 2,
    title: "Mortgage Solutions",
    description: "We offer tailored mortgage solutions to fit your financial needs. Whether you're a first-time homebuyer or refinancing, we provide access to varied loan products.",
    icon: "FaMoneyBillWave",
    color: "from-green-500 to-green-600",
    features: ["Loan Options", "Fast Approval", "Expert Guidance"]
  },
  {
    id: 3,
    title: "Tax & Accounting",
    description: "Our comprehensive tax & accounting services are designed to help individuals and businesses stay financially organized and compliant.",
    icon: "FaCalculator",
    color: "from-purple-500 to-purple-600",
    features: ["Tax Planning", "Bookkeeping", "Financial Reporting"]
  },
  {
    id: 4,
    title: "Home Improvement",
    description: "Our home improvement services cover everything from plumbing, electrical, and HVAC maintenance to renovations and repairs for your comfort.",
    icon: "FaTools",
    color: "from-orange-500 to-orange-600",
    features: ["Maintenance", "Renovations", "Quality Work"]
  },
  {
    id: 5,
    title: "Utility Setup & Moving",
    description: "We help you set up essential utilities such as electricity, water, gas, and internet in your new property with relocation services.",
    icon: "FaTruck",
    color: "from-teal-500 to-teal-600",
    features: ["Utilities Setup", "Relocation", "Hassle-Free Service"]
  },
  {
    id: 6,
    title: "Consulting Services",
    description: "We offer expert consulting services for real estate, mortgage, tax, accounting, and investments to help you make informed decisions.",
    icon: "FaBriefcase",
    color: "from-indigo-500 to-indigo-600",
    features: ["Strategic Advice", "Market Insights", "Financial Planning"]
  }
];

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((service) => slugify(service.title) === slug);
}

