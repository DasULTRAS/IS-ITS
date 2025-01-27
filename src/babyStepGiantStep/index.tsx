import { useState } from "react";
import LabelInput from "../components/input/LabelInput";
import Katex from "../components/katex";
import { modPow } from "../utils/math";

/**
 * Implementierung des Baby-Step Giant-Step Algorithmus zur Berechnung des diskreten Logarithmus.
 *
 * @returns {JSX.Element} Die gerenderte Komponente.
 */
export default function BabyStepGiantStep() {
  const [g, setG] = useState<number>(2);
  const [h, setH] = useState<number>(22);
  const [p, setP] = useState<number>(29);
  const [result, setResult] = useState<number | null>(null);

  const calculateDiscreteLog = () => {
    const m = Math.ceil(Math.sqrt(p - 1));
    const babySteps: Record<number, number> = {};

    // Baby Step
    for (let j = 0; j < m; j++) {
      babySteps[modPow(g, j, p)] = j;
    }

    // Giant Step
    const factor = modPow(g, m * (p - 2), p);
    let giantStep = h;

    for (let i = 0; i < m; i++) {
      if (babySteps[giantStep] !== undefined) {
        setResult(i * m + babySteps[giantStep]);
        return;
      }
      giantStep = (giantStep * factor) % p;
    }

    setResult(null); // Keine Lösung gefunden
  };

  return (
    <div className="flex max-w-2xl flex-col space-y-5">
      <h1 id="babystep-giantstep">Baby-Step Giant-Step Algorithmus</h1>

      <div className="space-y-4">
        <LabelInput label="Basis (g)" type="number" value={g} onChange={(e) => setG(parseInt(e.target.value))} />
        <LabelInput label="Zielwert (h)" type="number" value={h} onChange={(e) => setH(parseInt(e.target.value))} />
        <LabelInput label="Modulus (p)" type="number" value={p} onChange={(e) => setP(parseInt(e.target.value))} />
      </div>

      <button onClick={calculateDiscreteLog} className="self-center">
        Berechnen
      </button>

      {result !== null ? (
        <div className="mt-5">
          <h2 className="text-xl font-bold">Ergebnis:</h2>
          <Katex texString={`x \\equiv ${result} \\mod{${p}}`} />
        </div>
      ) : (
        <p className="text-red-500">Keine Lösung gefunden.</p>
      )}
    </div>
  );
}
