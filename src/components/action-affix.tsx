import { Affix } from '@mantine/core';
import React from 'react';

export const ActionAffix = ({ children }: { children: React.ReactNode }) => (
  <Affix position={{ bottom: 20, right: 20 }}>{children}</Affix>
);
