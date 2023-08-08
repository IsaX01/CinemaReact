import { deleteFood, getFoods } from '@/api/food';
import { ConfirmDialog } from '@/components/common/confirm-dialog/ConfirmDialog';
import { Notification } from '@/components/common/notificacion/Notificacion';
import { Table } from '@/components/common/table/Table';
import history from '@/utils/history';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useEffect, useState } from 'react';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'food', label: 'Comidas' },
  { id: 'description', label: 'Descripción' },
  { id: 'categories_id', label: 'Categoría' },
  { id: 'price', label: 'Precio' },
];

const handleClickDelete = async ({
  id,
  foods,
  setFoods,
  setNotify,
  setConfirmDialog,
  confirmDialog,
}) => {
  try {
    await deleteFood(id);
    const newFoods = foods.filter((foods) => foods.id !== id);
    setFoods(newFoods);
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
  console.log(id, 'Bloquear');
};

const handleClickEdit = (id) => {
  history.push({
    pathname: '/dashboard/comida/editar',
    state: { id },
  });
};

export default function FoodTable() {
  const [foods, setFoods] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, tittle: '', subTitle: '' });
  useEffect(async () => {
    const foods = await getFoods();
    setFoods(foods.data.data);
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
              title: '¿Estás seguro que deseas eliminar esta Comida?',
              subTitle: 'No puedes deshacer está acción!',
              onConfirm: () =>
                handleClickDelete({
                  id: id,
                  foods,
                  setFoods,
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
        rows={foods}
        title={'Kiosko'}
        link={'/dashboard/comida/agregar'}
        actions={actions}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
