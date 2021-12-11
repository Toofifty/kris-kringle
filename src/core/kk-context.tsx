import React, { createContext, useContext, useState } from 'react';
import { KrisKringle } from './types';

const KKContext = createContext<{
  kk: KrisKringle;
  setKK: (data: KrisKringle) => void;
}>(undefined!);

export const useKKContext = () => useContext(KKContext);

export const KKProvider = ({ children }: { children: React.ReactNode }) => {
  const [kkState, setKKState] = useState<KrisKringle>({
    people: {
      '1': 'Apple',
      '2': 'Banana',
      '3': 'Cherry',
      '4': 'Date',
      '5': 'Elderberry',
      '6': 'Fig',
      '7': 'Grape',
      '8': 'Honeydew',
      '9': 'Jackfruit',
      '10': 'Kiwi',
      '11': 'Lemon',
    },
  });

  return (
    <KKContext.Provider value={{ kk: kkState, setKK: setKKState }}>
      {children}
    </KKContext.Provider>
  );
};
