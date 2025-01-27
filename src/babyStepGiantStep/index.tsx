import { useState } from "react";
import { Chart } from "react-google-charts";
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
  const [steps, setSteps] = useState<Array<[string, number]>>([]);

  const calculateDiscreteLog = () => {
    const m = Math.ceil(Math.sqrt(p - 1));
    const babySteps: Record<number, number> = {};

    // Schritte zur Veranschaulichung des Algorithmus
    const stepData: Array<[string, number]> = [["Schritt", 0]];

    // Berechnung der Baby-Steps
    for (let j = 0; j < m; j++) {
      const value = modPow(g, j, p);
      babySteps[value] = j;
      stepData.push([`Baby-Step: g^${j} mod ${p} = ${value}`, value]);
    }

    // Berechnung der Giant-Steps
    const factor = modPow(g, m * (p - 2), p);
    let giantStep = h;

    for (let i = 0; i < m; i++) {
      if (babySteps[giantStep] !== undefined) {
        setResult(i * m + babySteps[giantStep]);
        stepData.push([`Lösung gefunden bei i=${i}`, i * m + babySteps[giantStep]]);
        setSteps(stepData);
        return;
      }
      giantStep = (giantStep * factor) % p;
      stepData.push([`Giant-Step: h * g^(-${i}m) mod ${p} = ${giantStep}`, giantStep]);
    }

    setResult(null);
    stepData.push(["Keine Lösung gefunden", 0]);
    setSteps(stepData);
  };

  return (
    <div className="flex max-w-2xl flex-col space-y-5">
      <h1 id="babystep-giantstep">Baby-Step Giant-Step Algorithmus</h1>
      <p className="flex max-w-lg font-thin">
        Der Baby-Step Giant-Step Algorithmus wird verwendet, um den diskreten Logarithmus in einer Gruppe zu berechnen.
        Der Algorithmus arbeitet in O(√p) und bietet eine erhebliche Verbesserung gegenüber dem naiven Ansatz.
      </p>
      <div className="space-y-4">
        <LabelInput label="Basis (g)" type="number" value={g} onChange={(e) => setG(parseInt(e.target.value))} />
        <LabelInput label="Zielwert (h)" type="number" value={h} onChange={(e) => setH(parseInt(e.target.value))} />
        <LabelInput label="Modulus (p)" type="number" value={p} onChange={(e) => setP(parseInt(e.target.value))} />
      </div>
      <p className="text-sm">
        Beispiel: Gegeben g = {g}, h = {h}, p = {p}, berechnen wir x aus g^x ≡ h (mod p).
      </p>
      <p>
        <strong>Schritt-für-Schritt Erklärung:</strong>
      </p>
      <ol className="list-decimal pl-5">
        <li>
          <div className="flex">
            Berechne <Katex className="self-center px-1" texString="\sqrt{p-1}" options={{ displayMode: false }} /> und
            runde auf: <Katex className="px-1" texString={`m = ${Math.ceil(Math.sqrt(p - 1))}`} />
          </div>
        </li>
        <li>
          Berechne die Baby-Steps: <Katex texString="g^j \mod p" /> für j = 0 bis m-1
        </li>
        <li>
          Berechne den Inversen Schritt: <Katex texString="g^{-m} \equiv g^{m(p-2)} \mod p" />
        </li>
        <li>
          Berechne die Giant-Steps: <Katex texString="h \cdot g^{-im} \mod p" /> für i = 0 bis m-1
        </li>
        <li>Vergleiche mit Baby-Steps, um die Lösung zu finden</li>
      </ol>
      <button onClick={calculateDiscreteLog} className="self-center">
        Berechnen
      </button>
      {steps.length > 1 && (
        <div className="mt-5">
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={steps}
            options={{
              title: "Schritte des Baby-Step Giant-Step Algorithmus",
              legend: { position: "none" },
            }}
          />
        </div>
      )}
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
