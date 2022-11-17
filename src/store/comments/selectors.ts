import { NameSpace } from "../../const";
import { State } from "../../types/state";

export const getComments = (state: State): number[] | null => state[NameSpace.comments].comments;
