// ----------------------------------------------------------------< components
import { Environment, Cube } from '../components';
// --------------------------------------------------------------------< styles
import './styles.css';
// ============================================================================
export function AppView() {
  return (
    <Environment>
      <Cube />
    </Environment>
  );
}
