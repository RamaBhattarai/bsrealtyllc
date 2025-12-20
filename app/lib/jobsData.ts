export interface Job {
  id: number;
  title: string;
  slug: string;
  description: string;
  requirements: string[];
  experience: string;
  location: string;
  type: string; // full-time, part-time, etc.
  salary?: string;
  qualifications: string[];
  softSkills: string[];
  whatWeOffer: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Real Estate Agent",
    slug: "real-estate-agent",
    description: "We are looking for a motivated Real Estate Agent to join our team. You will help clients buy, sell, and rent properties in the local market. This role involves property showings, negotiations, and providing excellent customer service.",
    requirements: [
      "Valid real estate license",
      "Strong communication skills",
      "Knowledge of local real estate market",
      "Ability to work independently and as part of a team",
      "Experience in customer service"
    ],
    experience: "1-3 years",
    location: "Remote/On-site",
    type: "Full-time",
    salary: "Commission-based + bonuses",
    qualifications: [
      "Bachelor's degree in Business, Real Estate, or related field preferred",
      "Active real estate license in good standing",
      "Clean driving record and reliable transportation",
      "Proficiency in MLS and real estate software"
    ],
    softSkills: [
      "Excellent communication and interpersonal skills",
      "Strong negotiation and persuasion abilities",
      "Customer service orientation",
      "Time management and organizational skills",
      "Adaptability and problem-solving mindset"
    ],
    whatWeOffer: [
      "Competitive commission structure with bonuses",
      "Comprehensive training and mentorship program",
      "Marketing support and lead generation",
      "Flexible work schedule",
      "Professional development opportunities"
    ]
  },
  {
    id: 2,
    title: "Mortgage Loan Officer",
    slug: "mortgage-loan-officer",
    description: "Join our mortgage team as a Loan Officer. You will assist clients in finding the best mortgage solutions, guide them through the application process, and ensure smooth loan approvals.",
    requirements: [
      "Mortgage license preferred",
      "Financial background",
      "Excellent interpersonal skills",
      "Detail-oriented",
      "Ability to meet sales targets"
    ],
    experience: "2+ years",
    location: "On-site",
    type: "Full-time",
    salary: "Base salary + commission",
    qualifications: [
      "Mortgage loan originator license (NMLS)",
      "Bachelor's degree in Finance, Business, or related field",
      "Strong understanding of mortgage products and lending regulations",
      "Experience with mortgage origination software"
    ],
    softSkills: [
      "Exceptional customer service skills",
      "Strong analytical and problem-solving abilities",
      "Effective communication and presentation skills",
      "Relationship building and networking",
      "Attention to detail and accuracy"
    ],
    whatWeOffer: [
      "Competitive base salary plus commission",
      "Comprehensive benefits package",
      "Ongoing training and certification support",
      "Modern office environment with state-of-the-art tools",
      "Career advancement opportunities"
    ]
  },
  {
    id: 3,
    title: "Tax Accountant",
    slug: "tax-accountant",
    description: "We need a skilled Tax Accountant to handle tax preparation, planning, and compliance for our clients. You will work on individual and business tax returns, provide financial advice, and ensure accuracy in all filings.",
    requirements: [
      "CPA certification",
      "Experience with tax software",
      "Knowledge of tax laws and regulations",
      "Strong analytical skills",
      "Attention to detail"
    ],
    experience: "3+ years",
    location: "On-site",
    type: "Full-time",
    salary: "$60,000 - $80,000",
    qualifications: [
      "CPA (Certified Public Accountant) designation",
      "Bachelor's degree in Accounting, Finance, or related field",
      "Experience with tax preparation software (TurboTax, TaxAct, etc.)",
      "Knowledge of federal and state tax regulations"
    ],
    softSkills: [
      "Meticulous attention to detail",
      "Strong analytical and problem-solving skills",
      "Excellent communication and client service",
      "Time management and organizational abilities",
      "Ethical judgment and integrity"
    ],
    whatWeOffer: [
      "Competitive salary with performance bonuses",
      "Health, dental, and vision insurance",
      "Professional development and CPA exam reimbursement",
      "Flexible work arrangements",
      "Retirement savings plan with company match"
    ]
  },
  {
    id: 4,
    title: "Home Improvement Contractor",
    slug: "home-improvement-contractor",
    description: "As a Home Improvement Contractor, you will oversee renovation projects, coordinate with subcontractors, and ensure high-quality work for our clients' properties.",
    requirements: [
      "Contractor license",
      "Experience in home renovations",
      "Project management skills",
      "Knowledge of building codes",
      "Customer service orientation"
    ],
    experience: "5+ years",
    location: "On-site",
    type: "Contract",
    salary: "Project-based",
    qualifications: [
      "Valid contractor's license in applicable jurisdictions",
      "OSHA safety certifications",
      "Experience with construction management software",
      "Knowledge of local building codes and regulations",
      "Insurance coverage (liability, workers' comp)"
    ],
    softSkills: [
      "Strong leadership and team management",
      "Excellent project coordination skills",
      "Customer-focused service mentality",
      "Problem-solving and decision-making abilities",
      "Effective communication with clients and subcontractors"
    ],
    whatWeOffer: [
      "Competitive project-based compensation",
      "Project management support and resources",
      "Marketing assistance and client referrals",
      "Training and certification opportunities",
      "Long-term partnership potential"
    ]
  }
];