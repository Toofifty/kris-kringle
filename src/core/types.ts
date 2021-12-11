export type KrisKringle = {
  people?: Record<string, string>;
  disallowedConnections?: Record<string, string[]>;
  results?: [string, string][];
  view?: 'secret' | 'all';
};
