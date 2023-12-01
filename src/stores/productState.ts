import { atom } from "recoil";
import { DocumentData } from "firebase/firestore";

export const productsState = atom<DocumentData[]>({
  key: "productsState",
  default: [],
});
