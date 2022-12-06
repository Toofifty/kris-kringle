import { choose, shuffle } from '~/util/rand';

export class NoConnectionError extends Error {
  constructor(public uuid: string) {
    super('No connection');
  }
}

export class FailedToGenerateError extends Error {
  constructor() {
    super('Failed to generate');
  }
}

export const generate = (
  people: string[],
  disallowedConnections: Record<string, string[]>,
  force?: boolean
): [string, string][] => {
  const pairs: [string, string][] = [];

  const isDisallowed = (person: string, other: string) =>
    disallowedConnections[person]?.includes(other) ||
    disallowedConnections[other]?.includes(person);

  // brute force!
  shuffle(people).forEach((person, i) => {
    const others = people
      // not this person
      .filter((other) => other !== person)
      // not already paired
      .filter((other) => !pairs.some((pair) => pair[1] === other))
      // not disallowed
      // if forcing, ignore rule for the last person
      .filter(
        (other) =>
          !isDisallowed(person, other) || (force && i === people.length - 1)
      );

    if (others.length === 0) {
      console.log(
        `failed attempt at creating pairs ${force ? '(forced)' : ''}`
      );
      console.table(pairs);
      throw new NoConnectionError(person);
    }

    pairs.push([person, choose(others)]);
  });

  if (pairs.length !== people.length) {
    console.log('failed attempt at creating pairs');
    console.table(pairs);
    debugger;
    throw new FailedToGenerateError();
  }

  return pairs;
};
