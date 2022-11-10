export declare type CreateGlobalStateReturn<T> = () => T
/**
 * Keep states in the global scope to be reusable across Vue instances.
 *
 * @see https://vueuse.org/createGlobalState
 * @param stateFactory A factory function to create the state
 */
export declare function createGlobalState<T>(
  stateFactory: () => T
): CreateGlobalStateReturn<T>
