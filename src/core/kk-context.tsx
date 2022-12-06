import React, { createContext, useContext, useEffect, useState } from 'react';
import { KrisKringle } from './types';

const debug = true;

const KKContext = createContext<{
  kk: KrisKringle;
  setKK: React.Dispatch<React.SetStateAction<KrisKringle>>;
}>(undefined!);

export const useKKContext = () => useContext(KKContext);

export const KKProvider = ({ children }: { children: React.ReactNode }) => {
  const [kkState, setKKState] = useState<KrisKringle>({});

  if (debug) {
    useEffect(() => {
      console.log('KKContext', kkState);
    }, [kkState]);
  }

  return (
    <KKContext.Provider value={{ kk: kkState, setKK: setKKState }}>
      {children}
    </KKContext.Provider>
  );
};
