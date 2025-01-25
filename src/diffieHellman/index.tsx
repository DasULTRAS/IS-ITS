import { useState } from "react";
import LabelInput from "../components/input/LabelInput";
import { isPrime, modPow } from "../utils/math";
import { generateRandomNumber, generateRandomPrime } from "../utils/random";
import Instance from "./Instance";

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
  const [aPrivate, setAPrivate] = useState<number>(generateRandomNumber(MAX_NUMBER));
  const [bPrivate, setBPrivate] = useState<number>(generateRandomNumber(MAX_NUMBER));

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
    setP(generateRandomPrime(MAX_NUMBER));
    setPValid(true);

    // Festlegung von g auf 5 (kann angepasst werden)
    setG(generateRandomNumber(MAX_NUMBER));

    // Neue private Schlüssel generieren
    setAPrivate(generateRandomNumber(MAX_NUMBER));
    setBPrivate(generateRandomNumber(MAX_NUMBER));
  };

  return (
    <div className="flex max-w-2xl flex-col space-y-5">
      <h1 id="diffie-hellman">Diffie-Hellman-Schlüsselaustausch</h1>
      <div className="flex items-end justify-center space-x-5">
        <LabelInput
          labelProps={{ className: "" }}
          label="Gemeinsame Primzahl (p):"
          type="number"
          value={p}
          onChange={handlePChange}
          isValid={pValid}
        />
        <LabelInput
          labelProps={{ className: "" }}
          label="Gemeinsamer Generator (g):"
          type="number"
          value={g}
          onChange={(e) => setG(parseInt(e.target.value))}
        />
      </div>

      <button onClick={generateValues} className="self-center">
        Werte generieren
      </button>

      <div className="flex justify-center space-x-5">
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
