import { apiStatusCode } from "./apiStatusCode";

export class Output {
    constructor (
        public readonly apiStatusCode: apiStatusCode,
        public readonly data?: any
    ){
    }
}