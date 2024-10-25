import SingleSpellPage from "./magic-spell-page-components/SingleSpellPage";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function MagicSpellPage() {
  const contentToPrintRef = useRef<HTMLDivElement>(null);
  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  const handlePrint = useReactToPrint({
    contentRef: contentToPrintRef,
    documentTitle: `${"Magic Spell Page"}`,
    // onAfterPrint: handleAfterPrint,
    // onBeforePrint: handleBeforeGetContent,
    // onPrintError: handlePrintError,
  });
  return (<>
    <div className="msb" ref={contentToPrintRef}>
      <SingleSpellPage css='first'/>
      <SingleSpellPage css='second'/>
    </div>
    <button onClick={() => handlePrint()}>Print</button>
    </>
  );
}