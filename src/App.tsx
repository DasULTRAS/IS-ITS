import { useEffect, useState } from "react";
import BabyStepGiantStep from "./babyStepGiantStep";
import DiffieHellman from "./diffieHellman";
import RSA from "./rsa";

export default function App() {
  const [isDesktop, setIsDesktop] = useState(window.matchMedia("(min-width: 640px)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    // Funktion zur Aktualisierung des States
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    // Event-Listener hinzufügen
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup: Event-Listener entfernen
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 bg-neutral-200 px-5 py-2 shadow-lg dark:bg-neutral-800">
        <div className="flex w-16 items-center sm:w-32">
          <a className="place-self-center text-xl font-bold" href="/IS-ITS/">
            {isDesktop ? "IT-Sicherheit" : "ITS"}
          </a>
        </div>

        <div className="flex flex-grow items-center justify-center">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#diffie-hellman" className="hover:underline">
                  Diffie-Hellman
                </a>
              </li>
              <li>
                <a href="#babystep-giantstep" className="hover:underline">
                  Baby-Step Giant-Step
                </a>
              </li>
              <li>
                <a href="#rsa" className="hover:underline">
                  RSA
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="w-0 sm:w-32"></div>
      </header>

      <div className="m-5 flex min-h-screen flex-col items-center space-y-10">
        <DiffieHellman />

        <hr className="w-3/5" />
        <BabyStepGiantStep />

        <hr className="w-3/5" />
        <RSA />
      </div>
    </>
  );
}
