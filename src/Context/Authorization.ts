import { createContext, Dispatch, DispatchWithoutAction } from "react";

export interface iAuth {
  auth: string;
  SetAuth: (e: string) => void;
}

export const Authcontext = createContext<iAuth | null>(null);
