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

/**
 * Calculates the greatest common divisor (gcd) of two numbers using the Euclidean algorithm.
 * @param a - The first number.
 * @param b - The second number.
 * @returns The greatest common divisor of the two numbers.
 */
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Calculates the least common multiple (lcm) of two numbers using the greatest common divisor (gcd).
 * @param a - The first number.
 * @param b - The second number.
 * @returns The least common multiple of the two numbers.
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculates the modular multiplicative inverse of a number e modulo phi using the Extended Euclidean Algorithm.
 * @param e - The number to find the modular inverse of.
 * @param phi - The modulus.
 * @returns The modular multiplicative inverse of e modulo phi.
 */
export function modInverse(e: number, phi: number): number {
  const m0 = phi;
  let y = 0,
    x = 1;

  if (phi === 1) return 0;

  while (e > 1) {
    const q = Math.floor(e / phi);
    let t = phi;

    phi = e % phi;
    e = t;
    t = y;

    y = x - q * y;
    x = t;
  }

  if (x < 0) x += m0;

  return x;
}
