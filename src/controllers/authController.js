import {
  onAuthStateChange,
  signIn,
  signOut,
  signUp,
} from "../models/authModel";

const toAppUser = (user) =>
  user
    ? {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.email,
      }
    : null;

export const loginUser = async (credentials) => {
  const { data, error } = await signIn(credentials);
  if (error) throw error;
  return toAppUser(data.user);
};

export const registerUser = async (credentials) => {
  const { data, error } = await signUp(credentials);
  if (error) throw error;

  return {
    user: data.session ? toAppUser(data.user) : null,
    needsEmailConfirmation: !data.session,
  };
};

export const logoutUser = async () => {
  const { error } = await signOut();
  if (error) throw error;
};

export const subscribeToAuthChanges = (onChange) => {
  const {
    data: { subscription },
  } = onAuthStateChange((event, session) => {
    onChange(event, toAppUser(session?.user));
  });

  return () => subscription.unsubscribe();
};
