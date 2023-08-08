import { deletePromotion, getPromotions } from '@/api/promotion';
import { ConfirmDialog } from '@/components/common/confirm-dialog/ConfirmDialog';
import { Notification } from '@/components/common/notificacion/Notificacion';
import { Table } from '@/components/common/table/Table';
import history from '@/utils/history';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useEffect, useState } from 'react';

const columns = [
  { id: 'id', label: 'id' },
  { id: 'name', label: 'Nombre de la empresa' },
  { id: 'description', label: 'Descripción de la promoción' },
  { id: 'status_prom', label: 'Estado de la promoción' },
  { id: 'date_ini', label: 'Fecha de inicio' },
  { id: 'date_end', label: 'Fecha de finalización' },
];

const handleClickDelete = async ({
  id,
  Promotion,
  setPromotion,
  setNotify,
  setConfirmDialog,
  confirmDialog,
}) => {
  try {
    await deletePromotion(id);
    const newPromotion = Promotion.filter((Promotion) => Promotion.id !== id);
    setPromotion(newPromotion);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setNotify({
      isOpen: true,
      message: 'Se ha eliminado correctamente',
      type: 'success',
    });
  } catch (error) {
    console.error(error);
  }
};
const handleClickLock = (id) => {
  console.log(id);
};

const handleClickEdit = (id) => {
  history.push({
    pathname: '/dashboard/promociones/editar',
    state: { id },
  });
};

export default function PromotionTable() {
  const [Promotion, setPromotion] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  useEffect(async () => {
    const Promotion = await getPromotions();
    setPromotion(Promotion.data.data);
  }, []);

  const actions = ({ id }) => {
    return (
      <div>
        <LockOutlinedIcon onClick={() => handleClickLock(id)} />
        <EditOutlinedIcon onClick={() => handleClickEdit(id)} />
        <DeleteOutlineOutlinedIcon
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: '¿Estás seguro que deseas eliminar esta promación?',
              subTitle: 'No puedes deshacer está acción!',
              onConfirm: () =>
                handleClickDelete({
                  id: id,
                  Promotion,
                  setPromotion,
                  setNotify,
                  setConfirmDialog,
                  confirmDialog,
                }),
            });
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <Table
        columns={columns}
        rows={Promotion}
        title={'Promociones'}
        link={'/dashboard/promociones/agregar'}
        actions={actions}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
