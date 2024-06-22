import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) => arr.slice(index * size, index * size + size));
};
export const isEmailValid = (email) => {
    const emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
};

export const formatToThousands = (numero) => {
    if (numero || numero === 0) {
        return numero.toLocaleString('de-DE', { maximumFractionDigits: 0 });
    } else {
        return numero;
    }
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatCustomDate = (date) => {
    const now = moment();
    const messageDate = moment(date, 'ddd MMM DD YYYY');
    const daysDiff = now.diff(messageDate, 'days');
  
    if (daysDiff === 0) {
      return 'Hoy';
    } else if (daysDiff === 1) {
      return 'Ayer';
    } else if (daysDiff <= 7) {
        return capitalizeFirstLetter(messageDate.format('dddd'));
    } else if (daysDiff <= 14) {
      return 'Hace una semana';
    } else if (daysDiff <= 21) {
      return 'Hace dos semanas';
    } else if (now.year() !== messageDate.year()) {
        return capitalizeFirstLetter(messageDate.format('MMMM YYYY'));
    } else {
        return capitalizeFirstLetter(messageDate.format('MMMM'));
    }
  };
  