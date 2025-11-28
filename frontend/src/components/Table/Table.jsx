import { useEffect, useState } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

import { axiosApi } from '../../services/axios';
import { SkeletonTableRow } from '../skeleton/tableRow';

import TableRow from './TableRow';

function TableComponent({
  sector,
  urlServer,
  isAdmin = false,
  setLastUpdateDateString,
  setCountPallets = () => {},
}) {
  const [data, setData] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const now = new Date();
    const dayCurrent = now.getDate().toString().padStart(2, '0');
    const MonthCurrent = (now.getMonth() + 1).toString().padStart(2, '0');
    axiosApi
      .post(`provider-date`, {
        startTime: `${now.getFullYear()}-${MonthCurrent}-${dayCurrent}T00:00:28.549Z`,
        endTime: `${now.getFullYear()}-${MonthCurrent}-${dayCurrent}T23:59:28.549Z`,
      })
      .then((response) => {
        const { data = [] } = response;
        const hourCurrent = now.getHours().toString().padStart(2, '0');
        const minutesCurrent = now.getMinutes().toString().padStart(2, '0');
        const dayCurrent = now.getDate().toString().padStart(2, '0');
        const MonthCurrent = (now.getMonth() + 1).toString().padStart(2, '0');

        const countPallets = data.reduce((acc, item) => {
          if (item.volumeType === 'pallets') {
            return acc + item.quantity;
          } else {
            return acc;
          }
        }, 0);

        setIsLoading(false);
        setCountPallets(countPallets);
        setLastUpdateDateString(
          `${dayCurrent}/${MonthCurrent}/${now.getFullYear()} - ${hourCurrent}:${minutesCurrent}`,
        );
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [setLastUpdateDateString]);

  useEffect(() => {
    const now = new Date();
    const dayCurrent = now.getDate().toString().padStart(2, '0');
    const MonthCurrent = (now.getMonth() + 1).toString().padStart(2, '0');
    const getTable = () => {
      axiosApi
        .post(`provider-date`, {
          startTime: `${now.getFullYear()}-${MonthCurrent}-${dayCurrent}T00:00:28.549Z`,
          endTime: `${now.getFullYear()}-${MonthCurrent}-${dayCurrent}T23:59:28.549Z`,
        })
        .then((response) => {
          const hourCurrent = now.getHours().toString().padStart(2, '0');
          const minutesCurrent = now.getMinutes().toString().padStart(2, '0');
          const dayCurrent = now.getDate().toString().padStart(2, '0');
          const MonthCurrent = (now.getMonth() + 1).toString().padStart(2, '0');

          setLastUpdateDateString(
            `${dayCurrent}/${MonthCurrent}/${now.getFullYear()} - ${hourCurrent}:${minutesCurrent}`,
          );
          setData(response.data);
          setIsLoading(false);

        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);

        });
    };

    setInterval(getTable, sector === 'home' && !isAdmin ? 60000 : 240000);
  }, [urlServer, sector, isAdmin, setLastUpdateDateString]);

  const getTableExport = () => {
    const now = new Date();
    const dayCurrent = now.getDate().toString().padStart(2, '0');
    const MonthCurrent = (now.getMonth() + 1).toString().padStart(2, '0');
    axiosApi
      .post(`provider-date`, {
        startTime: `${now.getFullYear()}-${MonthCurrent}-${dayCurrent}T00:00:28.549Z`,
        endTime: `${now.getFullYear()}-${MonthCurrent}-${dayCurrent}T23:59:28.549Z`,
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
        
        setData(data);
        setIsLoading(false);
        setCountPallets(countPallets);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
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
          {sector === 'home' ? (
            <>
              <th className="align-middle text-center">Status</th>
              <th className="align-middle text-center">Visualizar</th>
            </>
          ) : (
            <>
              <th className="align-middle text-center">Editar</th>
              <th className="align-middle text-center">Liberar</th>
              <th className="align-middle text-center">Deletar</th>
            </>
          )}
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
  );
}

export default TableComponent;
