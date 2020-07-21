import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Alert,
    ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const FormCustom = ({appointments, setAppointments, saveShowForm}) => {
    const [patient, savePatient] = useState('');
    const [owner, saveOwner] = useState('');
    const [phone, savePhone] = useState('');
    const [symptoms, saveSymptoms] = useState('');


    const [date, saveDate] = useState('');
    const [time, saveTime] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        const options = {year: 'numeric', month: 'long', day: '2-digit'};
        saveDate(date.toLocaleDateString('es-ES', options));
        hideDatePicker();
    };

    const handleConfirmTime = (time) => {
        const options = {hour: 'numeric', minute: '2-digit'};
        saveTime(time.toLocaleString('es-US', options));
        hideTimePicker();
    };

    const createNewMeeting = () => {
        if (patient.trim() === '' ||
            owner.trim() === '' ||
            phone.trim() === '' ||
            symptoms.trim() === '' ||
            time.trim() === '' ||
            date.trim() === '') {
            showAlert();
            return;
        }
        const appointment = {patient, owner, phone, symptoms, time, date};
        appointment.id = shortid.generate();

        const appointmentsNew = [...appointments, appointment];
        setAppointments(appointmentsNew);

        saveShowForm(false);
    };

    const showAlert = () => {
        Alert.alert(
            'Error',
            'All fields are required',
            [{text: 'OK'}],
        );
    };

    return (
        <>
            <ScrollView style={styles.form}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => savePatient(text)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => saveOwner(text)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Teléfono Contacto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => savePhone(text)}
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Show Date Picker" onPress={showDatePicker}/>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                        headerTextIOS='Date'
                    />
                    <Text>{date}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Show Time Picker" onPress={showTimePicker}/>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                        headerTextIOS='Time'
                    />
                    <Text>{time}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Sintomas:</Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={(text) => saveSymptoms(text)}
                    />
                </View>
                <View>
                    <TouchableHighlight
                        onPress={() => createNewMeeting()}
                        style={styles.btnSave}>
                        <Text style={styles.titleSave}>Guardar</Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    btnSave: {
        padding: 10,
        backgroundColor: 'green',
        marginVertical: 10,
    },
    titleSave: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FormCustom;
