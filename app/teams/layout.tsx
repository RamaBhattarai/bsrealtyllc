import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team | BS Realty LLC - Meet Our Experts',
  description: 'Meet the dedicated team at BS Realty LLC. Our experienced professionals are committed to helping you achieve your real estate and financial goals.',
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

