import { ReactNode } from "react";
import './CheckResultsGrid.css';

type Props = {
  results: {
    r0?: ReactNode;
    r1: ReactNode;
    r2: ReactNode;
    r3: ReactNode;
  }
  showNumeral?: boolean;
};

export default function CheckResultsGrid({ results, showNumeral }: Props) {
  const showRank0 = (results?.r0 ?? '').toString().trim() !== '';

  return (<>
    <div className={`check-results-grid ${showNumeral ? 'with-numeral' : ''}`}>
      {showNumeral && <div className="title number-result">Roll</div>}
      <div className="title rank-result">Result</div>
      <div className="title result-description">Description</div>


      {showRank0 && <>
        {showNumeral && <div className="data number-result">4-7</div>}
        <div className="data rank-result">Rank&nbsp;0</div>
        <div className="data result-description">{results.r0}</div>
      </>}

      {showNumeral && <div className="data number-result">8-11</div>}
      <div className="data rank-result">Rank&nbsp;1</div>
      <div className="data result-description">{results.r1}</div>

      {showNumeral && <div className="data number-result">12-15</div>}
      <div className="data rank-result">Rank&nbsp;2</div>
      <div className="data result-description">{results.r2}</div>

      {showNumeral && <div className="data number-result">16-18</div>}
      <div className="data rank-result">Rank&nbsp;3</div>
      <div className="data result-description">{results.r3}</div>
    </div>
  </>)
}