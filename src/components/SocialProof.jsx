const partners = [
  'MINICT',
  'Rwanda ICT Chamber',
  'Agahozo Shalom Youth Village',
  'Good Karma',
  'RWOTA',
  'CMU-Africa',
  'Zipline',
  'Irembo',
];

export default function SocialProof() {
  return (
    <section id="partners" className="bg-gw-ice py-8 border-y border-gw-navy/5">
      <div className="container-x flex flex-col lg:flex-row items-center gap-6">
        <span className="text-xs uppercase tracking-[0.18em] font-semibold text-gw-slate shrink-0">
          Trusted &amp; certified by
        </span>
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 flex-1">
          {partners.map((p) => (
            <div
              key={p}
              className="text-sm font-semibold text-gw-navy/70 hover:text-gw-navy transition-colors px-3 py-1.5 rounded border border-gw-navy/10 bg-white"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
