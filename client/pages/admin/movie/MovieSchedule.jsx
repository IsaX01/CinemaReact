import Appointment from '@/components/schedule/Appointment';
import AppointmentTooltip from '@/components/schedule/AppointmentTooltip';
import useMovieStore from '@/stores/movieStore';
import useRoomStore from '@/stores/roomStore';
import useScheduleStore from '@/stores/scheduleStore';
import { formatMovieScheduleId } from '@/utils/format';
import { addScheduleSeats } from '@/api/schedule';
import CircularProgress from '@material-ui/core/CircularProgress';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.darkmoon.css';
import { useEffect, useRef } from 'react';

const currentDate = new Date();
const views = ['day', 'week', 'timelineDay'];
const groups = ['room_id'];

const MovieSchedule = () => {
  const {
    schedules,
    isLoading,
    add: addSchedule,
    update: updateSchedule,
    delete: deleteSchedule,
    isValidScheduleInterval,
    fetchAllSchedules,
  } = useScheduleStore((state) => state);
  const { movies, fetchAllMovies, getMovieById } = useMovieStore((state) => state);
  const { rooms, fetchAllRooms } = useRoomStore((state) => state);
  const scheduleRef = useRef(null);
  const { innerWidth: width } = window;

  useEffect(() => {
    fetchAllSchedules();
    fetchAllMovies();
    fetchAllRooms();
  }, []);

  const onCellClick = (e) => {
    let {
      startDate,
      endDate,
      groups: { room_id: roomId },
    } = e.cellData;
    const isValidAppointment = isValidScheduleInterval(startDate, endDate, roomId);
    if (!isValidAppointment) {
      e.cancel = true;
      console.log('Invalid Cell!');
    }
  };

  const deleteAppointment = (data) => {
    scheduleRef.current.instance.deleteAppointment(data);
  };

  const onAppointmentDeleting = async (e) => {
    try {
      await deleteSchedule(e.appointmentData.id);
    } catch (error) {
      e.cancel = true;
      console.log(error.message);
    }
  };

  const onAppointmentAdding = async (e) => {
    const { startDate, endDate, room_id: roomId, movie_id: movieId } = e.appointmentData;
    const isValidAppointment = isValidScheduleInterval(startDate, endDate, roomId, movieId);
    if (!isValidAppointment) {
      e.cancel = true;
      console.log('Invalid range of dates');
    } else {
      try {
        const id = await addSchedule(e.appointmentData);
        schedules[schedules.length - 1].id = id;
        const movieInfo = getMovieById(movieId);
        const formattedId = formatMovieScheduleId(movieInfo.name, id);
        await addScheduleSeats(formattedId);
      } catch (error) {
        e.cancel = true;
        console.log('Error adding appointment', error.message);
      }
    }
  };

  const onAppointmentUpdating = async (e) => {
    const { startDate, endDate, room_id: roomId, movie_id: movieId } = e.newData;
    const isValidAppointment = isValidScheduleInterval(startDate, endDate, roomId, movieId);
    if (!isValidAppointment) {
      e.cancel = true;
    } else {
      try {
        await updateSchedule(e.newData, e.oldData.id);
      } catch (error) {
        e.cancel = true;
        console.log('Error updating appointment', error.message);
      }
    }
  };

  const onAppointmentFormOpening = (e) => {
    const { form } = e;
    let { startDate, movie_id: movieId } = e.appointmentData;
    let movieInfo = getMovieById(movieId) || {};

    form.option('items', [
      {
        label: {
          text: 'Película',
        },
        editorType: 'dxSelectBox',
        dataField: 'movie_id',
        validationRules: [{ type: 'required', message: 'La película es requerida.' }],
        editorOptions: {
          items: movies,
          displayExpr: 'name',
          valueExpr: 'id',
          onValueChanged(args) {
            movieInfo = getMovieById(args.value);

            form.updateData('director', movieInfo?.director);
            form.updateData('description', movieInfo?.description);
            form.updateData(
              'endDate',
              new Date(startDate.getTime() + 60 * 1000 * movieInfo?.duration || 0)
            );
          },
        },
      },
      {
        label: {
          text: 'Director',
        },
        name: 'director',
        editorType: 'dxTextBox',
        editorOptions: {
          value: movieInfo.director,
          readOnly: true,
        },
      },
      {
        label: {
          text: 'Inicio',
        },
        dataField: 'startDate',
        editorType: 'dxDateBox',
        validationRules: [
          {
            type: 'async',
            validationCallback: async () => {
              const {
                startDate,
                endDate,
                room_id: roomId,
                movie_id: movieId,
              } = form.option('formData');
              const isValid = isValidScheduleInterval(startDate, endDate, roomId, movieId);

              return new Promise((res) => res(isValid));
            },
            message: 'Rango de fecha no disponible',
          },
        ],
        editorOptions: {
          width: '100%',
          type: 'datetime',
          onValueChanged(args) {
            startDate = args.value;
            form.updateData(
              'endDate',
              new Date(startDate.getTime() + 60 * 1000 * movieInfo?.duration || 0)
            );
          },
        },
      },
      {
        label: {
          text: 'Fin',
        },
        name: 'endDate',
        dataField: 'endDate',
        editorType: 'dxDateBox',
        editorOptions: {
          width: '100%',
          type: 'datetime',
          readOnly: true,
        },
      },
      {
        label: {
          text: 'Sala',
        },
        editorType: 'dxSelectBox',
        dataField: 'room_id',
        editorOptions: {
          items: rooms,
          displayExpr: 'name',
          valueExpr: 'id',
        },
      },
      {
        label: {
          text: 'Descripción',
        },
        dataField: 'description',
        editorType: 'dxTextArea',
        editorOptions: {
          value: movieInfo.description,
          readOnly: true,
        },
      },
    ]);
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className="dx-viewport">
      <Scheduler
        timeZone="America/Santo_Domingo"
        dataSource={schedules}
        views={views}
        defaultCurrentView="day"
        ref={scheduleRef}
        defaultCurrentDate={currentDate}
        groups={groups}
        height={900}
        editing={{
          allowAdding: true,
          allowDeleting: true,
          allowDragging: false,
          allowUpdating: true,
        }}
        firstDayOfWeek={0}
        showCurrentTimeIndicator={true}
        onAppointmentAdding={onAppointmentAdding}
        onAppointmentUpdating={onAppointmentUpdating}
        onAppointmentDeleting={onAppointmentDeleting}
        startDayHour={7}
        endDayHour={24}
        showAllDayPanel={false}
        crossScrollingEnabled={true}
        adaptivityEnabled={width < 500}
        cellDuration={20}
        appointmentComponent={Appointment}
        onCellClick={onCellClick}
        appointmentTooltipComponent={(props) => (
          <AppointmentTooltip {...props} deleteAppointment={deleteAppointment} />
        )}
        onAppointmentFormOpening={onAppointmentFormOpening}
      >
        <Resource dataSource={rooms} fieldExpr="room_id" label="Sala" displayExpr={'name'} />
      </Scheduler>
    </div>
  );
};

export default MovieSchedule;
