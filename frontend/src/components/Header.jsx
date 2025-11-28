import Modal from './Modal'

import logo from '../assets/dom.png'

import styles from './Header.module.css'

function Header({sector, lastUpdateDateString}) {

  return (
    <div className="d-flex justify-content-between align-items-center bg-withe mt-4 container-fluid">
    <div className={styles.titleAndLastUpdate}>
      <h1 className="mt-4 mb-4">Controle de fornecedores </h1>
      {sector !== 'admin' && <p>Última atualização: {lastUpdateDateString}</p>}
    </div>
  
    
    <div className="d-flex align-items-center">
    <img src={logo} className={styles.logo} alt="logo dom" style={{ maxWidth: '100%', height: 'auto' }} />
      {
        sector === 'cpd' &&
        <Modal color="primary" name="Incluir" /> 
      }
    </div>
  </div>
  )
}
export default Header
