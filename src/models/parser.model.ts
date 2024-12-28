export interface Parser<T> {
  dump: (parsed: T) => string;
  format: (parsed: T) => string;
}
