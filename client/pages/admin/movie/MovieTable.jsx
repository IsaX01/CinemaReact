import { deleteMovie, getMovies } from '@/api/movie';
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
  { id: 'duration', label: 'Duración' },
  { id: 'release_date', label: 'Fecha de estreno' },
  { id: 'description', label: 'Description' },
  { id: 'status_id', label: 'Estado' },
];

const handleClickDelete = async ({
  id,
  movies,
  setMovies,
  setNotify,
  setConfirmDialog,
  confirmDialog,
}) => {
  try {
    await deleteMovie(id);
    const newMovies = movies.filter((movies) => movies.id !== id);
    setMovies(newMovies);
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
    pathname: '/dashboard/pelicula/editar',
    state: { id },
  });
};

export default function MovieTable() {
  const [movies, setMovies] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  useEffect(async () => {
    const movies = await getMovies();
    setMovies(movies.data.data);
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
                  movies,
                  setMovies,
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
        rows={movies}
        title={'Películas'}
        link={'/dashboard/pelicula/agregar'}
        actions={actions}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
