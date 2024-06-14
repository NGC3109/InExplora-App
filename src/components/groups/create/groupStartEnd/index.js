import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { styles as customStyles } from '../../../../styles/groups/step4';
import ButtonCustom from '../../../ui/Button';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment-timezone';
import { Alert } from '../../../ui/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { saveGroupDatesAndUpdateDraft } from '../../../../actions/groups/groupAction';
import { useNavigation } from '@react-navigation/native';

LocaleConfig.locales['es-cl'] = {
    monthNames: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    monthNamesShort: [
        'Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.',
        'Jul.', 'Ago.', 'Sept.', 'Oct.', 'Nov.', 'Dic.'
    ],
    dayNames: [
        'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
    ],
    dayNamesShort: [
        'D', 'L', 'M', 'X', 'J', 'V', 'S'
    ],
    today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es-cl';

const GroupStartEnd_Template = ({ messageAlert, continueButton }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const draftState = useSelector(state => state.groupReducer.draft);

    useEffect(() => {
        const today = moment().tz("America/Santiago");
        const year = today.year();
        const month = (today.month() + 1).toString().padStart(2, '0');
        const day = today.date().toString().padStart(2, '0');
        setCurrentDate(`${year}-${month}-${day}`);
    }, []);

    const onDayPress = (day) => {
        if (day.dateString < currentDate) {
            // Si la fecha seleccionada es anterior a la fecha actual, no hacer nada
            return;
        }

        if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate(null);
        } else if (startDate && !endDate) {
            if (day.dateString < startDate) {
                setEndDate(startDate);
                setStartDate(day.dateString);
            } else {
                setEndDate(day.dateString);
            }
        }
    };

    const getMarkedDates = () => {
        let markedDates = {};
        if (startDate) {
            markedDates[startDate] = { startingDay: true, color: '#001422', textColor: 'white' };
        }
        if (endDate) {
            markedDates[endDate] = { endingDay: true, color: '#001422', textColor: 'white' };
            let start = new Date(startDate);
            let end = new Date(endDate);
            let current = new Date(start);
            current.setDate(current.getDate() + 1);
            while (current < end) {
                let dateString = current.toISOString().split('T')[0];
                markedDates[dateString] = { color: '#001422', textColor: 'white' };
                current.setDate(current.getDate() + 1);
            }
        }
        return markedDates;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Selecciona una fecha';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleContinue = () => {
        if (!startDate || !endDate) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000); // Ocultar el mensaje después de 3 segundos
            return;
        }
        if(startDate && endDate){
            dispatch(saveGroupDatesAndUpdateDraft(draftState.id, formatDate(startDate), formatDate(endDate)))
            navigation.navigate('step1')
        }
    };

    return (
        <ScrollView>
            <View style={customStyles.container}>
                <Text style={customStyles.subtitle}>¡Tu aventura está a punto de comenzar!</Text>
                <Text style={customStyles.description}>
                    Planifica las fechas de tu viaje y prepárate para una experiencia inolvidable.
                </Text>
                {/* <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>Fecha de inicio: {formatDate(startDate)}</Text>
                    <Text style={styles.dateText}>Fecha de fin: {formatDate(endDate)}</Text>
                </View> */}
                {showAlert && (
                    <Alert
                        message="Por favor, selecciona las fechas de inicio y fin del viaje."
                        type="danger"
                        Customstyle={{ marginTop: 5 }}
                    />
                )}
                <View style={styles.dateContainer}>
                    <Calendar
                        current={currentDate}
                        minDate={currentDate}
                        onDayPress={onDayPress}
                        markedDates={getMarkedDates()}
                        markingType={'period'}
                        theme={{
                            selectedDayBackgroundColor: '#50cebb',
                            selectedDayTextColor: 'white',
                            todayTextColor: '#50cebb',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#50cebb',
                            selectedDotColor: '#ffffff',
                            arrowColor: '#001422',
                            monthTextColor: '#001422',
                            indicatorColor: '#50cebb',
                            textDayFontFamily: 'monospace',
                            textMonthFontFamily: 'monospace',
                            textDayHeaderFontFamily: 'monospace',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16,
                        }}
                    />
                </View>
                <View style={{ flex: 1 }} />
                <ButtonCustom
                    onPress={handleContinue}
                    title="Continuar"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    dateContainer: {
        marginBottom: 10,
    },
    dateText: {
        fontSize: 16,
        color: '#000',
    },
});

export default GroupStartEnd_Template;
