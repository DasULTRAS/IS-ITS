import { useCallback, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import LabelInput from "../components/input/LabelInput";
import Katex from "../components/katex";
import { modPow } from "../utils/math";

/**
 * A React component that implements the Baby-Step Giant-Step algorithm to compute the discrete logarithm.
 *
 * The Baby-Step Giant-Step algorithm is an efficient method to solve the discrete logarithm problem with a time complexity of \( O(\sqrt{p}) \).
 *
 * @component
 * @example
 * ```tsx
 * <BabyStepGiantStep />
 * ```
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component allows users to input the base (g), target value (h), and modulus (p) for the discrete logarithm calculation.
 * It then computes the discrete logarithm using the Baby-Step Giant-Step algorithm and displays the steps and result.
 *
 * @see https://en.wikipedia.org/wiki/Baby-step_giant-step for more information on the algorithm.
 */
export default function BabyStepGiantStep() {
  const [g, setG] = useState<number>(2);
  const [h, setH] = useState<number>(22);
  const [p, setP] = useState<number>(29);

  const [m, setM] = useState<number>(0);
  const [inverseFactor, setInverseFactor] = useState<number>(0);

  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<Array<[string, React.ReactElement, number]>>([]);

  useEffect(() => {
    calculateDiscreteLog();
  }, [g, h, p]);

  const calculateDiscreteLog = useCallback(() => {
    const m = Math.ceil(Math.sqrt(p));
    setM(m);

    const babySteps: Record<number, number> = {};
    // @ts-expect-error: Wrong type for stepData (but it's necessary for the Chart component)
    const stepData: Array<[string, React.ReactElement, number]> = [["Schritt", "Berechnung", "Werte"]];

    // Schritt 1: Berechnung der Baby-Steps
    for (let j = 0; j < m; j++) {
      const value = modPow(g, j, p);
      babySteps[value] = j;
      stepData.push([`Baby-Step (${j})`, <Katex texString={`g^${j} = ${value} \\mod{${p}}`} />, value]);
    }

    // Schritt 2: Berechnung des Inversen Schritts
    const inverseFactor = modPow(g, p - 1 - m, p);
    setInverseFactor(inverseFactor);
    let gamma = h;

    stepData.push([
      "Inverse Berechnung",
      <Katex texString={`g^{-m} \\equiv ${g}^{-${m}} \\mod{${p}}`} />,
      inverseFactor,
    ]);

    // Schritt 3: Berechnung der Giant-Steps
    for (let i = 0; i < m; i++) {
      if (babySteps[gamma] !== undefined) {
        const solution = i * m + babySteps[gamma];
        setResult(solution);
        stepData.push([
          `Giant-Step (${i})`,
          <span>
            Lösung gefunden bei i={i}, j={babySteps[gamma]}
          </span>,
          solution,
        ]);
        setSteps(stepData);
        return;
      }
      const oldGamma = gamma;
      gamma = (gamma * inverseFactor) % p;
      stepData.push([
        `Giant-Step (${i})`,
        <Katex texString={`h \\cdot \\gamma = ${h} \\cdot ${oldGamma} = ${gamma} \\mod{${p}}`} />,
        gamma,
      ]);
    }

    setResult(null);
    stepData.push(["", <span>Keine Lösung gefunden</span>, 0]);
    setSteps(stepData);
  }, [g, h, p]);

  return (
    <div className="flex max-w-2xl flex-col space-y-5">
      <h1 id="babystep-giantstep">Baby-Step Giant-Step Algorithmus</h1>
      <p className="max-w-lg text-center font-thin">
        Der <b>Baby-Step Giant-Step</b> Algorithmus berechnet den <b>diskreten Logarithmus</b> effizient mit einer
        Laufzeit von <Katex texString="O(\sqrt{p})" />.
      </p>
      <div className="space-y-4">
        <LabelInput label="Basis (g)" type="number" value={g} onChange={(e) => setG(parseInt(e.target.value))} />
        <LabelInput label="Zielwert (h)" type="number" value={h} onChange={(e) => setH(parseInt(e.target.value))} />
        <LabelInput label="Modulus (p)" type="number" value={p} onChange={(e) => setP(parseInt(e.target.value))} />
      </div>
      <p className="font-bold">
        Zu berechnende Gleichung: <Katex texString={`${g}^x \\equiv ${h} \\mod{${p}}`} />
      </p>

      <div>
        <h2>Algorithmus Schema</h2>
        <ol className="list-decimal pl-5">
          <li>
            <div className="flex space-x-2">
              <p>
                Berechne{" "}
                <Katex
                  texString={`m = \\text{Ceiling}(\\sqrt{n}) = \\lceil \\sqrt{${p}} \\rceil = ${m}`}
                  data-tooltip-id={`tooltip-${1}`}
                />
                <Tooltip id={`tooltip-${1}`} place="top">
                  Ceiling Funktion rundet auf die nächste ganze Zahl auf.
                </Tooltip>
              </p>
            </div>
          </li>

          <li>
            <b>Baby-Steps</b>: Für alle j wenn <Katex texString="0 \leq j \leq m" />: <br />
            <ol className="list-decimal pl-5">
              <li>
                Berechne <Katex texString={`g^j \\mod p`} /> und speichere als Paar <Katex texString="(j, g^j)" />
              </li>
            </ol>
          </li>

          <li>
            Berechne den <b data-tooltip-id="tooltip-2">inversen Schritt:</b>
            <Tooltip id="tooltip-2" className="max-w-xs" place="top">
              Der inverse Schritt wird im Giant-Step verwendet. Anstatt jedes Mal (<Katex texString="g^{-im} \mod p" />)
              von Grund auf zu berechnen, wird der Wert einmal berechnet und dann wiederholt verwendet.
            </Tooltip>{" "}
            <Katex
              texString={`g^{-m} \\equiv ${g}^{-${Math.ceil(Math.sqrt(p))}} \\mod p \\equiv ${inverseFactor} \\mod ${p}`}
            />
            .
          </li>

          <li>
            <Katex texString={`\\gamma = h = ${h}`} data-tooltip-id="tooltip-3" />
            <Tooltip id="tooltip-3" place="top" className="max-w-xs">
              Hier wird <Katex texString="\gamma" /> mit dem gegebenen Wert von <Katex texString="h" /> initialisiert,
              welcher das Ziel der Berechnung darstellt.
            </Tooltip>
          </li>

          <li>
            <b>Giant-Steps</b>: Für alle <Katex texString="i" /> wenn <Katex texString="0 \leq i < m" />:
            <ol className="list-decimal pl-5">
              <li>
                Berechne <Katex texString={`\\gamma = h \\cdot g^{-im} = h \\cdot \\gamma \\mod p`} />. <br />
                Überprüfe, ob <Katex texString={`\\gamma`} /> in den Baby-Steps gefunden wurde.
              </li>
              <ol className="pl-5">
                <li>
                  Wenn, Ja: <Katex texString={`x \\equiv im + j \\mod p`} /> ist die Lösung.
                </li>
                <li>
                  Wenn, Nein: Berechne <Katex texString={`\\gamma \\equiv h \\cdot g^{-im} \\mod p`} />.
                </li>
              </ol>
            </ol>
          </li>
        </ol>
      </div>

      {result !== null ? (
        <div>
          <h2 className="text-green-600">Ergebnis</h2>
          <Katex texString={`x \\equiv ${result} \\mod{${p}}`} />
        </div>
      ) : (
        <p className="text-red-500">Keine Lösung gefunden.</p>
      )}

      {steps.length > 1 && (
        <div>
          <details>
            <summary>Schritte Anzeigen</summary>
            {/* Darstellung als HTML-Tabelle */}
            <table className="w-full table-auto border-collapse overflow-hidden rounded-lg border shadow-md">
              <thead>
                <tr className="bg-gray-200 text-left text-sm tracking-wide text-gray-600 uppercase dark:bg-gray-800 dark:text-gray-300">
                  {steps[0].map((step, i) => (
                    <th key={i} className="border border-gray-300 px-4 py-2 text-center">
                      {step}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {steps.slice(1).map((step, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "bg-white dark:bg-gray-600"
                    } transition-all hover:bg-gray-300 dark:hover:bg-gray-500`}
                  >
                    {step.map((data, i) => (
                      <td key={i} className="border border-gray-300 px-2 py-1 text-center">
                        {data}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>
      )}
    </div>
  );
}
