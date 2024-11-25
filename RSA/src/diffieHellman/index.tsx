import { useState } from "react";
import Instance from "./Instance";
import Input from "../components/input";
import LabelInput from "../components/input/LabelInput";
import { modPow, isPrime } from "../utils/math";

const MAX_NUMBER = 1_000;

/**
 * Hauptkomponente für die Demonstration des Diffie-Hellman-Schlüsselaustauschs.
 *
 * @returns {JSX.Element} Die gerenderte App-Komponente.
 */
export default function DiffieHellman() {
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
    <div className="p-5">
      <h1 className="mb-5 text-center text-3xl font-bold">Diffie-Hellman-Schlüsselaustausch</h1>
      <div className="mb-5 flex items-end justify-center space-x-5">
        <LabelInput
          labelProps={{ className: "max-w-64" }}
          label="Gemeinsame Primzahl (p):"
          value={p}
          onChange={handlePChange}
          isValid={pValid}
        />
        <LabelInput
          labelProps={{ className: "max-w-64" }}
          label="Gemeinsamer Generator (g):"
          value={g}
          onChange={(e) => setG(parseInt(e.target.value))}
        />
        <button
          onClick={generateValues}
          className="self-end rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-800"
        >
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

function generateRandomPrime(): number {
  let random;
  do {
    random = generateRandomNumber();
  } while (!isPrime(random));
  return random;
}
