import { deleteRoom, getRoom } from '@/api/room';
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
  { id: 'name', label: 'Nombre' },
  { id: 'location', label: 'Descripción' },
  { id: 'seats', label: 'Número de asientos' },
  { id: 'is_vip', label: 'Es VIP?' },
];

const handleClickDelete = async ({
  id,
  room,
  setRoom,
  setNotify,
  setConfirmDialog,
  confirmDialog,
}) => {
  try {
    await deleteRoom(id);
    const newRoom = room.filter((room) => room.id !== id);
    setRoom(newRoom);
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
    pathname: '/dashboard/sala/editar',
    state: { id },
  });
};

export default function RoomTable() {
  const [room, setRoom] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  useEffect(async () => {
    const room = await getRoom();
    setRoom(room.data.data);
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
              title: '¿Estás seguro que deseas eliminar esta pelicula?',
              subTitle: 'No puedes deshacer está acción!',
              onConfirm: () =>
                handleClickDelete({
                  id: id,
                  room,
                  setRoom,
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
        rows={room}
        title={'Salas'}
        link={'/dashboard/sala/agregar'}
        actions={actions}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
