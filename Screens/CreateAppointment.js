import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker'; // Picker'ı doğru yerden import edin


const CreateAppointment = () => {
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');

  const hospitals = ['Hospital A', 'Hospital B', 'Hospital C']; // Hastaneleri burada tanımlayın
  const clinics = ['Clinic X', 'Clinic Y', 'Clinic Z']; // Poliklinikleri burada tanımlayın

  const saveAppointment = async () => {
    try {
      // Firebase'e randevu bilgilerini kaydet
      await firestore().collection('appointments').add({
        hospital: selectedHospital,
        clinic: selectedClinic,
        date: selectedDate,
        time: selectedTime,
        patientName: patientName,
      });

      // Randevu kaydedildikten sonra kullanıcıyı başka bir sayfaya yönlendirme vb. işlemler yapabilirsiniz.
    } catch (error) {
      console.error('Randevu kaydetme hatası:', error);
    }
  };

  return (
    <View>
      <Text>Hastane Seçin:</Text>
      <Picker
        selectedValue={selectedHospital}
        onValueChange={(itemValue) => setSelectedHospital(itemValue)}
      >
        {hospitals.map((hospital, index) => (
          <Picker.Item key={index} label={hospital} value={hospital} />
        ))}
      </Picker>

      <Text>Poliklinik Seçin:</Text>
      <Picker
        selectedValue={selectedClinic}
        onValueChange={(itemValue) => setSelectedClinic(itemValue)}
      >
        {clinics.map((clinic, index) => (
          <Picker.Item key={index} label={clinic} value={clinic} />
        ))}
      </Picker>

      <Text>Tarih Seçin:</Text>
      <TextInput
        placeholder="Tarih"
        value={selectedDate}
        onChangeText={(text) => setSelectedDate(text)}
      />

      <Text>Saat Seçin:</Text>
      <TextInput
        placeholder="Saat"
        value={selectedTime}
        onChangeText={(text) => setSelectedTime(text)}
      />

      <Text>Hasta Adı Soyadı:</Text>
      <TextInput
        placeholder="Hasta Adı Soyadı"
        value={patientName}
        onChangeText={(text) => setPatientName(text)}
      />

      <Button title="Randevu Oluştur" onPress={saveAppointment} />
    </View>
  );
};

export default CreateAppointment;
