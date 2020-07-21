/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from 'react-native';
import Cita from './components/meeting/cita';
import FormCustom from './components/form/form';

const App = () => {
    const [showForm, saveShowForm] = useState(false);


    const [appointments, setAppointments] = useState([]);

    const deletePatient = (id) => {
        saveShowForm((currentAppointments) => {
            return currentAppointments.filter((appointment) => appointment.id !== id);
        });
    };

    const showFormAction = () => {
        saveShowForm(!showForm);
    };

    const closeKeyboard = () => {
        Keyboard.dismiss();
    };

    return (

        <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
            <View style={styles.container}>
                <Text style={styles.title}>Administrador de Citas</Text>
                <View>
                    <TouchableHighlight
                        onPress={() => showFormAction()}
                        style={styles.btnShow}>
                        <Text style={styles.titleShow}>{showForm ? 'Cancelar' : 'Crear'} </Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.content}>
                    {showForm ? (
                        <>
                            <Text style={styles.title}>
                                Crear Nuevo
                            </Text>
                            <FormCustom
                                appointments={appointments}
                                setAppointments={setAppointments}
                                saveShowForm={saveShowForm}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={styles.title}>
                                {appointments.length > 0
                                    ? 'Administra tus citas'
                                    : 'No hay citas Agrega una'}
                            </Text>

                            <FlatList
                                style={styles.list}
                                data={appointments}
                                renderItem={({item}) => (
                                    <Cita item={item} deletePatient={deletePatient}/>
                                )}
                                keyExtractor={(cita) => cita.id}
                            />
                        </>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        marginHorizontal: '2.5%',
    },
    list: {
        flex: 1,
    },
    btnShow: {
        padding: 10,
        backgroundColor: 'blue',
        marginVertical: 10,
    },
    titleShow: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default App;
