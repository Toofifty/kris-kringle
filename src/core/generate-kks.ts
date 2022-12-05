import { choose } from '../util/rand';

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
  disallowedConnections: Record<string, string[]>
): [string, string][] => {
  const pairs: [string, string][] = [];

  const isDisallowed = (person: string, other: string) => {
    return (
      disallowedConnections[person]?.includes(other) ||
      disallowedConnections[other]?.includes(person)
    );
  };

  // brute force!
  people.forEach((person) => {
    const others = people
      // not this person
      .filter((other) => other !== person)
      // not disallowed
      .filter((other) => !isDisallowed(person, other))
      // not already paired
      .filter((other) => !pairs.some((pair) => pair[1] === other));

    if (others.length === 0) {
      console.log('failed attempt at creating pairs');
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
