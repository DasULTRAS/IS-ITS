import { isPrime } from "./math";

/**
 * Generiert eine zufällige Zahl.
 *
 * @returns {number} Eine zufällige Zahl.
 */
export function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Generiert eine zufällige Primzahl.
 *
 * @returns {number} Eine zufällige Primzahl.
 */
export function generateRandomPrime(max: number): number {
  let random;
  do {
    random = generateRandomNumber(max);
  } while (!isPrime(random));
  return random;
}
