import ServiceDetailClient from '../ServiceDetailClient';

const allServices = [
  'Real Estate Services',
  'Mortgage Solutions',
  'Tax & Accounting',
  'Home Improvement',
  'Insurance P & C',
  'Online Courses',
];

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

export async function generateStaticParams() {
  return allServices.map((service) => ({
    slug: slugify(service),
  }));
}


export default async function ServiceDetail({ params }: { params?: { slug?: string } | Promise<{ slug?: string }> }) {
  let resolvedParams: { slug?: string } | undefined = undefined;

  try {
    if (params && typeof (params as any).then === 'function') {
      resolvedParams = await params;
    } else {
      resolvedParams = params as { slug?: string } | undefined;
    }
  } catch (e) {
    resolvedParams = undefined;
  }

  const slug = resolvedParams?.slug ?? slugify(allServices[0]);

  return <ServiceDetailClient slug={slug} allServices={allServices} />;
}