import { Briefcase, BadgeDollarSign, Building2 } from 'lucide-react';

export default function CareerOutcomes({ path }) {
  return (
    <div className="rounded-2xl bg-gw-ice/60 border border-gw-navy/10 p-6 md:p-8">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-display text-xs font-bold text-gw-teal uppercase tracking-[0.18em]">
          Career outcomes
        </span>
      </div>
      <h3 className="font-display text-2xl font-bold text-gw-ink">
        Where graduates land
      </h3>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card icon={Briefcase} label="Sample job titles">
          <ul className="space-y-1.5">
            {path.jobTitles.map((j) => (
              <li key={j} className="text-sm text-gw-ink leading-snug">
                {j}
              </li>
            ))}
          </ul>
        </Card>

        <Card icon={BadgeDollarSign} label="Salary range">
          <div className="font-display text-2xl font-bold text-gw-ink">
            {path.salaryRange}
          </div>
          <p className="text-xs text-gw-slate mt-1 leading-relaxed">
            Annualized for full-time roles. Internships and contract roles vary.
          </p>
        </Card>

        <Card icon={Building2} label="Hiring partners">
          <div className="flex flex-wrap gap-1.5">
            {path.employerLogos.map((logo) => (
              <span
                key={logo}
                className="text-[11px] px-2.5 py-1 rounded-md bg-white text-gw-navy font-semibold border border-gw-navy/10"
              >
                {logo}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({ icon: Icon, label, children }) {
  return (
    <div className="rounded-xl bg-white border border-gw-navy/10 p-5">
      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-3">
        <Icon size={12} /> {label}
      </div>
      {children}
    </div>
  );
}
