// despachosStore.js
import { create } from 'zustand';

type State = {
  data: any[];
  page: number;
  totalPage: number; // Agrega el total de páginas
  totalRows: number; // Agrega el total de
  loading: boolean;
};

type Actions = {
  setData: (data: any[]) => void;
  setPage: (page: number) => void;
  setTotalRows: (totalRows: number) => void;
  setTotalPage: (totalPage: number) => void; // Acción para actualizar el total de páginas
  setLoading: (loading: boolean) => void;
};

export const useDespachosStore = create<State & Actions>((set) => ({
  data: [],
  page: 1,
  totalRows: 10,
  totalPage: 1, // Inicializa el total de páginas en 1
  loading: false,

  setData: (data) => set({ data }),
  setPage: (page) => set({ page }),
  setTotalPage: (totalPage) => set({ totalPage }), // Implementa la acción
  setLoading: (loading) => set({ loading }),
}));