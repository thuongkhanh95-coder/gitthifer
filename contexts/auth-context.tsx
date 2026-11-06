"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
type AuthValue = { user: User | null; loading: boolean; signOut: () => Promise<void> };
const AuthContext = createContext<AuthValue>({ user: null, loading: true, signOut: async () => {} });
export function AuthProvider({ children }: { children: ReactNode }) {
 const [user, setUser] = useState<User | null>(null); const [loading, setLoading] = useState(true);
 useEffect(() => { if (!supabase) { setLoading(false); return; } let alive = true; supabase.auth.getSession().then(({ data }) => { if (alive) { setUser(data.session?.user ?? null); setLoading(false); } }); const { data: listener } = supabase.auth.onAuthStateChange((_event, session: Session | null) => { setUser(session?.user ?? null); setLoading(false); }); return () => { alive = false; listener.subscription.unsubscribe(); }; }, []);
 const signOut = async () => { if (supabase) await supabase.auth.signOut(); setUser(null); };
 return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
