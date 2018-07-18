export interface QueryObject {
    [key: string]: QueryObject[keyof QueryObject];
    user?: string;
    org?: string;
    in?: string;
    size?: string;
    forks?: string;
    stars?: string;
    created?: string;
    pushed?: string;
    updated?: string;
    language?: string;
    topic?: string;
    topics?: string;
    license?: string;
    is?: string;
    mirror?: boolean; 
    archived?: boolean;
    addl?: string;
}

export interface Validators {
    [key: string]: Function;
    user: Function;
    org: Function;
    in: Function;
    size: Function;
    forks: Function;
    stars: Function;
    created: Function;
    pushed: Function;
    updated: Function;
    language: Function;
    topic: Function;
    topics: Function;
    license: Function;
    is: Function;
    mirror: Function; 
    archived: Function;
    addl: Function;
}
