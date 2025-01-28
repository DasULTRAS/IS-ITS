import { useMemo, useState } from "react";
import LabelInput from "../components/input/LabelInput";
import Katex from "../components/katex";
import * as math from "../utils/math";

export default function RsaPage() {
  const [p, setP] = useState<number>(3);
  const [q, setQ] = useState<number>(11);
  const [e, setE] = useState<number>(7);
  const [message, setMessage] = useState<number>(5);

  const n = useMemo<number>(() => p * q, [p, q]);
  const lambdaN = useMemo<number>(() => math.lcm(p - 1, q - 1), [p, q]);
  const d = useMemo<number>(() => math.extendedEuclideanAlgorithm(e, lambdaN), [e, lambdaN]);

  const cipher = useMemo<number>(() => {
    if (math.gcd(e, lambdaN) !== 1) {
      return 0;
    }

    const encrypted = math.modPow(message, e, n);
    return encrypted;
  }, [e, n, lambdaN, message]);

  const decrypted = useMemo<number>(() => {
    if (d === 0) {
      return 0;
    }

    if (cipher) {
      const decryptedMessage = math.modPow(cipher, d, n);
      return decryptedMessage;
    } else {
      return 0;
    }
  }, [cipher, d, n]);

  return (
    <div className="flex max-w-2xl flex-col space-y-5">
      <h1 id="rsa">RSA Verschlüsselung</h1>

      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex space-x-2">
            <h2 className="mr-5 self-center text-xl font-bold">1.</h2>
            <LabelInput
              label="p (Primzahl)"
              value={p}
              onChange={(e) => setP(parseInt(e.target.value))}
              type="number"
              isValid={math.isPrime(p)}
            />
            <LabelInput
              label="q (Primzahl)"
              value={q}
              onChange={(e) => setQ(parseInt(e.target.value))}
              type="number"
              isValid={math.isPrime(q)}
            />
          </div>

          <div className="flex space-x-2">
            <h2 className="mr-5 self-center text-xl font-bold">2.</h2>
            <Katex texString={`n=p \\cdot q = ${p} \\cdot ${q} = ${n}`} />
          </div>

          <div className="flex space-x-2">
            <h2 className="mr-5 self-center text-xl font-bold">3.</h2>
            <div>
              <Katex texString={`\\lambda (n) = \\text{lcm}(\\lambda (p), \\lambda (q)) = \\text{lcm}(p-1, q-1)`} />
              <Katex texString={`= \\text{lcm}(${p}-1, ${q}-1) = ${lambdaN}`} />
            </div>
          </div>

          <div className="flex space-x-2">
            <h2 className="mr-5 self-center text-xl font-bold">4.</h2>
            <div className="block w-full">
              <LabelInput
                label="Öffentlicher Exponent e"
                value={e}
                onChange={(e) => setE(parseInt(e.target.value))}
                type="number"
                isValid={
                  math.gcd(e, lambdaN) === 1 &&
                  1 < e &&
                  e < lambdaN &&
                  math.extendedEuclideanAlgorithm(e, lambdaN) !== 0
                }
              />
              {math.extendedEuclideanAlgorithm(e, lambdaN) === 0 && (
                <text className="text-red-500">Kein modulares Inverses gefunden.</text>
              )}
              {math.gcd(e, lambdaN) !== 1 && <text className="text-red-500">e und λ(n) sind nicht teilerfremd.</text>}
            </div>
          </div>

          <div className="flex space-x-2">
            <h2 className="mr-5 self-center text-xl font-bold">5.</h2>
            <div>
              <Katex texString={`d = e^{-1} \\mod{\\lambda (n)}`} />
              <Katex texString={`= ${e}^{-1} \\mod{${lambdaN}} = ${d}`} />
            </div>
          </div>
        </div>

        <LabelInput
          label="Nachricht (als Zahl)"
          type="number"
          value={message}
          onChange={(e) => setMessage(parseInt(e.target.value))}
        />

        {cipher && (
          <div>
            <h2 className="text-xl font-bold">Verschlüsselte Nachricht:</h2>
            <Katex texString={`c = m^e \\mod{n} = ${message}^{${e}} \\mod{${n}} = ${cipher}`} />
          </div>
        )}

        {decrypted && (
          <div>
            <h2 className="text-xl font-bold">Entschlüsselte Nachricht:</h2>
            <Katex texString={`m = c^d \\mod{n} = ${cipher}^{${d}} \\mod{${n}} = ${decrypted}`} />
          </div>
        )}
      </div>
    </div>
  );
}
