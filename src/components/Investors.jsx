import { Download, Calendar } from 'lucide-react';
import { useReveal } from '../hooks.js';

export default function Investors() {
  const ref = useReveal();
  return (
    <section
      ref={ref}
      className="relative bg-gw-midnight py-24 md:py-28 text-white overflow-hidden"
    >
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00A896 0%, transparent 70%)' }}
      />
      <div className="container-x relative">
        <div className="reveal mx-auto max-w-[700px] text-center">
          <span className="eyebrow">For Investors</span>
          <h2 className="h-section-light mt-3">
            We're Raising <span className="text-gw-teal">$50,000 Pre-Seed.</span>
          </h2>
          <p className="mt-6 text-lg text-white/75 leading-relaxed">
            We've proven demand with an 800% oversubscribed pilot, generated early
            revenue, and received Rwanda ICT Chamber certification. We're now expanding
            to 20 schools and formalizing our employer pipeline.{' '}
            <span className="text-white font-semibold">$500K pre-money valuation.</span>
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#" className="btn btn-primary text-base">
              <Download size={16} /> Download Pitch Deck
            </a>
            <a href="#contact" className="btn btn-ghost-teal text-base">
              <Calendar size={16} /> Schedule a Call
            </a>
          </div>

          <p className="mt-8 text-xs text-white/45">
            Certified by Rwanda ICT Chamber · Kigali, Rwanda · 2024
          </p>
        </div>
      </div>
    </section>
  );
}
