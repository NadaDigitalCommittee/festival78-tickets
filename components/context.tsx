import { Raffle } from "@prisma/client";
import { createContext } from "react";
export const RaffleResultContext = createContext<Raffle[] | undefined>(
    undefined
  );