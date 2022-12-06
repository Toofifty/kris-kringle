export type KrisKringle = {
  individuals?: Record<string, string>;
  groups?: Record<string, string[]>;
  disallowedConnections?: Record<string, string[]>;
  force?: boolean;
  results?: [string, string][];
  view?: 'secret' | 'all';
};
