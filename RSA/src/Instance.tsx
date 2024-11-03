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
export default function Instance({ name, privateKey, publicKey, sharedSecret, otherPublicKey, p, g }: InstanceProps) {
  return (
    <div className="w-1/3 rounded-2xl border p-5 shadow-md">
      <h2 className="mb-3 text-2xl font-bold">{name}</h2>
      <ol className="list-inside list-decimal space-y-2">
        <li>
          <span className="font-semibold">Privaten Schlüssel wählen:</span>
          <br />
          <strong>a = {privateKey}</strong>.
        </li>
        <li>
          <span className="font-semibold">Öffentlichen Schlüssel berechnen:</span>
          <br />A = g<sup>a</sup> mod p = {g}
          <sup>{privateKey}</sup> mod {p} = <strong>{publicKey}</strong>
        </li>
        <li>
          <span className="font-semibold">Öffentlichen Schlüssel senden:</span>
          <br />A = {publicKey}
        </li>
        <li>
          <span className="font-semibold">Öffentlichen Schlüssel empfangen:</span>
          <br />B = {otherPublicKey}
        </li>
        <li>
          <span className="font-semibold">Gemeinsamen Schlüssel berechnen:</span>
          <br />s = B<sup>a</sup> mod p
          <br />= {otherPublicKey}
          <sup>{privateKey}</sup> mod {p} = <strong>{sharedSecret}</strong>
        </li>
      </ol>
    </div>
  );
}
