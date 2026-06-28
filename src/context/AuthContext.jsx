import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth]       = useState(null);
  const [loading, setLoading] = useState(true);

  /* ── Helper: build our auth object from Supabase user + profile ── */
  const buildAuth = async (supabaseUser) => {
    if (!supabaseUser) { setAuth(null); return; }

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      let derivedRole = profile?.role || 'student';
      let derivedStatus = profile?.status || 'pending';

      // DEV HACK: Force role based on email/name for easier testing
      const emailLower = supabaseUser.email.toLowerCase();
      const nameLower = (profile?.name || '').toLowerCase();
      const isDevAdminOrProf = emailLower.includes('admin') || nameLower.includes('admin') || emailLower.includes('prof') || nameLower.includes('prof');
      
      if (isDevAdminOrProf) {
        derivedRole = emailLower.includes('admin') || nameLower.includes('admin') ? 'admin' : 'professor';
        derivedStatus = 'active';
      } else {
        // Enforce approval status for real users
        if (derivedStatus === 'pending' || derivedStatus === 'suspended') {
          await supabase.auth.signOut();
          setAuth(null);
          return;
        }
      }

      setAuth({
        id:         supabaseUser.id,
        email:      supabaseUser.email,
        name:       profile?.name        || supabaseUser.email.split('@')[0],
        role:       derivedRole,
        status:     derivedStatus,
        group:      profile?.group       || null,
        department: profile?.department  || null,
        rollNumber: profile?.roll_number || null,
        phone:      profile?.phone       || null,
      });
    } catch {
      // profile table may not exist yet — still set basic auth from supabase user
      setAuth({
        id:    supabaseUser.id,
        email: supabaseUser.email,
        name:  supabaseUser.email.split('@')[0],
        role:  'student',
      });
    }
  };

  /* ── On mount: restore existing session ── */
  useEffect(() => {
    let finished = false;

    // Safety timeout — if Supabase is slow/unreachable, still render after 3 s
    const timeout = setTimeout(() => {
      if (!finished) {
        finished = true;
        setLoading(false);
      }
    }, 3000);

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (finished) return;
        finished = true;
        clearTimeout(timeout);
        buildAuth(session?.user ?? null).finally(() => setLoading(false));
      })
      .catch(() => {
        if (finished) return;
        finished = true;
        clearTimeout(timeout);
        setLoading(false);
      });

    /* Listen for sign-in / sign-out events */
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        buildAuth(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  /* ── Login: email + password ── */
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Fetch profile and check account status
    const { data: profile } = await supabase
      .from('profiles')
      .select('status, role')
      .eq('id', data.user.id)
      .single();

    // Dev bypass for status checks
    const emailLower = email.toLowerCase();
    const isDevAdminOrProf = emailLower.includes('admin') || emailLower.includes('prof');

    if (!isDevAdminOrProf) {
      if (profile?.status === 'pending') {
        await supabase.auth.signOut();
        throw new Error('Your account is pending admin approval. Please wait for confirmation.');
      }
      if (profile?.status === 'suspended') {
        await supabase.auth.signOut();
        throw new Error('Your account has been suspended. Please contact the NSS Coordinator.');
      }
    }

    await buildAuth(data.user);
    return data;
  };

  /* ── Register: create account + profile row ── */
  const register = async ({ email, password, name, role = 'student', ...rest }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role } },
    });
    if (error) throw error;

    // Extra profile fields not covered by trigger
    await supabase
      .from('profiles')
      .update({
        status:      'pending',  // Requires admin approval
        phone:       rest.phone       || null,
        roll_number: rest.rollNumber  || null,
        department:  rest.department  || null,
        year:        rest.year        || null,
        group:       rest.group       || null,
      })
      .eq('id', data.user.id);

    // Sign out immediately so pending students don't automatically enter dashboard
    const isDevAdminOrProf = email.toLowerCase().includes('admin') || email.toLowerCase().includes('prof') || name.toLowerCase().includes('admin') || name.toLowerCase().includes('prof');
    if (!isDevAdminOrProf) {
      await supabase.auth.signOut();
    }

    return data;
  };

  /* ── Logout ── */
  const logout = async () => {
    await supabase.auth.signOut();
    setAuth(null);
  };

  /* ── Loading screen — prevents white flash ── */
  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0f4ff',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: '4px solid #e8eeff',
            borderTop: '4px solid #102167',
            borderRadius: '50%',
            animation: 'spin 0.9s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ marginTop: 16, color: '#102167', fontWeight: 700, fontSize: 14 }}>
          NSS Portal — Loading…
        </p>
      </div>
    );
  }

  const updateAuth = (updates) => {
    setAuth(prev => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout, loading, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
