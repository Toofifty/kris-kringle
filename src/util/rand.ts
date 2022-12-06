import { MantineColor } from '@mantine/core';

export const randint = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const choose = <T>(arr: T[]): T => {
  return arr[randint(arr.length)];
};

export const shuffle = <T>(arr: T[]): T[] =>
  arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

export const randColor = (seed: string): MantineColor => {
  const n = seed
    .split('')
    .map((c) => c.charCodeAt(0))
    .reduce((a, b) => a + b);

  return [
    'red',
    'pink',
    'grape',
    'violet',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'orange',
  ][n % 12];
};

export const randXmasName = () =>
  choose([
    'Santa Claus',
    'Rudolph the Red-Nosed Reindeer',
    'Frosty the Snowman',
    'The Grinch',
    'The Abominable Snowman',
    'The Gingerbread Man',
    'The Nutcracker',
  ]);
