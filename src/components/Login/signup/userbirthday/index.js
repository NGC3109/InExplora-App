import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../../styles/groups/step3';
import { Alert } from '../../../ui/Alert';
import ButtonCustom from '../../../ui/Button';
import { Select, CheckIcon, NativeBaseProvider } from 'native-base';

const SignUp_Birthday_Template = ({
    continueButton,
    handleDayChange,
    handleMonthChange,
    handleYearChange,
    messageAlert,
    day,
    month,
    year,
    daysInMonth,
}) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(100), (val, index) => String(currentYear - index - 18));
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Text style={styles.subtitle}>¿Cuál es tu fecha de nacimiento?</Text>
                <Text style={styles.description}>
                    Escribe tu fecha de nacimiento, así los demás usuarios podrán saber más de ti.
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Select
                        selectedValue={day}
                        minWidth="30%"
                        accessibilityLabel="Día"
                        placeholder="Día"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="1" />
                        }}
                        onValueChange={handleDayChange}
                    >
                        {daysInMonth.map(d => <Select.Item key={d} label={d} value={d} />)}
                    </Select>
                    <Select
                        selectedValue={month}
                        minWidth="30%"
                        accessibilityLabel="Mes"
                        placeholder="Mes"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="1" />
                        }}
                        onValueChange={handleMonthChange}
                    >
                        {months.map((m, index) => <Select.Item key={index + 1} label={m} value={String(index + 1).padStart(2, '0')} />)}
                    </Select>
                    <Select
                        selectedValue={year}
                        minWidth="30%"
                        accessibilityLabel="Año"
                        placeholder="Año"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="1" />
                        }}
                        onValueChange={handleYearChange}
                    >
                        {years.map(y => <Select.Item key={y} label={y} value={y} />)}
                    </Select>
                </View>
                <View>
                    {messageAlert &&
                        <Alert
                            message="Ingresa una fecha válida."
                            type="danger"
                            Customstyle={{ marginTop: 5 }}
                        />
                    }
                </View>
                <View style={{ flex: 1 }} />
                <ButtonCustom
                    onPress={continueButton}
                    title="Continuar"
                />
            </View>
        </NativeBaseProvider>
    );
};

export default SignUp_Birthday_Template;
