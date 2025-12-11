import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BS Realty LLC | Your Trusted Real Estate Partner",
  description: "Learn about BS Realty LLC, your trusted partner for real estate, mortgage, and financial services in Georgia. Meet our expert team and discover our commitment to excellence.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
