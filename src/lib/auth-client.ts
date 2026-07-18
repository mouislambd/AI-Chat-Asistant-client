import { createAuthClient } from "better-auth/react";

const authClientRaw = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const { signIn, signUp, signOut } = authClientRaw;

export const useSession = () => {
  const session = authClientRaw.useSession();
  return {
    ...session,
    data: session.data
      ? {
          ...session.data,
          user: {
            ...session.data.user,
            role: (session.data.user as any).role as "student" | "mentor" | "admin",
          },
        }
      : null,
  };
};

export const authClient = {
  ...authClientRaw,
  useSession,
};
