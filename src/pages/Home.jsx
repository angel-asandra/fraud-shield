import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesOverview from '../components/home/ServicesOverview';
import TrustBadges from '../components/home/TrustBadges';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';

const HERO_IMAGE = 'https://media.base44.com/images/public/69f0e0980939f2580420592d/5ebf40694_generated_ccd07790.png';

export default function Home() {
  return (
    <div>
      <HeroSection heroImage={HERO_IMAGE} />
      <TrustBadges />
      <ServicesOverview />
      <Testimonials />
      <CTASection />
    </div>
  );
}