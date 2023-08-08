import moment from 'moment';
import { moneyFormatter } from 'shared/utils';

export const formatMovieName = (name) =>
  name
    .trim()
    .toLocaleLowerCase()
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .join('-');

export const formatMovieScheduleId = (name, scheduleId) =>
  [scheduleId, formatMovieName(name)].join('_');

const dateFormatterLLL = (date) => moment(date).locale('es').format('lll');

const dateFormatterLL = (date) => moment(date).locale('es').format('ll');

const phoneNumberFormatter = (phone) => {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    const initialCode = match[1] ? '+1 ' : '';

    return [initialCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }

  return null;
};

const durationFormatter = (duration) =>
  Math.floor(duration / 60) + ' h ' + (duration % 60) + ' min';

const formatMap = {
  date: (date) => dateFormatterLLL(date),
  date_end: (date) => dateFormatterLL(date),
  date_ini: (date) => dateFormatterLL(date),
  birthday: (date) => dateFormatterLL(date),
  release_date: (date) => dateFormatterLL(date),
  duration: (duration) => durationFormatter(duration),
  totalPrice: (price) => moneyFormatter(price, true),
  price: (price) => moneyFormatter(price, true),
  phone: (phoneNumber) => phoneNumberFormatter(phoneNumber),
  status_prom: (status) => (status === '1' ? 'Activo' : 'Inactivo'),
  sex_id: (sexId) => (sexId === 1 ? 'M' : 'F'),
  description: (movieDescription) => `${movieDescription.substring(0, 200)}...`,
};

export const formatData = ({ value, key }) => {
  const formatter = formatMap[key];
  if (formatter) {
    return formatter(value);
  }

  return value;
};
