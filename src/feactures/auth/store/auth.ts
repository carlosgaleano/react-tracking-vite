/**
 * @Author: Carlos Galeano
 * @Date:   2025-02-18 16:22:38
 * @Last Modified by:   Carlos Galeano
 * @Last Modified time: 2025-02-18 17:54:04
 */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type State = {
  token: string;
  profile: any;
  isAuth: boolean;
  loading: boolean; // Agrega el estado loading
};

type Actions = {
  setToken: (token: string) => void;
  setProfile: (profile: any) => void;
  logOut: () => void;
  setLoading: (loading: boolean) => void; // Agrega la acción setLoading
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      profile: null,
      isAuth: false,
      loading: false, // Inicializa loading en false

      setToken: (token: string) =>
        set((state) => ({
          token,
          isAuth: true,
        })),
      setProfile: (profile: any) =>
        set((state) => ({
          profile,
        })),
      logOut: () =>
        set((state) => ({
          token: "",
          profile: null,
          isAuth: false,
        })),
      setLoading: (loading: boolean) => set((state) => ({ loading })), // Actualiza loading
    }),
    {
      name: "auth",
    }
  )
);


