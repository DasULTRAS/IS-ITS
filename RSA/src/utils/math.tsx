/**
 * Berechnet die modulare Exponentiation.
 *
 * @param {number} base - Die Basiszahl.
 * @param {number} exponent - Der Exponent.
 * @param {number} modulus - Der Modulus.
 * @returns {number} Das Ergebnis von (base^exponent) % modulus.
 */
export function modPow(base: number, exponent: number, modulus: number): number {
  if (modulus === 1) return 0;

  let result = 1;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    exponent = exponent >> 1; // exponent / 2
    base = (base * base) % modulus;
  }
  return result;
}

/**
 * Überprüft, ob eine Zahl eine Primzahl ist.
 *
 * @param {number} n - Die zu überprüfende Zahl.
 * @returns {boolean} True, wenn n eine Primzahl ist, sonst False.
 */
export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}
