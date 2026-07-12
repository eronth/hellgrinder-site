
import Page from '../../components/common/Page/Page';
import { TabType } from '../../ts-types/types';
import './ReferencePage.css';

export default function ReferencePage() {
  const page: TabType = 'reference';

  return (
  <Page pageType={page} pageClassName="reference-page">
    <h2>WIP</h2>
    <section>
      This page is a work in progress.
      <br />
      Come back later to get a page of 
      quick reference rules and tables, 
      perfect for a GM running the game.
    </section>
    <br />
  </Page>);
}
