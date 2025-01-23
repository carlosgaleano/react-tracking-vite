import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State={
    token:string,
    profile:any,
    isAuth:boolean
}
type Actions={
    setToken:(token:string)=>void
    setProfile:(profile:any)=>void
    logOut:()=>void
}

export const useAuthStore = create(persist<State & Actions>(
    (set)=>({
        token: "",
        profile: null,
        isAuth:false,
        
        setToken:(token:string) =>set((state)=>({
            token,
            isAuth: true
    })),
     setProfile:(profile:any)=>set((state)=>({
        profile
     })),
      logOut:()=>set((state)=>({
        token: '',
        profile:null,
        isAuth:false,
      }
      )),
 
 }),{
    name:'auth'
 }
 ))


