import {useState} from "react";
import Table from '../../components/Table/TableAdmin'
import {Footer} from '../../components/Footer'
import Header from '../../components/Header'

function Admin() {
  const [lastUpdateDateString, setLastUpdateDateString] = useState('');
  const [countPallets, setCountPallets] = useState(0);
  const [countUnscheduled, setCountUnscheduled] = useState(0);
  const [countScheduled, setCountScheduled] = useState(0);

  return (
    <>
      <Header 
        lastUpdateDateString={lastUpdateDateString} 
        sector="admin"
      />
      <Table 
        countPallets={countPallets} 
        countScheduled={countScheduled}
        countUnscheduled={countUnscheduled}
        setLastUpdateDateString={setLastUpdateDateString} 
        sector="home" 
        isAdmin={true} 
        urlServer="provider-list" 
        setCountPallets={setCountPallets}
        setCountUnscheduled={setCountUnscheduled}
        setCountScheduled={setCountScheduled}
      />
      <Footer />
    </>
  )
}

export { Admin }
