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
//FUNCION PARA TIEMPO DE MENSAJES DE AUDIO
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
//funcion para comentarios
export const formatDate = (date) => {
  const now = moment();
  const commentDate = moment(date);
  const diffDays = now.diff(commentDate, 'days');
  if (diffDays === 0) {
    return commentDate.format('HH:mm');
  } else if (diffDays === 1) {
    return 'Ayer';
  } else if (diffDays === 2) {
    return 'Anteayer';
  } else if (diffDays <= 7) {
    return commentDate.format('dddd');
  } else {
    return `${Math.round(diffDays / 7)} semanas`;
  }
};

export const calculateProfileCompletion = (user) => {
    const fieldsToCheck = ['displayName', 'email', 'profilePicture', 'genre', 'birthday', 'pais', 'bio', 'interests', 'languages', 'cellphone', 'superpower'];
    const totalFields = fieldsToCheck.length;
    let completedFields = 0;
  
    fieldsToCheck.forEach(field => {
      if (field === 'profilePicture' && user[field] === 'https://via.placeholder.com/150') {
        return;
      }
      
      if (Array.isArray(user[field]) && user[field].length > 0) {
        completedFields++;
      } else if (user[field] && !Array.isArray(user[field])) {
        completedFields++;
      }
    });
  
    return Math.round((completedFields / totalFields) * 100);
};

export const getAge = (birthday) => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const getRandomHeight = () => {
  return Math.floor(Math.random() * (350 - 200 + 1)) + 200;
};
  