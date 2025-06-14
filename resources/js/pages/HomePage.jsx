import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import Hero from '../components/home/Hero';
import EventList from '../components/events/EventList';
import CTA from '../components/home/CTA';
import Footer from '../components/layout/Footer';
import Testimonials from '../components/home/Testimonials';
import HowItWorks from '../components/home/HowItWorks';

export default function HomePage() {
  const { auth } = usePage().props;
  const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

  return (
    <Layout>
      <Head title="Home" />

      <div>
        <Hero />
        <div className="bg-white">
          <EventList />
          <HowItWorks />
          <Testimonials />
          <CTA />
        </div>
        <Footer />
      </div>
    </Layout>
  );
} 