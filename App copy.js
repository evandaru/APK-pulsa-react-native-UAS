import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const slides = [
  {
    key: '1',
    title: 'Selamat Datang',
    text: 'Aplikasi jualan pulsa',
    backgroundColor: '#d85410', // Ganti warna latar belakang di sini
  },
  {
    key: '2',
    title: 'Antrean Online',
    text: 'Dapatkan kemudahan dalam transaksi',
    backgroundColor: '#f5f5f5', // Ganti warna latar belakang di sini
  },
  {
    key: '3',
    title: 'Pelayanan Terbaik',
    text: 'Kami siap melayani Anda',
    backgroundColor: '#0046aa', // Ganti warna latar belakang di sini
  },
];

const Slider = ({ navigation }) => {
  const [showSlider, setShowSlider] = useState(true);

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const handleDone = () => {
    setShowSlider(false);
    navigation.navigate('Dashboard');
  };

  if (showSlider) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        showPrevButton
        showNextButton
        showDoneButton
        onDone={handleDone}
        renderDoneButton={() => (
          <View style={styles.buttonContainer}>
            <Button title="Selesai" onPress={handleDone} color="black" />
          </View>

        )}
      />
    );
  }

  return null;
};

const BerandaScreen = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>Selamat Datang PULSA APP</Text>
  </View>
);

const HistoryScreen = () => (
  <View style={styles.container}>
    <Text>ini historui</Text>
    {/* <Text style={styles.heading}>History Reservasi</Text> */}
    {/* Tampilkan riwayat reservasi yang sudah dilakukan */}
    {/* <Text style={styles.text}>Data Riwayat Reservasi:</Text> */}
    {/* <Text style={styles.text}>{JSON.stringify(historyData)}</Text> */}
  </View>
);

const ReservasiScreen = () => {
  const [nik, setNik] = useState('');
  const [poli, setPoli] = useState('');
  const [dokter, setDokter] = useState('');

  const handleSubmit = () => {
    // Kirim data reservasi ke Firebase atau lakukan operasi lainnya
    const reservasiData = {
      nik,
      poli,
      dokter,
    };

    // Tampilkan data yang sudah di-submit
    alert(`Data Reservasi:\nNIK: ${nik}\nPoli: ${poli}\nDokter: ${dokter}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reservasi Online</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>NIK</Text>
        <TextInput
          style={styles.input}
          value={nik}
          onChangeText={setNik}
          placeholder="Masukkan NIK"
        />

        <Text style={styles.label}>Poli</Text>
        <TextInput
          style={styles.input}
          value={poli}
          onChangeText={setPoli}
          placeholder="Masukkan Poli"
        />

        <Text style={styles.label}>Dokter</Text>
        <TextInput
          style={styles.input}
          value={dokter}
          onChangeText={setDokter}
          placeholder="Masukkan Nama Dokter"
        />

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const Dashboard = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={BerandaScreen}
      options={{
        tabBarIcon: ({ color, size }) => {
          <MaterialCommunityIcons name="home" color="blue" size={19} />
        }
      }}
    />
    <Tab.Screen
      name="Tentang Kami"
      component={HistoryScreen}
    />
    <Tab.Screen
      name="Reservasi"
      component={ReservasiScreen}
    />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Slider" component={Slider} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 40,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default App;
