import { Observable } from 'rxjs';

export class BaseFacadeService<T, V> {
  currentStateService: T;

  constructor(state: T) {
    this.currentStateService = state;
  }

  initialize = (): void => this.currentStateService['initialState']();

  stateChange = (): Observable<V> => this.currentStateService['stateChanged'];

  updateSpecificState = <U>(data: U, stateKey: string): void =>
    this.currentStateService['updateSpecificState']<U>(data, stateKey);

  // eslint-disable-next-line max-len
  specificStateChange = <U>(stateKey: string, allowFilter: boolean = true): Observable<U> =>
    this.currentStateService['specificStateChange']<U>(stateKey, allowFilter);

  stateChangeWithStarter = <U>(stateKey: string, allowFilter = true): Observable<U> =>
    this.currentStateService['stateChangesWithStarter']<U>(stateKey, allowFilter);

  specificGlobalStateChange = <U>(stateKey: string): Observable<U> =>
    this.currentStateService['specificGlobalStateChange']<U>(stateKey);

  getSpecificState = <U>(state?: string): U =>
    state ? this.currentStateService['getStateProperty'](state) : this.currentStateService['getSpecificState']();
}
