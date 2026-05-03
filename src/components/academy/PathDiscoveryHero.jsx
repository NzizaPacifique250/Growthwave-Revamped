import { Link } from 'react-router-dom';
import { Sparkles, Award, Compass } from 'lucide-react';
import { partnerLogos, platformStats } from '../../data/learningPaths.js';

export default function PathDiscoveryHero() {
  return (
    <section
      className="relative overflow-hidden bg-gw-midnight text-white pt-32 pb-20"
      id="path-discovery-hero"
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26, 47, 107, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 47, 107, 0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          transform: 'skewY(-2deg)',
        }}
      />
      <div
        className="absolute -top-32 right-0 h-[480px] w-[480px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00A896 0%, transparent 70%)' }}
      />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gw-teal/30 bg-gw-teal/10 px-3 py-1.5">
            <Sparkles size={14} /> Structured Learning Paths
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
            Choose Your Path to{' '}
            <span className="text-gw-teal">Industry Leadership</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Role-based tracks built with hiring partners. Start as a beginner, finish job-ready —
            with mentor reviews, real projects, and employer connections every step of the way.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#paths-grid" className="btn btn-primary">
              Browse All Paths
            </a>
            <Link
              to="/academy/assessment"
              className="btn btn-ghost-teal text-white border-white/30 hover:bg-white hover:text-gw-midnight inline-flex items-center gap-2"
            >
              <Compass size={16} /> Take the 5-min assessment
            </Link>
          </div>
          <p className="mt-3 text-xs text-white/50">
            Not sure which path? Get a personalized recommendation in under 5 minutes.
          </p>
        </div>

        {/* Trust strip */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-white/50 mb-3 inline-flex items-center gap-2">
              <Award size={14} className="text-gw-teal" /> Trusted by hiring partners
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {partnerLogos.map((logo) => (
                <span
                  key={logo}
                  className="font-display text-base font-semibold text-white/60"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>

          <dl
            id="discovery-stats"
            className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {platformStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3"
              >
                <dt className="text-[10px] uppercase tracking-wider text-white/55 font-semibold">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-xl font-bold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
