export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Least common multiple (from the greatest common divisor (gcd))
 * @param a 
 * @param b 
 * @returns 
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export function modInverse(e: number, phi: number): number {
  let m0 = phi;
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
