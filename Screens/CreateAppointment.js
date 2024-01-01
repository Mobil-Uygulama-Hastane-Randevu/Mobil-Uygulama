import React, { useState } from 'react';
import { Dimensions ,View, Text, TextInput, Button, StyleSheet,TouchableOpacity,ScrollView ,Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker'; // Picker'ı doğru yerden import edin
//import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome'; // Kullanacağınız ikon kütüphanesine göre bu import değişebilir

import Footer from '../Components/Footer'; // Footer component'inin bulunduğu dizini doğru şekilde güncelleyin
import Header from '../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const CreateAppointment = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [selectedTime, setSelectedTime] = useState(null); // Yeni eklenen state
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);


  // Pazartesiden cumaya kadar olan günler
  const weekdays = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

  const hospitals = [
    { id: 1, name: 'Hastane 1' },
    { id: 2, name: 'Hastane 2' },
    { id: 3, name: 'Hastane 3' },
    // Diğer hastaneleri buraya ekleyin
  ];
  const clinics = [
    { id: 1, name: 'Kalp-damar', icon: require('../assets/heart.png')  },
    { id: 2, name: 'Diş' , icon: require('../assets/tooth.png') },
    { id: 3, name: 'Nöroloji' , icon: require('../assets/brainstorm.png') },
  ];

  const doctors = [
    { id: 1, name: 'Dr. Doktor 1', image: require('../assets/profile.png') },
    { id: 2, name: 'Dr. Doktor 2', image: require('../assets/profile.png') },
    { id: 3, name: 'Dr. Doktor 3', image: require('../assets/profile.png') },
    // Diğer doktorları buraya ekleyin
  ];  

  const handleDateSelect = (day) => {
    setSelectedDate(day);
  };

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
      <View style={styles.container}>
        <Header title={'DoctorApp'} icon={require('../assets/logo.png')} />

        <Picker
          selectedValue={selectedHospital}
          onValueChange={(itemValue) => setSelectedHospital(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Hastane Seçiniz" value={null}  style={styles.selectList}/>
          {hospitals.map((hospital) => (
            <Picker.Item key={hospital.id} label={hospital.name} value={hospital.id}  style={styles.selectList}/>
          ))}
        </Picker>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.clinicsContainer}
          enabled={true}

        >
          {clinics.map((clinic) => (
            <TouchableOpacity
              key={clinic.id}
              style={[styles.clinicBox, { backgroundColor: selectedClinic === clinic.id ? '#3498db' : 'gray' }]}
              onPress={() => setSelectedClinic(clinic.id)}
            >
              <Image source={clinic.icon} style={styles.clinicIcon} />
              <Text style={styles.clinicText}>{clinic.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Text style={styles.selectList}>Randevu günü seçiniz</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekdaysContainer}
        >        
            {weekdays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dayBox, { backgroundColor: selectedDate === day ? '#3498db' : 'gray' }]}
              onPress={() => handleDateSelect(day)}
            >
              <Text style={styles.dayText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Text style={styles.selectList}>Randevu saati seçiniz</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hoursContainer}
          >
            {[9, 10, 11, 13, 14, 15, 16, 17].map((hour) => (
              <TouchableOpacity
                key={hour}
                style={[styles.hourBox, { backgroundColor: selectedTime === hour ? '#3498db' : 'gray' }]}
                onPress={() => setSelectedTime(hour)}
              >
                <Text style={styles.hourText}>{hour}:00</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.doctorsContainer}
        >
          {doctors.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              style={[styles.doctorBox, { backgroundColor: selectedDoctor === doctor.id ? '#3498db' : 'gray' }]}
              onPress={() => setSelectedDoctor(doctor.id)}
            >
              <Image source={doctor.image} style={styles.doctorImage} />
              <Text style={styles.doctorName}>{doctor.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button title="Randevu Oluştur" onPress={saveAppointment} />

      </View>
  );
};

export default CreateAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  clinicsContainer: {
    
    marginTop: 20,
  },
  clinicBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  clinicText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
  clinicIcon: {
    width: 20, // İstenilen genişlik ve yüksekliği ayarlayın
    height: 20,
    marginRight: 10,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 18,
  },
  selectList: {
    marginTop: 10,
    color:'black',
    fontSize: 18,
  },
  hoursContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  hourBox: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  hourText: {
    color: 'white',
    fontWeight: 'bold',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dayBox: {
    height: 60,
    width:70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  dayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#2c3e50',
  },
  doctorsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  doctorBox: {
    width: 120,
    height:120,
    marginRight: 10,
    alignItems: 'center',
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 14,
    textAlign: 'center',
  },

});      