import React from "react";
import Katex from "../components/katex";

interface InstanceProps {
  name: string;
  privateKey: number;
  publicKey: number;
  sharedSecret: number;
  otherPublicKey: number;
  p: number;
  g: number;
}

/**
 * Komponente zur Darstellung einer Instanz (Alice oder Bob) und der Berechnungsschritte.
 *
 * @param {InstanceProps} props - Die Eigenschaften der Instanz.
 * @returns {JSX.Element} Die gerenderte Instanzkomponente.
 */
export default function Instance({
  name,
  privateKey,
  publicKey,
  sharedSecret,
  otherPublicKey,
  p,
  g,
}: InstanceProps): React.JSX.Element {
  const ownDigit = name === "Alice" ? "a" : "b";
  const otherDigit = name === "Alice" ? "b" : "a";

  return (
    <div className="w-full rounded-2xl border border-neutral-200 p-5 shadow-md dark:border-neutral-800">
      <h2 className="mb-3 text-2xl font-bold">{name}</h2>
      <ol className="list-inside list-decimal space-y-2">
        <li>
          <span className="font-semibold">Privater Schlüssel:</span>
          <br />
          <Katex texString={`${ownDigit.toLowerCase()} = ${privateKey}`} />
        </li>
        <li>
          <span className="font-semibold">Öffentlicher Schlüssel:</span>
          <br />
          <Katex texString={`${ownDigit.toUpperCase()} = g^{${ownDigit.toLowerCase()}} \\mod p `} />
          <Katex texString={`= ${g}^{${privateKey}} \\mod ${p}`} />
          <Katex texString={`= ${publicKey}`} />
        </li>
        <li>
          <span className="font-semibold">
            Sende <strong>{ownDigit.toUpperCase()}</strong>:
          </span>
          <br />
          <Katex texString={`${ownDigit.toUpperCase()} = ${publicKey}`} />
        </li>
        <li>
          <span className="font-semibold">Öffentlichen Schlüssel empfangen:</span>
          <br />
          <Katex texString={`${otherDigit.toUpperCase()} = ${otherPublicKey}`} />
        </li>
        <li>
          <span className="font-semibold">Gemeinsamen Schlüssel berechnen:</span>
          <br />
          <Katex texString={`s = ${otherDigit.toUpperCase()}^{${ownDigit.toLowerCase()}} \\mod{p}`} />
          <Katex texString={`= ${otherPublicKey}^{${privateKey}} \\mod ${p}`} />
          <Katex texString={`= ${sharedSecret}`} />
        </li>
      </ol>
    </div>
  );
}
