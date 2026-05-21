import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, User, Phone, Mail, Briefcase, Zap } from 'lucide-react';
import { supabase } from './lib/supabase';

const SERVICES = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Digital Marketing',
  'Cloud Solutions',
  'Consulting',
  'Other',
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

function App() {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    service: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const { error } = await supabase.from('leads').insert({
      full_name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      service: form.service,
    });

    if (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      return;
    }

    setStatus('success');
    setForm({ name: '', phone: '', email: '', service: '' });
  };

  const isValid = form.name.trim() && form.phone.trim() && form.email.trim() && form.service;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            Lead<span className="text-amber-500">Flow</span>
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          {/* Hero text */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              Capture Every{' '}
              <span className="text-amber-500">Opportunity</span>
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed max-w-md mx-auto">
              Submit your details and let us connect you with the right service. Fast, simple, seamless.
            </p>
          </div>

          {/* Card */}
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-8 shadow-2xl shadow-black/40">
            {status === 'success' ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-5">
                  <CheckCircle className="w-9 h-9 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Lead Captured</h2>
                <p className="text-gray-200 mb-6">
                  We received your information. Our team will reach out shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
                >
                  Submit another lead
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Service Interested In
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                      id="service"
                      required
                      value={form.service}
                      onChange={(e) => updateField('service', e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-all cursor-pointer"
                    >
                      <option value="" disabled className="text-gray-400">
                        Select a service
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s} className="bg-[#111111] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isValid || status === 'submitting'}
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/30 disabled:cursor-not-allowed text-black font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-all duration-200 mt-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Lead
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer note */}
          <p className="text-center text-gray-400 text-xs mt-6">
            Your information is secure and will never be shared with third parties.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
