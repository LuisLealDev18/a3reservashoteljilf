import {useState} from "react";
import Table from '../../components/Table/Table'
import Header from '../../components/Header'
import {Footer} from '../../components/Footer'

function CPD() {
  const [lastUpdateDateString, setLastUpdateDateString] = useState('');

  return (
    <>
      <Header lastUpdateDateString={lastUpdateDateString} sector="cpd" />
      <Table setLastUpdateDateString={setLastUpdateDateString} sector="cpd" urlServer="provider-list" />
      <Footer />
    </> 
  );
}

export { CPD };
