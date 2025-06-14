import React from 'react';
import Layout from '../Layout/Layout';
import Hero from './Hero';
import EventList from '../Events/EventList';
import CTA from './CTA';

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