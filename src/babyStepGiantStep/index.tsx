import { useCallback, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import LabelInput from "../components/input/LabelInput";
import Katex from "../components/katex";
import { isPrime, modPow } from "../utils/math";

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

  const [n, setN] = useState<number>(0);
  const [inverseFactor, setInverseFactor] = useState<number>(0);

  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<Array<[string, React.ReactElement, number]>>([]);

  useEffect(() => {
    calculateDiscreteLog();
  }, [g, h, p]);

  const calculateDiscreteLog = useCallback(() => {
    const n = Math.ceil(Math.sqrt(p - 1)) + 1;
    setN(n);

    const babySteps: Record<number, number> = {};
    // @ts-expect-error: Wrong type for stepData (but it's necessary for the Chart component)
    const stepData: Array<[string, React.ReactElement, number]> = [["Schritt", "Berechnung", "Werte"]];

    // Schritt 1: Berechnung der Baby-Steps
    for (let j = 0; j < n; j++) {
      const value = modPow(g, j, p);
      babySteps[value] = j;
      stepData.push([`Baby-Step (${j})`, <Katex texString={`${g}^${j} \\mod{${p}}`} />, value]);
    }

    // Schritt 2: Berechnung des Inversen Schritts
    const inverseFactor = modPow(g, p - 1 - n, p);
    setInverseFactor(inverseFactor);

    // Schritt 3: Initialisierung des Giant-Steps
    // gamma repräsentiert den aktuellen Wert von h * g^(-j * N) mod p oder h * c^j mod p
    // gamma wird in jedem Schritt aktualisiert um j zu erhöhen
    let gamma = h;

    stepData.push(["Inverse Berechnung", <Katex texString={`${g}^{-${n}} \\mod{${p}}`} />, inverseFactor]);

    // Schritt 4: Berechnung der Giant-Steps
    for (let i = 0; i < n; i++) {
      if (babySteps[gamma] !== undefined) {
        const solution = i * n + babySteps[gamma];
        setResult(solution);
        stepData.push([
          `Giant-Step (${i})`,
          <span>
            Lösung gefunden: <br />
            i={i}, j={babySteps[gamma]}
          </span>,
          solution,
        ]);
        setSteps(stepData);
        return;
      }
      const oldGamma = gamma;
      gamma = (gamma * inverseFactor) % p;
      stepData.push([`Giant-Step (${i})`, <Katex texString={`${h} \\cdot ${oldGamma} \\mod{${p}}`} />, gamma]);
    }

    setResult(null);
    stepData.push(["", <span>Keine Lösung</span>, 0]);
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
        <LabelInput
          label={
            <>
              Basis (<Katex texString="g" />)
            </>
          }
          type="number"
          value={g}
          onChange={(e) => setG(parseInt(e.target.value))}
        />
        <LabelInput
          label={
            <>
              Zielwert (<Katex texString="h" />)
            </>
          }
          type="number"
          value={h}
          onChange={(e) => setH(parseInt(e.target.value))}
        />
        <LabelInput
          label={
            <>
              Modulus (<Katex texString="p" />)
            </>
          }
          type="number"
          value={p}
          isValid={isPrime(p)}
          tooltipText="Der Modulus sollte eine Primzahl sein."
          onChange={(e) => setP(parseInt(e.target.value))}
        />
      </div>

      <p className="font-bold">
        Zu berechnende Gleichung:{" "}
        <Katex texString={`g^x \\equiv h \\mod{p} \\Rightarrow ${g}^x \\equiv ${h} \\mod{${p}}`} />
      </p>

      <div>
        <h2>Algorithmus Schema</h2>
        <ol className="list-decimal pl-5">
          <li>
            <div className="flex space-x-2">
              <p>
                Berechne <Katex texString={`m = \\lceil \\sqrt{p} \\rceil = ${n}`} data-tooltip-id={`tooltip-1`} />
                <Tooltip id={`tooltip-1`} place="top">
                  Die Ceiling-Funktion rundet die Quadratwurzel von <Katex texString="p" /> auf die nächste größere
                  ganze Zahl, um die Anzahl der Baby- und Giant-Steps zu bestimmen.
                </Tooltip>
              </p>
            </div>
          </li>

          <li>
            <b>Baby-Steps</b>: Für alle <Katex texString="j" />, wenn <Katex texString="0 \leq j < m" />: <br />
            <ol className="list-decimal pl-5">
              <li>
                Berechne <Katex texString="g^j \mod p" /> und speichere als Paar <Katex texString="(j, g^j)" /> in einer
                Tabelle.
              </li>
            </ol>
          </li>

          <li>
            Berechne den <b data-tooltip-id="tooltip-2">inversen Schritt:</b>
            <Tooltip id="tooltip-2" className="max-w-xs" place="top">
              Der inverse Schritt wird verwendet, um die Berechnung der Giant-Steps effizienter zu gestalten. Statt
              jedes Mal <Katex texString="g^{-m} \mod p" /> neu zu berechnen, wird dieser Wert vorab bestimmt und
              wiederverwendet.
            </Tooltip>{" "}
            <Katex texString={`g^{-m}  \\mod p \\Rightarrow ${g}^{-${n}} \\equiv ${inverseFactor} \\mod ${p}`} />
          </li>

          <li>
            <Katex texString={`\\gamma_0 = h = ${h}`} data-tooltip-id="tooltip-3" />
            <Tooltip id="tooltip-3" place="top" className="max-w-xs">
              Hier wird <Katex texString="\gamma_0" /> als <Katex texString="h" /> initialisiert, was das
              Ausgangsproblem der Berechnung repräsentiert.
            </Tooltip>
          </li>

          <li>
            <b>Giant-Steps</b>: Für alle <Katex texString="i" />, wenn <Katex texString="0 \leq i < m" />:
            <ol className="list-decimal pl-5">
              <li>
                Überprüfe, ob <Katex texString={`\\gamma_{i}`} /> in der Baby-Step-Tabelle ist:
              </li>
              <ol className="list-disc pl-5">
                <li>
                  Falls <b>ja</b>:<br />
                  <Katex texString={`x \\equiv im + j \\mod p`} data-tooltip-id="tooltip-4" />
                  <Tooltip id="tooltip-4" place="top" className="max-w-xs">
                    Die Lösung ergibt sich durch Kombination des Baby-Steps <Katex texString="j" /> und des Giant-Steps{" "}
                    <Katex texString="i" />.
                    <br />
                    Der Algorithmus nutzt die Zerlegung:
                    <br />
                    <Katex texString="a^x \equiv b \mod p" />
                    <br />
                    Der Baby-Step berechnet <Katex texString="a^j" />, während der Giant-Step{" "}
                    <Katex texString="a^{-m}" /> multipliziert.
                    <br />
                    Bei Übereinstimmung ergibt sich:
                    <br />
                    <Katex texString="x = im + j \mod p" />
                  </Tooltip>
                </li>
                <li>
                  Falls, <b>nein</b>: <br />
                  <Katex texString="\gamma_{i+1} \equiv \gamma_i \cdot g^{-m} \mod p" />
                </li>
              </ol>
            </ol>
          </li>
        </ol>
      </div>

      {result !== null ? (
        <div className="flex flex-col">
          <h2 className="text-green-600">Ergebnis</h2>
          <Katex texString={`x \\equiv ${result} \\mod{${p}}`} />
          <Katex texString={`${h} = ${g}^{${result}} \\mod{${p}} = ${modPow(g, result, p)}`} />
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
                    <th key={i} className="border border-gray-300 px-1 py-2 text-center">
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
