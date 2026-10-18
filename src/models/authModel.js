import { supabase } from "../lib/supabaseClient";

export const signIn = (credentials) =>
  supabase.auth.signInWithPassword(credentials);

export const signUp = (credentials) => supabase.auth.signUp(credentials);

export const signOut = () => supabase.auth.signOut();

export const onAuthStateChange = (callback) =>
  supabase.auth.onAuthStateChange(callback);
