import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Shell } from './components/shell';
import { Participants } from './routes/participants';
import { Generate } from './routes/generate';
import { ManageRelations } from './routes/manage-relations';
import { Results } from './routes/results';
import { Welcome } from './routes/welcome';
import { URLs } from './urls';

export const Router = () => (
  <BrowserRouter>
    <Shell>
      <Routes>
        <Route path={URLs.Welcome} element={<Welcome />} />
        <Route path={URLs.Participants} element={<Participants />} />
        <Route path={URLs.ManageRelations} element={<ManageRelations />} />
        <Route path={URLs.Generate} element={<Generate />} />
        <Route path={URLs.Results} element={<Results />} />
      </Routes>
    </Shell>
  </BrowserRouter>
);
