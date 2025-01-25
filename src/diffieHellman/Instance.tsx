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
  return (
    <div className="w-full rounded-2xl border border-neutral-200 p-5 shadow-md dark:border-neutral-800">
      <h2 className="mb-3 text-2xl font-bold">{name}</h2>
      <ol className="list-inside list-decimal space-y-2">
        <li>
          <span className="font-semibold">Privater Schlüssel:</span>
          <br />
          <Katex texString={`a = ${privateKey}`} />
        </li>
        <li>
          <span className="font-semibold">Öffentlicher Schlüssel:</span>
          <br />
          <Katex texString={`A = g^{a} \\mod p `} />
          <Katex texString={`= ${g}^{${privateKey}} \\mod ${p}`} />
          <Katex texString={`= ${publicKey}`} />
        </li>
        <li>
          <span className="font-semibold">
            Sende <strong>A</strong>:
          </span>
          <br />
          <Katex texString={`A = ${publicKey}`} />
        </li>
        <li>
          <span className="font-semibold">Öffentlichen Schlüssel empfangen:</span>
          <br />
          <Katex texString={`B = ${otherPublicKey}`} />
        </li>
        <li>
          <span className="font-semibold">Gemeinsamen Schlüssel berechnen:</span>
          <br />
          <Katex texString={`s = B^{a} \\mod{p}`} />
          <Katex texString={`= ${otherPublicKey}^{${privateKey}} \\mod ${p}`} />
          <Katex texString={`= ${sharedSecret}`} />
        </li>
      </ol>
    </div>
  );
}
