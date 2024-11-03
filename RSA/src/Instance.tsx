interface InstanceProps {
  name: string;
  privateKey: string;
  publicKey: string;
  sharedSecret: string;
  otherPublicKey: string;
}

export default function Instance({ name, privateKey, publicKey, sharedSecret, otherPublicKey }: InstanceProps) {
  return (
    <div className="w-1/3 rounded-2xl border p-5 shadow-md">
      <h2 className="mb-3 text-2xl font-bold">{name}</h2>
      <p>
        <span className="font-semibold">Privater Schlüssel:</span> {privateKey}
      </p>
      <p>
        <span className="font-semibold">Öffentlicher Schlüssel:</span> {publicKey}
      </p>
      <p>
        <span className="font-semibold">Empfangener öffentlicher Schlüssel:</span> {otherPublicKey}
      </p>
      <p className="mt-3">
        <span className="font-semibold">Gemeinsames Geheimnis:</span> {sharedSecret}
      </p>
    </div>
  );
}
