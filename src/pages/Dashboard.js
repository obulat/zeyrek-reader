import React  from "react";
import { useAuth } from '../use-auth';
import { LookUpHistorySection } from '../components/LookUpHistorySection';

const Dashboard = () => {
  const auth = useAuth();

  function getLookupHistory() {
    const hist = localStorage.getItem('lookupHistory')
    if (hist) {
      return JSON.parse(hist)
    }
  }
  const hist = getLookupHistory();
  return (
    <div className="db__container">
        <div
          style={{ background: `url(${ auth.user.photoURL })  no-repeat center center` }}
          className="db__avatar"
        />
        <h2 className="db__username">{ auth.user.displayName }</h2>
        <h3 className="db__email">{ auth.user.email }</h3>
      { hist && <LookUpHistorySection lookupHistory={getLookupHistory()} />}
    </div>
  );
};
export default Dashboard;
