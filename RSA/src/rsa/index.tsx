import { useEffect, useState } from "react";
import LabelInput from "../components/input/LabelInput";
import { isPrime, modPow } from "../utils/math";
import { gcd, lcm, modInverse } from "./utils";

export default function RsaPage() {
  const [p, setP] = useState<number>(3);
  const [q, setQ] = useState<number>(11);
  const [e, setE] = useState<number>(7);
  const [message, setMessage] = useState<number>(5);

  const [cipher, setCipher] = useState<number>();
  const [decrypted, setDecrypted] = useState<number>();

  const [n, setN] = useState<number>(0);
  useEffect(() => {
    setN(p * q);
  }, [p, q]);

  const [lambdaN, setLambdaN] = useState<number>(0);
  useEffect(() => {
    setLambdaN(lcm(p - 1, q - 1));
  }, [p, q]);

  const [d, setD] = useState<number>(0);
  useEffect(() => {
    setD(modInverse(e, lambdaN));
  }, [e, lambdaN]);

  useEffect(() => {
    handleEncrypt();
  }, [e, n, lambdaN, message]);

  useEffect(() => {
    handleDecrypt();
  }, [cipher]);

  const handleEncrypt = () => {
    if (gcd(e, lambdaN) !== 1) {
      return;
    }

    const encrypted = modPow(message, e, n);
    setCipher(encrypted);
  };

  const handleDecrypt = () => {
    const d = modInverse(e, lambdaN);
    if (d === 0) {
      return;
    }

    if (cipher) {
      const decryptedMessage = modPow(cipher, d, n);
      setDecrypted(decryptedMessage);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="mb-4 text-2xl font-bold">RSA Verschlüsselung</h1>
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex space-x-2">
            <h2 className="mr-5 self-center text-xl font-bold">1.</h2>
            <LabelInput
              label="Primzahl p"
              value={p}
              onChange={(e) => setP(parseInt(e.target.value))}
              type="number"
              isValid={isPrime(p)}
            />
            <LabelInput
              label="Primzahl q"
              value={q}
              onChange={(e) => setQ(parseInt(e.target.value))}
              type="number"
              isValid={isPrime(q)}
            />
          </div>

          <div className="flex space-x-2">
            <h2 className="mr-5 self-center text-xl font-bold">2.</h2>
            <text>
              n = |a * q = {p} * {q} = {n}
            </text>
          </div>

          <div className="flex space-x-2">
            <h2 className="mr-5 self-center text-xl font-bold">3.</h2>
            <text>
              λ(n) = lcm(λ({p}), λ({q})) = lcm({p}-1, {q}-1) = {lambdaN}
            </text>
          </div>

          <div className="flex space-x-2">
            <h2 className="mr-5 self-center text-xl font-bold">4.</h2>
            <LabelInput
              label="Öffentlicher Exponent e"
              value={e}
              onChange={(e) => setE(parseInt(e.target.value))}
              type="number"
              isValid={gcd(e, lambdaN) === 1 && 1 < e && e < lambdaN && modInverse(e, lambdaN) !== 0}
            />
            {modInverse(e, lambdaN) === 0 && <text className="text-red-500">Kein modulares Inverses gefunden.</text>}
            {gcd(e, lambdaN) !== 1 && <text className="text-red-500">e und λ(n) sind nicht teilerfremd.</text>}
          </div>

          <div className="flex space-x-2">
            <h2 className="mr-5 self-center text-xl font-bold">5.</h2>
            <text>
              d = e<sup>-1</sup> mod λ(n) = {e}
              <sup>-1</sup> mod {lambdaN} = {d}
            </text>
          </div>

          <LabelInput
            label="Nachricht (als Zahl)"
            type="number"
            value={message}
            onChange={(e) => setMessage(parseInt(e.target.value))}
          />
        </div>

        {cipher && (
          <div>
            <h2 className="text-xl font-bold">Verschlüsselte Nachricht:</h2>
            <text>
              c = m<sup>e</sup> (mod n) = {message} <sup>{e}</sup> (mod {n}) = {cipher}
            </text>
          </div>
        )}

        {decrypted && (
          <div>
            <h2 className="text-xl font-bold">Entschlüsselte Nachricht:</h2>
            <text>
              m = c<sup>d</sup> (mod n) = {cipher}
              <sup>{d}</sup> (mod {n}) = {decrypted}
            </text>
          </div>
        )}
      </div>
    </div>
  );
}
