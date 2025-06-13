import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import EventList from '../components/events/EventList';
import CTA from '../components/home/CTA';

function HomePage() {
  return (
    <Layout>
      <Hero />
      <div className="bg-white">
        <EventList />
        <CTA />
      </div>
    </Layout>
  );
}

export default HomePage; 