import { useNavigate } from 'react-router-dom';
import { useKKContext } from '../core/kk-context';
import { ViewAll } from './view-all';
import { ViewSecret } from './view-secret';

export const Results = () => {
  const navigate = useNavigate();
  const { kk } = useKKContext();

  if (!kk.results) {
    navigate('/');
    return null;
  }

  return kk.view === 'all' ? <ViewAll /> : <ViewSecret />;
};
