import { ConfirmDialog } from '@/components/common/confirm-dialog/ConfirmDialog';
import { Notification } from '@/components/common/notificacion/Notificacion';
import { Table } from '@/components/common/table/Table';
import useShoppingHistoryStore from '@/stores/shoppingHistoryStore';
import history from '@/utils/history';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useEffect, useState } from 'react';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'shortDescription', label: 'Película y / o Comida' },
  { id: 'userName', label: 'Usuario' },
  { id: 'totalPrice', label: 'Precio' },
  { id: 'date', label: 'Fecha de la compra' },
];

const handleClickSeeInvoice = (id) => {
  history.push({
    pathname: '/dashboard/venta/detalle-de-factura',
    state: { id },
  });
};

export default function ShoppingHistoryTable() {
  const { invoices, fetchAllInvoices } = useShoppingHistoryStore((state) => state);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, tittle: '', subTitle: '' });
  useEffect(() => {
    fetchAllInvoices();
  }, []);

  const actions = ({ id }) => {
    return (
      <div>
        <VisibilityOutlinedIcon onClick={() => handleClickSeeInvoice(id)} />
      </div>
    );
  };

  return (
    <div>
      <Table columns={columns} rows={invoices} title={'Historial de compras'} actions={actions} />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
