import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

const Cita = ({item, deletePatient}) => {
    const alertDelete = (id) => {
        console.log('Eliminando....', id);
        deletePatient(id);
    };

    return (
        <View style={styles.meeting}>
            <View>
                <Text style={styles.label}>Paciente</Text>
                <Text style={styles.text}>{item.patient}</Text>
            </View>
            <View>
                <Text style={styles.label}>Propietario</Text>
                <Text style={styles.text}>{item.owner}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sintomas</Text>
                <Text style={styles.text}>{item.symptoms}</Text>
            </View>
            <View>
                <TouchableHighlight
                    onPress={() => alertDelete(item.id)}
                    style={styles.btnDelete}>
                    <Text style={styles.titleDelete}>Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    meeting: {
        backgroundColor: '#fff',
        marginBottom: 5,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    text: {
        fontSize: 18,
    },
    btnDelete: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10,
    },
    titleDelete: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default Cita;
