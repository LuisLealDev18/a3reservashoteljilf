import { useState } from 'react';

import { Form, Button, InputGroup } from 'react-bootstrap';
import InputMask from 'react-input-mask';

import { axiosApi } from '../services/axios';

function FormAdd({ sector, closeModal, typeModal = '', dataDetails = {}, getTableExport }) {
  const [supplierName, setSupplierName] = useState(dataDetails?.providerName || '');
  const [notes, setNotes] = useState('');
  const [plate, setPlate] = useState(dataDetails.driver?.plate || '');
  const [listNotes, setListNotes] = useState(dataDetails.notes?.noteNumber.split(', ') || []);
  const [quantity, setQuantity] = useState(dataDetails.quantity || 0);
  const [hour, setHour] = useState(dataDetails?.hour || '');
  const [load, setLoad] = useState(dataDetails?.loadType || 'Seca');
  const [isSchedule, setIsSchedule] = useState(dataDetails?.isSchedule || false);
  const [document, setDocument] = useState(dataDetails.driver?.document || '');
  const [vehicleType, setVehicleType] = useState(dataDetails?.vehicleType || 'Caminhão');
  const [telePhone, setTelePhone] = useState(dataDetails.driver?.telephone || '');
  const [quantityType, setQuantityType] = useState(dataDetails.volumeType || '');
  const [name, setName] = useState(dataDetails.driver?.name || '');
  const [messageError, setMessageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPost = (e) => {
    setIsLoading(true);

    e.preventDefault();
    axiosApi
      .post('provider/', {
        provider: {
          providerName: supplierName,
          hour: hour,
          quantity: quantity,
          isConfirmedByHeritage: false,
          isConfirmedByCPD: false,
          isConfirmedByArbitrator: false,
          loadType: load,
          volumeType: quantityType,
          isChecked: false,
          isReturned: false,
          isSchedule: isSchedule,
        },
        notes: {
          noteNumber: listNotes.join(', '),
        },
        driver: {
          name: name,
          plate: plate,
          vehicleType: vehicleType,
          document: document,
          telephone: telePhone,
        },
      })
      .then(() => {
        setMessageError('');
        setIsLoading(false);
        closeModal();
      })
      .catch(() => {
        setMessageError('Erro ao incluir nota.');
        setIsLoading(false);
      });
  };

  const handleSubmitPut = (e) => {
    setIsLoading(true);

    e.preventDefault();
    axiosApi
      .put(`provider-update/${dataDetails?.id}`, {
        provider: {
          providerName: supplierName,
          hour: hour,
          quantity: quantity,
          isConfirmedByHeritage: false,
          isConfirmedByCPD: false,
          isConfirmedByArbitrator: false,
          loadType: load,
          volumeType: quantityType,
          isChecked: false,
          isReturned: false,
          isSchedule: isSchedule,
        },
        notes: {
          noteNumber: listNotes.join(', '),
        },
        driver: {
          name: name,
          plate: plate,
          vehicleType: vehicleType,
          document: document,
          telephone: telePhone,
        },
      })
      .then(() => {
        setMessageError('');
        setIsLoading(false);
        closeModal();
      })
      .catch(() => {
        setIsLoading(false);
        setMessageError('Erro ao incluir nota.');
      });
  };

  const handleSubmitReleaseNote = (e, sector) => {
    e.preventDefault();
    axiosApi
      .put(`provider-update/${dataDetails?.id}`, {
        provider: {
          providerName: supplierName,
          hour: hour,
          quantity: quantity,
          isConfirmedByHeritage: false,
          isConfirmedByCPD: sector === 'cpd',
          isConfirmedByArbitrator: dataDetails.isConfirmedByCPD,
          loadType: load,
          volumeType: quantityType,
          isChecked: false,
          isReturned: false,
          isSchedule: isSchedule,
        },
        notes: {
          noteNumber: listNotes.join(', '),
        },
        driver: {
          name: name,
          plate: plate,
          vehicleType: vehicleType,
          document: document,
          telephone: telePhone,
        },
      })
      .then(() => {
        setMessageError('');
        closeModal();
      })
      .catch(() => {
        setMessageError('Erro ao incluir nota.');
      });
  };

  const handleKeyUpEnter = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      setListNotes([...listNotes, e.target.value]);
      setNotes('');
    }
  };

  const handleRemoveNote = (e) => {
    let result = listNotes.filter((note) => note !== e);
    setListNotes(result);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formSupplierName" className="mb-3">
          <Form.Label className="mb-1">Fornecedor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do fornecedor"
            value={supplierName}
            disabled={typeModal === 'releaseNote' || 'view' === typeModal}
            onChange={(e) => setSupplierName(e.target.value)}
            isInvalid={messageError.length > 0 && !supplierName.length > 0 ? true : false}
          />
        </Form.Group>

        <Form.Group controlId="formNotes" className="mb-3">
          <Form.Label className="mb-1">Notas</Form.Label>
          <Form.Control
            type="text"
            placeholder="Números das notas"
            value={notes}
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setNotes(e.target.value);
              }
            }}
            disabled={typeModal === 'releaseNote' || 'view' === typeModal}
            isInvalid={messageError.length > 0 && !listNotes.length > 0 ? true : false}
            onKeyUp={handleKeyUpEnter}
          />
          <div className="d-flex mt-2 flex-wrap">
            {listNotes.map((value, index) => (
              <div className="mx-1" key={index}>
                <Button
                  type="button"
                  variant="success"
                  className="py-0 px-2"
                  onClick={() => handleRemoveNote(value)}
                >
                  {value}
                </Button>
              </div>
            ))}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formQuantity">
          <div>
            <Form.Label className="mb-1">Quantidade</Form.Label>
          </div>
          <div className="d-flex justify-content-between">
            <div className="form-group col-6 ">
              <Form.Control
                type="text"
                placeholder="Quantidade"
                value={quantity}
                isInvalid={messageError.length > 0 && !quantity.length > 0 ? true : false}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setQuantity(e.target.value);
                  }
                }}
                disabled={typeModal === 'releaseNote' || 'view' === typeModal}
              />
            </div>
            <div className="form-group col-6 d-flex justify-content-around">
              <Form.Check
                type="radio"
                label="Pallets"
                name="quantityType"
                id="pallets"
                value="pallets"
                isInvalid={messageError.length > 0 && !quantityType.length > 0 ? true : false}
                checked={quantityType === 'pallets'}
                onChange={(e) => setQuantityType(e.target.value)}
                disabled={typeModal === 'releaseNote' || 'view' === typeModal}
              />
              <Form.Check
                type="radio"
                label="Volume"
                name="quantityType"
                id="volume"
                isInvalid={messageError.length > 0 && !quantityType.length > 0 ? true : false}
                value="volume"
                checked={quantityType === 'volume'}
                onChange={(e) => setQuantityType(e.target.value)}
                disabled={typeModal === 'releaseNote' || 'view' === typeModal}
              />
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="formHour" className="mb-3">
          <Form.Label className="mb-1">Hora</Form.Label>
          <Form.Control
            type="datetime-local"
            value={hour.slice(0, 16)}
            disabled={typeModal === 'releaseNote' || 'view' === typeModal}
            isInvalid={messageError.length > 0 && !hour.length > 0 ? true : false}
            inputMode="numeric"
            autoComplete="on"
            onChange={(e) => setHour(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLoad" className="mb-3">
          <Form.Label className="mb-1">Carga</Form.Label>
          <Form.Control
            as="select"
            value={load}
            disabled={typeModal === 'releaseNote' || 'view' === typeModal}
            isInvalid={messageError.length > 0 && !load.length > 0 ? true : false}
            onChange={(e) => setLoad(e.target.value)}
          >
            <option>Seca</option>
            <option>Fria</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="mb-1">Agendado?</Form.Label>
          <div className="form-check form-check-inline mx-2">
            <input
              className="form-check-input"
              type="radio"
              id="yes"
              name="schedule"
              value={true}
              disabled={typeModal === 'releaseNote' || 'view' === typeModal}
              checked={isSchedule === true}
              onChange={(e) => setIsSchedule(e.target.value !== true)}
            />
            <label className="form-check-label" htmlFor="yes">
              Sim
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="no"
              name="schedule"
              value={false}
              disabled={typeModal === 'releaseNote' || 'view' === typeModal}
              checked={isSchedule === false}
              onChange={(e) => setIsSchedule(e.target.value === true)}
            />
            <label className="form-check-label" htmlFor="no">
              Não
            </label>
          </div>
        </Form.Group>

        <Form.Group controlId="formName" className="mb-3">
          <Form.Label className="mb-1">Nome</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            disabled={typeModal === 'releaseNote' || 'view' === typeModal}
            onChange={(e) => setName(e.target.value)}
            value={name}
            isInvalid={messageError.length > 0 && !name.length > 0 ? true : false}
            placeholder="Nome do motorista"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDocument">
          <Form.Label className="mb-1">CNH</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            disabled={typeModal === 'releaseNote' || 'view' === typeModal}
            isInvalid={messageError.length > 0 && !document.length > 0 ? true : false}
            placeholder="CNH"
            inputProps={{ step: 1 }}
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setDocument(e.target.value);
              }
            }}
            value={document}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContact">
          <Form.Label className="mb-1">Contato</Form.Label>
          <InputGroup className="mb-3">
            <div className="mb-3 input-group">
              <InputMask
                mask="(99) 99999-9999"
                disabled={typeModal === 'releaseNote' || 'view' === typeModal}
                type="cellphone"
                className="form-control"
                placeholder="(21) 99999-9999"
                onChange={(e) => setTelePhone(e.target.value)}
                value={telePhone}
                isInvalid={messageError.length > 0 && !telePhone.length > 0 ? true : false}
              />
            </div>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formContact">
          <Form.Label className="mb-1">Placa</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              disabled={typeModal === 'releaseNote' || 'view' === typeModal}
              type="text"
              placeholder="Placa"
              onChange={(e) => setPlate(e.target.value)}
              value={plate}
              isInvalid={messageError.length > 0 && !plate.length > 0 ? true : false}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formVehicle">
          <Form.Label className="mb-1">Tipo de Veiculo</Form.Label>
          <Form.Control
            as="select"
            disabled={typeModal === 'releaseNote' || 'view' === typeModal}
            onChange={(e) => setVehicleType(e.target.value)}
            value={vehicleType}
          >
            <option>Caminhão</option>
            <option>Carreta</option>
            <option>Vuc</option>
            <option>Toco</option>
            <option>Veiculo pequeno</option>
            <option>Furgão</option>
          </Form.Control>
        </Form.Group>
        <p className="text-danger">{messageError}</p>
        <div className="d-flex justify-content-between pt-4">
          {sector === 'home' ||
            (typeModal !== 'releaseNote' && (
              <Button
                variant="primary"
                disabled={isLoading}
                onClick={(e) => {
                  if (typeModal === 'edit') {
                    getTableExport();
                    handleSubmitPut(e);
                  } else {
                    handleSubmitPost(e);
                  }
                }}
              >
                  <>{typeModal === 'edit' ? 'Salvar' : 'Adicionar'}</>
              </Button>
            ))}

          {typeModal === 'releaseNote' ? (
            <>
              {dataDetails.isConfirmedByCPD ? (
                <Button variant="success" onClick={(e) => handleSubmitReleaseNote(e, sector)}>
                  Nota Conferida
                </Button>
              ) : (
                <Button variant="success" onClick={(e) => handleSubmitReleaseNote(e, sector)}>
                  Liberar nota
                </Button>
              )}
            </>
          ) : (
            <Button variant="danger" onClick={closeModal}>
              Cancelar
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default FormAdd;
