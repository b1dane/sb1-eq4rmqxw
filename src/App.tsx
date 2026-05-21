import { useState } from 'react';
import { Send, User, Phone, Mail, Briefcase, Zap } from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: err } = await supabase.from('leads').insert({
      full_name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      service: e.target.service.value,
    });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-[#111111] border border-white/10 rounded-2xl p-8">
        {success ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Lead Captured!</h2>
            <button onClick={() => window.location.reload()} className="text-amber-500">Submit another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold mb-6">LeadFlow Capture</h1>
            <input name="name" placeholder="Full Name" required className="w-full bg-black border border-white/10 p-3 rounded-lg" />
            <input name="phone" placeholder="Phone" required className="w-full bg-black border border-white/10 p-3 rounded-lg" />
            <input name="email" type="email" placeholder="Email" required className="w-full bg-black border border-white/10 p-3 rounded-lg" />
            <select name="service" required className="w-full bg-black border border-white/10 p-3 rounded-lg">
              <option value="Consulting">Consulting</option>
              <option value="Other">Other</option>
            </select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button disabled={loading} className="w-full bg-amber-500 p-3 rounded-lg font-bold text-black">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
export default App;
