import { IPerson } from "./person.model";

export interface ISearchPersonResult {
    personList: IPerson[];
    personCount: number;
}
