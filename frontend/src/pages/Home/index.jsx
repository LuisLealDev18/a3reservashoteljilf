import {useState} from "react";
import Table from '../../components/Table/Table'
import Header from '../../components/Header'
import {Footer} from '../../components/Footer'

function Home() {
  const [lastUpdateDateString, setLastUpdateDateString] = useState('');
  const [countPallets, setCountPallets] = useState(0);

  return (
    <>
      <Header countPallets={countPallets} lastUpdateDateString={lastUpdateDateString} sector="home" />
      <Table 
        setCountPallets={setCountPallets}
        setLastUpdateDateString={setLastUpdateDateString} 
        sector="home" 
        urlServer="provider-list" 
      />
      <Footer />
    </>
  )
}

export { Home }
