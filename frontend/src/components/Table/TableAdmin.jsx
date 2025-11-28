import { useState } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

import { axiosApi } from '../../services/axios';
import { Form, Button } from 'react-bootstrap';

import TableRow from './TableRow';

import styles from './Table.module.css';

import ReactExport from 'react-export-excel-xlsx-fix';
import { SkeletonTableRow } from '../skeleton/tableRow';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function TableComponent({
  sector,
  isAdmin = false,
  setCountPallets = () => {},
  setCountScheduled = () => {},
  setCountUnscheduled = () => {},
  countPallets = 0,
  countScheduled = 0,
  countUnscheduled = 0,
}) {
  const now = new Date();
  const offset = -3 * 60;
  const dateTime = new Date(now.getTime() + offset * 60 * 1000);
  const isoString = dateTime.toISOString();
  const [data, setData] = useState([]);
  const [whatUseSchedule, setWhatUseSchedule] = useState('all');
  const [startDatetime, setStartDatetime] = useState(isoString);
  const [endDatetime, setEndDatetime] = useState(isoString);
  const [isSchedule, setIsSchedule] = useState(false);
  const dayCurrent = now.getDate().toString().padStart(2, '0');
  const MonthCurrent = (now.getMonth() + 1).toString().padStart(2, '0');
  const [dataSet1, setDataSet1] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTableExport = () => {
    setIsLoading(true);
    axiosApi
      .post(`provider-date`, {
        startTime: `${dateTime.getFullYear()}-${MonthCurrent}-${dayCurrent}T00:00:28.549Z`,
        endTime: `${dateTime.getFullYear()}-${MonthCurrent}-${dayCurrent}T23:59:28.549Z`,
      })
      .then((response) => {
        const { data = [] } = response;

        const countPallets = data.reduce((acc, item) => {
          if (item.volumeType === 'pallets') {
            return acc + item.quantity;
          } else {
            return acc;
          }
        }, 0);

        const countScheduled = data.reduce((acc, item) => {
          if (item.isSchedule) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);

        const countUnscheduled = data.reduce((acc, item) => {
          if (!item.isSchedule) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);

        setIsLoading(false);
        setCountPallets(countPallets);
        setCountScheduled(countScheduled);
        setCountUnscheduled(countUnscheduled);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const getDataForPeriod = () => {
    setIsLoading(true);

    const startDate = new Date(startDatetime);
    const endDate = new Date(endDatetime);

    const dayStartTime = startDate.getDate().toString().padStart(2, '0');
    const monthStartTime = (startDate.getMonth() + 1).toString().padStart(2, '0');

    const dayEndTime = endDate.getDate().toString().padStart(2, '0');
    const monthEndTime = (endDate.getMonth() + 1).toString().padStart(2, '0');

    axiosApi
      .post(`provider-date`, {
        startTime: `${startDate.getFullYear()}-${monthStartTime}-${dayStartTime}T00:00:28.549Z`,
        endTime: `${endDate.getFullYear()}-${monthEndTime}-${dayEndTime}T23:59:28.549Z`,
      })
      .then((response) => {
        const { data = [] } = response;

        const countPallets = data.reduce((acc, item) => {
          if (item.volumeType === 'pallets') {
            return acc + item.quantity;
          } else {
            return acc;
          }
        }, 0);

        const countScheduled = data.reduce((acc, item) => {
          if (item.isSchedule) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);

        const countUnscheduled = data.reduce((acc, item) => {
          if (!item.isSchedule) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);

        setIsLoading(false);
        setCountPallets(countPallets);
        setCountScheduled(countScheduled);
        setCountUnscheduled(countUnscheduled);
        getExcelExport(response);
        setData(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const getExcelExport = ({ data }) => {
    setDataSet1([]);
    data.forEach((item) => {
      const { hour } = item;
      let hourProvider = new Date(hour);
      const dayCurrent = hourProvider.getDate().toString().padStart(2, '0');
      const monthCurrent = (hourProvider.getMonth() + 1).toString().padStart(2, '0');
      let status = '';
      if (item.isSchedule) {
        status = 'Agendado';
      }else{
        status = 'Não Agendado';
      }

      setDataSet1((prevDataSet) => {
        if (item.volumeType === 'pallets') {
          return [
            ...prevDataSet,
            {
              data: `${dayCurrent}/${monthCurrent}/${hourProvider.getFullYear()}`,
              store: `Realengo`,
              provider: `${item.providerName}`,
              status: status,
              pallets: `${item.quantity}`,
              observation: '',
            },
          ];
        } else {
          return prevDataSet;
        }
      });
      
    });
  };

  const getDataForPeriodSchedule = () => {
    setIsLoading(true);
    const startDate = new Date(startDatetime);
    const endDate = new Date(endDatetime);

    const dayStartTime = startDate.getDate().toString().padStart(2, '0');
    const monthStartTime = (startDate.getMonth() + 1).toString().padStart(2, '0');

    const dayEndTime = endDate.getDate().toString().padStart(2, '0');
    const monthEndTime = (endDate.getMonth() + 1).toString().padStart(2, '0');
    axiosApi
      .post(`provider-date-schedule`, {
        startTime: `${startDate.getFullYear()}-${monthStartTime}-${dayStartTime}T00:00:28.549Z`,
        endTime: `${endDate.getFullYear()}-${monthEndTime}-${dayEndTime}T23:59:28.549Z`,
        isSchedule: isSchedule,
      })
      .then((response) => {
        const { data = [] } = response;

        const countPallets = data.reduce((acc, item) => {
          if (item.volumeType === 'pallets') {
            return acc + item.quantity;
          } else {
            return acc;
          }
        }, 0);

        const countScheduled = data.reduce((acc, item) => {
          if (item.isSchedule) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);

        const countUnscheduled = data.reduce((acc, item) => {
          if (!item.isSchedule) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);

        setIsLoading(false);
        setCountPallets(countPallets);
        setCountScheduled(countScheduled);
        setCountUnscheduled(countUnscheduled);

        getExcelExport(response);
        setData(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const getDataForPeriodAfterHour = () => {
    setIsLoading(true);

    const startDate = new Date(startDatetime);
    const endDate = new Date(endDatetime);

    const dayStartTime = startDate.getDate().toString().padStart(2, '0');
    const monthStartTime = (startDate.getMonth() + 1).toString().padStart(2, '0');

    const dayEndTime = endDate.getDate().toString().padStart(2, '0');
    const monthEndTime = (endDate.getMonth() + 1).toString().padStart(2, '0');

    axiosApi
      .post(`provider-date-period`, {
        startTime: `${startDate.getFullYear()}-${monthStartTime}-${dayStartTime}T00:00:28.549Z`,
        endTime: `${endDate.getFullYear()}-${monthEndTime}-${dayEndTime}T23:59:28.549Z`,
      })
      .then((response) => {
        const { data } = response;

        const countPallets = data.reduce((acc, item) => {
          if (item.volumeType === 'pallets') {
            return acc + item.quantity;
          } else {
            return acc;
          }
        }, 0);

        const countScheduled = data.reduce((acc, item) => {
          if (item.isSchedule) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);

        const countUnscheduled = data.reduce((acc, item) => {
          if (!item.isSchedule) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);

        setIsLoading(false);
        setCountPallets(countPallets);
        setCountScheduled(countScheduled);
        setCountUnscheduled(countUnscheduled);
        getExcelExport(response);
        setData(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className={styles.containerTable}>
      {isAdmin && (
        <div className={styles.containerAdminFilter}>
          <div className={styles.contentAdminFilter}>
            <div className={styles.containerPeriod}>
              <Form.Group controlId="formHour" className={styles.containerDatePeriod}>
                <Form.Label>De</Form.Label>
                <Form.Control
                  type="date"
                  value={startDatetime.slice(0, 10)}
                  onChange={(e) => setStartDatetime(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formHour" className={styles.containerDatePeriod}>
                <Form.Label>Até</Form.Label>
                <Form.Control
                  type="date"
                  value={endDatetime.slice(0, 10)}
                  onChange={(e) => setEndDatetime(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className={styles.containerFilterType}>
              <div className="form-group">
                <Form.Check
                  type="radio"
                  label="Todos"
                  name="typeFilter"
                  id="all"
                  value="all"
                  checked={whatUseSchedule === 'all'}
                  onChange={(e) => setWhatUseSchedule(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Agendadas"
                  name="typeFilter"
                  id="schedule"
                  value="schedule"
                  checked={whatUseSchedule === 'schedule'}
                  onChange={(e) => setWhatUseSchedule(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Depois do horario"
                  name="typeFilter"
                  id="afterHour"
                  value="afterHour"
                  checked={whatUseSchedule === 'afterHour'}
                  onChange={(e) => setWhatUseSchedule(e.target.value)}
                />
              </div>
            </div>
            {whatUseSchedule === 'schedule' && (
              <div className={styles.containerSchedule}>
                <div className="form-group">
                  <Form.Check
                    type="radio"
                    label="Agendado"
                    name="isSchedule"
                    id="sim"
                    value={true}
                    checked={isSchedule === true}
                    onChange={() => setIsSchedule(true)}
                  />
                  <Form.Check
                    type="radio"
                    label="Não agendado"
                    name="isSchedule"
                    id="nao"
                    value={false}
                    checked={isSchedule === false}
                    onChange={() => setIsSchedule(false)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles.containerLeftFilter}>
            <div className={styles.containerFiltersSum}>
              <p>
                <span>Pallets: </span>
                {countPallets}
              </p>
              <p>
                <span>Agendados: </span>
                {countScheduled}
              </p>
              <p>
                <span>Não Agendados:</span> {countUnscheduled}
              </p>
            </div>

            <div className={styles.containerButtons}>
              <Button
                type="submit"
                variant="primary"
                onClick={() => {
                  if (whatUseSchedule === 'all') {
                    getDataForPeriod();
                  } else if (whatUseSchedule === 'schedule') {
                    getDataForPeriodSchedule();
                  } else {
                    getDataForPeriodAfterHour();
                  }
                }}
              >
                Filtrar
              </Button>
              <ExcelFile>
                <ExcelSheet data={dataSet1} name="Employees">
                  <ExcelColumn label="Data" value="data" />
                  <ExcelColumn label="Loja" value="store" />
                  <ExcelColumn label="Fornecedor" value="provider" />
                  <ExcelColumn label="Status" value="status" />
                  <ExcelColumn label="Pallets" value="pallets" />
                  <ExcelColumn label="Observação" value="observation" />
                </ExcelSheet>
              </ExcelFile>
            </div>
          </div>
        </div>
      )}
      <BootstrapTable hover size="sm">
        <thead>
          <tr>
            <th className="align-middle text-center">Ordem</th>
            <th className="align-middle text-center">Fornecedor</th>
            <th className="align-middle text-center">Nota</th>
            <th className="align-middle text-center">Hora</th>
            <th className="align-middle text-center">Quantidade</th>
            <th className="align-middle text-center">Carga</th>
            <th className="align-middle text-center">Agendada</th>
            <th className="align-middle text-center">Status</th>
            <th className="align-middle text-center">Visualizar</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonTableRow />
          ) : (
            <TableRow data={data} sector={sector} getTableExport={getTableExport} />
          )}
        </tbody>
      </BootstrapTable>
    </div>
  );
}

export default TableComponent;
