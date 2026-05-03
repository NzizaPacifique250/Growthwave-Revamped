import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Linkedin,
  Twitter,
  Instagram,
} from 'lucide-react';
import { useReveal } from '../hooks.js';

const audienceOptions = [
  'School / Principal',
  'Student or Parent',
  'Employer / Hiring Manager',
  'Investor',
  'Partner / NGO',
  'Other',
];

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({
    name: '',
    email: '',
    org: '',
    audience: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = true;
    if (!form.audience) e.audience = true;
    if (!form.message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="contact" className="bg-white py-24 md:py-28">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left — form */}
        <div className="lg:col-span-7 reveal">
          <span className="eyebrow">Contact</span>
          <h2 className="h-section mt-3">Get in Touch.</h2>
          <p className="mt-3 text-gw-slate">
            Tell us who you are and how we can help build the infrastructure together.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-2xl bg-gw-ice border border-gw-teal/40 p-8 text-center">
              <p className="font-display text-xl font-bold text-gw-navy">
                Thank you, {form.name.split(' ')[0]}!
              </p>
              <p className="mt-2 text-gw-slate">
                We'll be in touch at <span className="font-semibold">{form.email}</span> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name" required error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  className={inputClass(errors.name)}
                  placeholder="Your name"
                />
              </Field>

              <Field label="Email" required error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  className={inputClass(errors.email)}
                  placeholder="you@email.com"
                />
              </Field>

              <Field label="Organization (optional)">
                <input
                  type="text"
                  value={form.org}
                  onChange={update('org')}
                  className={inputClass(false)}
                  placeholder="School / company name"
                />
              </Field>

              <Field label="I am a..." required error={errors.audience}>
                <select
                  value={form.audience}
                  onChange={update('audience')}
                  className={inputClass(errors.audience)}
                >
                  <option value="">Select one</option>
                  {audienceOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <Field label="Message" required error={errors.message}>
                  <textarea
                    value={form.message}
                    onChange={update('message')}
                    rows={5}
                    className={inputClass(errors.message)}
                    placeholder="Tell us a little about your goals..."
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-navy w-full sm:w-auto px-10 text-base">
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right — contact details */}
        <div className="lg:col-span-5 reveal">
          <div className="rounded-2xl bg-gw-ice p-8">
            <h3 className="font-display text-lg font-bold text-gw-ink">Contact Details</h3>

            <ul className="mt-6 space-y-4 text-[15px]">
              <Detail icon={Mail} label="Email" value="info@growthwave.rw" />
              <Detail icon={Phone} label="Phone" value="+250 7955 955 78" />
              <Detail icon={MapPin} label="Location" value="Kigali, Rwanda" />
              <Detail
                icon={Clock}
                label="Office hours"
                value="Mon–Fri 8AM–6PM · Sat 9AM–2PM"
              />
            </ul>

            <a
              href="https://wa.me/250795595578"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#1FB856] text-white font-semibold py-3 transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              <MessageCircle size={18} /> Chat with Us on WhatsApp
            </a>

            <div className="mt-7 pt-6 border-t border-gw-navy/10">
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-gw-slate">
                Follow us
              </p>
              <div className="mt-3 flex gap-3">
                {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social link"
                    className="h-10 w-10 rounded-lg bg-white border border-gw-navy/10 flex items-center justify-center text-gw-navy hover:bg-gw-navy hover:text-white transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className={`text-sm font-semibold ${error ? 'text-red-600' : 'text-gw-ink'}`}>
        {label}
        {required && <span className="text-gw-teal"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-600">This field is required.</span>}
    </label>
  );
}

function inputClass(error) {
  return `w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gw-ink placeholder:text-gw-slate/60 focus:outline-none focus:ring-2 focus:ring-gw-teal/40 transition ${
    error ? 'border-red-500' : 'border-gw-navy/15 focus:border-gw-teal'
  }`;
}

function Detail({ icon: Icon, label, value }) {
  return (
    <li className="flex items-start gap-3">
      <span className="h-9 w-9 shrink-0 rounded-lg bg-white text-gw-navy border border-gw-navy/10 flex items-center justify-center">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-gw-slate font-semibold">
          {label}
        </p>
        <p className="text-gw-ink">{value}</p>
      </div>
    </li>
  );
}
