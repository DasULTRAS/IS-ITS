import { useState } from "react";

import Instance from "./Instance";

/**
 * The main component for the Diffie-Hellman key exchange demonstration.
 *
 * @returns {JSX.Element} The rendered App component.
 */
export default function App() {
  const [p, setP] = useState(23); // Gemeinsame Primzahl
  const [g, setG] = useState(5); // Gemeinsamer Generator

  // Zufällige private Schlüssel für Alice und Bob
  const [aPrivate, setAPrivate] = useState(Math.floor(Math.random() * 100));
  const [bPrivate, setBPrivate] = useState(Math.floor(Math.random() * 100));

  // Öffentliche Schlüssel
  const aPublic = modPow(g, aPrivate, p);
  const bPublic = modPow(g, bPrivate, p);

  // Gemeinsames Geheimnis
  const aSharedSecret = modPow(bPublic, aPrivate, p);
  const bSharedSecret = modPow(aPublic, bPrivate, p);

  return (
    <div className="min-h-screen p-5">
      <h1 className="mb-5 text-center text-3xl font-bold">Diffie-Hellman-Schlüsselaustausch</h1>
      <div className="mb-5 flex justify-center">
        <div className="mr-5">
          <label className="mb-2 block font-semibold">Gemeinsame Primzahl (p):</label>
          <input type="number" value={p} onChange={(e) => setP(parseInt(e.target.value))} />
        </div>
        <div>
          <label className="mb-2 block font-semibold">Gemeinsamer Generator (g):</label>
          <input type="number" value={g} onChange={(e) => setG(parseInt(e.target.value))} />
        </div>
      </div>

      <div className="flex justify-around">
        <Instance
          name="Alice"
          privateKey={aPrivate}
          publicKey={aPublic}
          sharedSecret={aSharedSecret}
          otherPublicKey={bPublic}
        />
        <Instance
          name="Bob"
          privateKey={bPrivate}
          publicKey={bPublic}
          sharedSecret={bSharedSecret}
          otherPublicKey={aPublic}
        />
      </div>
    </div>
  );
}

/**
 * Computes the modular exponentiation.
 *
 * @param {number} base - The base number.
 * @param {number} exponent - The exponent number.
 * @param {number} modulus - The modulus number.
 * @returns {number} The result of (base^exponent) % modulus.
 */
function modPow(base: number, exponent: number, modulus: number): number {
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
