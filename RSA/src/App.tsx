import { useState } from "react";
import Instance from "./Instance";

const MAX_NUMBER = 1_000;

/**
 * Hauptkomponente für die Demonstration des Diffie-Hellman-Schlüsselaustauschs.
 *
 * @returns {JSX.Element} Die gerenderte App-Komponente.
 */
export default function App() {
  const [p, setP] = useState<number>(5); // Gemeinsame Primzahl
  const [g, setG] = useState<number>(25); // Gemeinsamer Generator

  const [pValid, setPValid] = useState(true);

  // 1. Private Schlüssel
  const [aPrivate, setAPrivate] = useState<number>(generateRandomNumber());
  const [bPrivate, setBPrivate] = useState<number>(generateRandomNumber());

  // 2. Öffentliche Schlüssel
  const aPublic = modPow(g, aPrivate, p);
  const bPublic = modPow(g, bPrivate, p);

  // 5. Gemeinsames Geheimnis
  const aSharedSecret = modPow(bPublic, aPrivate, p);
  const bSharedSecret = modPow(aPublic, bPrivate, p);

  // Validierung von p
  const validateP = (value: number) => {
    const valid = isPrime(value);
    setPValid(valid);
  };

  const handlePChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setP(value);
    validateP(value);
  };

  // Generierung gültiger Werte für p, g und die privaten Schlüssel
  const generateValues = () => {
    setP(generateRandomPrime());
    setPValid(true);

    // Festlegung von g auf 5 (kann angepasst werden)
    setG(generateRandomNumber());

    // Neue private Schlüssel generieren
    setAPrivate(generateRandomNumber());
    setBPrivate(generateRandomNumber());
  };

  return (
    <div className="min-h-screen p-5">
      <h1 className="mb-5 text-center text-3xl font-bold">Diffie-Hellman-Schlüsselaustausch</h1>
      <div className="mb-5 flex items-end justify-center">
        <div className="mr-5">
          <label className="mb-2 block font-semibold">Gemeinsame Primzahl (p):</label>
          <input
            type="number"
            value={p}
            onChange={handlePChange}
            className={`rounded border p-2 ${pValid ? "border-gray-300" : "border-2 border-red-500"}`}
          />
        </div>
        <div className="mr-5">
          <label className="mb-2 block font-semibold">Gemeinsamer Generator (g):</label>
          <input
            type="number"
            value={g}
            onChange={(e) => setG(parseInt(e.target.value))}
            className="rounded border border-gray-300 p-2"
          />
        </div>
        <button onClick={generateValues} className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800">
          Werte generieren
        </button>
      </div>

      <div className="flex justify-around">
        <Instance
          name="Alice"
          privateKey={aPrivate}
          publicKey={aPublic}
          sharedSecret={aSharedSecret}
          otherPublicKey={bPublic}
          p={p}
          g={g}
        />
        <Instance
          name="Bob"
          privateKey={bPrivate}
          publicKey={bPublic}
          sharedSecret={bSharedSecret}
          otherPublicKey={aPublic}
          p={p}
          g={g}
        />
      </div>
    </div>
  );
}

function generateRandomNumber(): number {
  return Math.floor(Math.random() * MAX_NUMBER);
}

/**
 * Berechnet die modulare Exponentiation.
 *
 * @param {number} base - Die Basiszahl.
 * @param {number} exponent - Der Exponent.
 * @param {number} modulus - Der Modulus.
 * @returns {number} Das Ergebnis von (base^exponent) % modulus.
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

/**
 * Überprüft, ob eine Zahl eine Primzahl ist.
 *
 * @param {number} n - Die zu überprüfende Zahl.
 * @returns {boolean} True, wenn n eine Primzahl ist, sonst False.
 */
function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function generateRandomPrime(): number {
  let random;
  do {
    random = generateRandomNumber();
  } while (!isPrime(random));
  return random;
}
