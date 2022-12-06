import { useNavigate } from 'react-router-dom';
import { URLs } from '~/urls';
import { useKKContext } from '../core/kk-context';
import { ViewAll } from './view-all';
import { ViewSecret } from './view-secret';

export const Results = () => {
  const navigate = useNavigate();
  const { kk } = useKKContext();

  if (!kk.results) {
    navigate(URLs.Welcome);
    return null;
  }

  return kk.view === 'all' ? <ViewAll /> : <ViewSecret />;
};
