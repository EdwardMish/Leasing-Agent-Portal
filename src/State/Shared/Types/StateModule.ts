export interface StateModule {
    Actions: any;
    ActionTypes: any;
    reducer: <T>(state: T, initialState: T, action: any) => T;
    selectors: any;
    State: any;
    Types: any;
}