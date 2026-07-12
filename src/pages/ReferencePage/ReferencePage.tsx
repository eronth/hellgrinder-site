
import Page from '../../components/common/Page/Page';
import { TabType } from '../../ts-types/types';
import './ReferencePage.css';

type PlannedSection = {
  title: string;
  blurb: string;
  status: 'drafting' | 'planned';
};

const plannedSections: PlannedSection[] = [
  {
    title: 'Tables and Details',
    blurb: 'Various tables and details to help with combat at-a-glance',
    status: 'planned',
  }
];

export default function ReferencePage() {
  const page: TabType = 'reference';

  return (
  <Page pageType={page} pageClassName="reference-page">
    <div className="reference-wip-banner">
      <span className="reference-wip-badge">Under Construction</span>
      <h2>Quick Reference</h2>
      <p>
        A single page of rules and tables, built for a GM running the game with
        one eye on the table. It isn't ready yet, but here's what's going in it.
      </p>
    </div>

    <section className="reference-planned-grid">
      {plannedSections.map((section) => (
        <article key={section.title} className={`reference-planned-card ${section.status}`}>
          <header>
            <h3>{section.title}</h3>
            <span className="reference-status-chip">
              {section.status === 'drafting' ? 'Drafting' : 'Planned'}
            </span>
          </header>
          <p>{section.blurb}</p>
        </article>
      ))}
    </section>

    <p className="reference-footnote">
      In the meantime, everything here lives in full detail over in How to Play.
    </p>
    <br />
  </Page>);
}
