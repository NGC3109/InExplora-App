import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const quotes = [
    { subtitle: "“El mundo es un libro y aquellos que no viajan solo leen una página.”", autor: "San Agustín" },
    { subtitle: "“Viajar te deja sin palabras y después te convierte en un narrador de historias.”", autor: "Ibn Battuta" },
    { subtitle: "“No todos los que deambulan están perdidos.”", autor: "J.R.R. Tolkien" },
    { subtitle: "“Viajar es vivir.”", autor: "Hans Christian Andersen" },
    { subtitle: "“La vida es un viaje y quien viaja vive dos veces.”", autor: "Omar Khayyam" },
    { subtitle: "“Viajar es la única cosa que compras que te hace más rico.”", autor: "Desconocido" },
    { subtitle: "“El viaje de mil millas comienza con un solo paso.”", autor: "Lao Tzu" },
    { subtitle: "“El mayor placer de la vida es hacer lo que la gente dice que no puedes hacer.”", autor: "Walter Bagehot" },
    { subtitle: "“La aventura puede ser loca, pero el aventurero debe ser cuerdo.”", autor: "Gilbert Chesterton" },
    { subtitle: "“Viajar es descubrir que todos están equivocados sobre otros países.”", autor: "Aldous Huxley" },
    { subtitle: "“No hay tierras extranjeras. Solo el viajero es extranjero.”", autor: "Robert Louis Stevenson" },
    { subtitle: "“Los viajes son los viajeros. Lo que vemos no es lo que vemos, sino lo que somos.”", autor: "Fernando Pessoa" },
    { subtitle: "“El viaje no está en buscar nuevos paisajes, sino en tener nuevos ojos.”", autor: "Marcel Proust" },
    { subtitle: "“Un viaje se mide mejor en amigos que en millas.”", autor: "Tim Cahill" },
    { subtitle: "“De vez en cuando es bueno hacer una pausa en nuestra búsqueda de la felicidad y simplemente ser felices.”", autor: "Guillaume Apollinaire" },
    { subtitle: "“Viajar es fatal para los prejuicios, la intolerancia y la estrechez de mente.”", autor: "Mark Twain" },
    { subtitle: "“La mejor educación que puedes recibir es viajar.”", autor: "Lisa Ling" },
    { subtitle: "“El verdadero viaje de descubrimiento no consiste en buscar nuevos paisajes, sino en mirar con nuevos ojos.”", autor: "Marcel Proust" },
    { subtitle: "“El viaje es una búsqueda de aquello que somos.”", autor: "Pico Iyer" },
    { subtitle: "“Viajar es la respuesta, no importa cuál sea la pregunta.”", autor: "Desconocido" },
    { subtitle: "“No encontramos grupos que coincidan con tu búsqueda. ¡Es el momento perfecto para crear tu propio grupo y vivir aventuras únicas!”", autor: "" },
  ];

const Loading = ({ url, size, text }) => {
  const [quote, setQuote] = useState({ subtitle: "", autor: "" });

  useEffect(() => {
    if (size === 'xl') {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }
  }, [size]);

  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        style={size === 'xl' ? styles.loadingGifXL : styles.loadingGif}
        source={{
          uri: url,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.loadingText}>{text}</Text>
      <Text style={styles.subtitle}>{quote.subtitle}</Text>
      <Text style={styles.autor}>{quote.autor}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGif: {
    width: 50, // Ajusta según tu necesidad
    height: 50, // Ajusta según tu necesidad
  },
  loadingText: {
    marginTop: 10, // Espacio entre el GIF y el texto
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  loadingGifXL: {
    width: 250, // Ajusta según tu necesidad
    height: 211, // Ajusta según tu necesidad
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  autor: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default Loading;
