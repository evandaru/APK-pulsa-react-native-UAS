import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import jsonData from './data.json';
import { Input, Card } from 'react-native-elements';



const slides = [
  {
    key: '1',
    title: 'Selamat Datang',
    text: 'Aplikasi jualan pulsa',
    image: require('./assets/1.png'),
    backgroundColor: '#1193f3', // Ganti warna latar belakang di sini
  },
  {
    key: '2',
    title: 'Antrean Online',
    image: require('./assets/2.png'),
    text: 'Dapatkan kemudahan dalam transaksi',
    backgroundColor: 'white', // Ganti warna latar belakang di sini

  },
  {
    key: '3',
    title: 'Pelayanan Terbaik',
    image: require('./assets/3.png'),
    text: 'Kami siap melayani Anda',
    backgroundColor: '#1193f3', // Ganti warna latar belakang di sini
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
        renderItem={renderItem}
        data={slides}
        onDone={handleDone}
        showPrevButton={true}
        showSkipButton={false}
        showDoneButton={true}
        doneLabel="Selesai"
      // data={slides}
      // renderItem={renderItem}
      // showPrevButton
      // showNextButton
      // showDoneButton
      // onDone={handleDone}
      // renderDoneButton={() => (
      //   <View style={styles.buttonContainer}>
      //     <Button title="Selesai" onPress={handleDone} color="black" />
      //   </View>

      // )}
      />
    );
  }

  return null;
};

const BerandaScreen = () => {
  const [nomor, setNomor] = useState('');
  const [data, setData] = useState([]);
  const [dataKuota, setDataKuota] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selectedCategory1, setSelectedCategory1] = useState(null);

  const handleNomorChange = (text) => {
    setNomor(text);
  };

  const toggleModal = (kategori) => {
    setSelectedCategory(kategori);
    setModalVisible(!modalVisible);
  };
  const toggleModal1 = (kuotaData) => {
    setSelectedCategory1(kuotaData);
    setModalVisible1(!modalVisible1);
  };

  useEffect(() => {
    setData(jsonData.kategori); // Set data dari objek JSON yang diimpor
    setDataKuota(jsonData.kuotaData);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={styles.isiKonten}>
            <Text style={styles.judulKonten}>🖐🏻 Jual Pulsa App</Text>
            <Text>  </Text>
            <Text>Kami siap melayani setulus hati</Text>
          </View>
          {/* search bar */}
          <View style={styles.SearchInput}>
            {/* <TextInput
            style={styles.input}
            placeholder="Cari anu"
            value={nomor}
            onChangeText={handleNomorChange}
          /> */}
            <View style={styles.inputNomor}>
              <Input
                value={nomor}
                keyboardType='numeric'
                onChangeText={handleNomorChange}
                placeholder='masukkan NO Hp'
                leftIcon={
                  <MaterialCommunityIcons
                    name='cellphone-check'
                    size={24}
                    color='black'
                  />
                }
              />
            </View>
          </View>
          <Text style={styles.judulsub}>Paket Pulsa</Text>
          {/* kategori */}
          <View style={styles.cardKategori}>
            {data.map((kategori) => (
              <TouchableOpacity
                key={kategori.id}
                onPress={() => toggleModal(kategori)}
                activeOpacity={0.6}
                underlayColor="#DDDDDD">
                <View style={styles.cardIsi}>
                  <Text style={styles.cardTitle}>{kategori.nama}</Text>
                  <Text style={styles.cardHarga}>{kategori.harga}</Text>
                  <Text>{kategori.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <Text style={styles.judulsub}>Paket Data</Text>
          </View>
          {/* data */}
          <ScrollView horizontal={true}>
            <View style={styles.cardKategoriKuota}>
              {dataKuota.map((kuotaData) => (
                <TouchableOpacity
                  key={kuotaData.id}
                  onPress={() => toggleModal1(kuotaData)}
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD">
                  <View style={styles.isiKuota}>
                    <Text style={styles.cardTitle}>{kuotaData.namaPaket}</Text>
                    <Text style={styles.cardHarga}>{kuotaData.isiPaket}</Text>
                    <Text style={styles.cardHarga}>{kuotaData.hargaPaket}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          {/* paket pulsa */}
          <Modal visible={modalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <View>
                {selectedCategory && (
                  <View
                    style={{
                      alignItems: 'center', gap: 9,
                    }}>
                    <MaterialCommunityIcons name="shopping" color="white" size={100} />
                    <Text style={{ fontSize: 38, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Detail Pembelian</Text>
                    <View style={{
                      backgroundColor: 'white',
                      borderRadius: 8,
                      // padding: 20,
                      // width: 1,
                      margin: 5,
                      paddingVertical: 30,
                      paddingHorizontal: 40,
                      shadowColor: 'black',
                      // flexWrap: 'wrap',
                      gap: 9,
                      elevation: 2,
                    }}>
                      <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: 100 }}>
                        <Text style={{ fontSize: 25, color: '#c1c2c4' }}>Nomor: </Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{nomor}</Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: 100 }}>
                        <Text style={{ fontSize: 25, color: '#c1c2c4' }}>Pulsa: </Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{selectedCategory.nama}</Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: 100 }}>
                        <Text style={{ fontSize: 25, color: '#c1c2c4' }}>Harga: </Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{selectedCategory.harga}</Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: 100 }}>
                        <Text style={{ fontSize: 25, color: '#c1c2c4' }}>Rating: </Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{selectedCategory.rating}</Text>
                      </View>
                      {/* <Text>{selectedCategory.nama}</Text>
                      <Text>Harga: {selectedCategory.harga}</Text>
                      <Text>Rating: {selectedCategory.rating}</Text> */}
                    </View>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.closeButton}>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          {/* paket data */}
          <Modal visible={modalVisible1} animationType="slide">
            <View style={styles.modalContainer}>
              <View>
                {selectedCategory1 && (
                  <View
                    style={{
                      alignItems: 'center', gap: 9,
                    }}>
                    <MaterialCommunityIcons name="shopping" color="white" size={100} />
                    <Text style={{ fontSize: 38, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Detail Pembelian</Text>
                    <View style={{
                      backgroundColor: 'white',
                      borderRadius: 8,
                      margin: 5,
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                      shadowColor: 'black',
                      gap: 9,
                      elevation: 2,
                    }}>
                      <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: 50 }}>
                        <Text style={{ fontSize: 20, color: '#c1c2c4' }}>Nama Paket: </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedCategory1.namaPaket}</Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: 100 }}>
                        <Text style={{ fontSize: 20, color: '#c1c2c4' }}>Isi Paket: </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedCategory1.isiPaket}</Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: 100 }}>
                        <Text style={{ fontSize: 20, color: '#c1c2c4' }}>Harga: </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedCategory1.hargaPaket}</Text>
                      </View>
                      {/* <Text>{selectedCategory.nama}</Text>
                      <Text>Harga: {selectedCategory.harga}</Text>
                      <Text>Rating: {selectedCategory.rating}</Text> */}
                    </View>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={toggleModal1}>
                <Text style={styles.closeButton}>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>)
};

const HistoryScreen = () => (
  <View style={styles.tentangKami}>
    <Image
      source={require('./assets/tentangg.png')}
      style={{
        width: 145,
        height: 151,
      }}
    />
    <View style={{ alignItems: 'center', paddingHorizontal: 80 }}>
      <Text style={{
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold'
      }}>Tentang kami</Text>
      <Text style={{
        textAlign: 'center',
      }}>Kami siap membantu kapan pun dan dimana pun.
        Silakan hubungi kami kapan pun melalui.</Text>
    </View>
    <View style={styles.isiKuota}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 9 }}>
        <MaterialCommunityIcons name="instagram" color="black" size={30} />
        <Text style={{
          fontSize: 20,

        }}>ikan_lele</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 9 }}>
        <MaterialCommunityIcons name="whatsapp" color="black" size={30} />
        <Text style={{
          fontSize: 20,

        }}>083482347</Text>
      </View>
    </View>
  </View>
);

const ReservasiScreen = () => {

  return (
    <View style={styles.tentangKami}>
      <Image
        source={require('./assets/profil.png')}
        style={{
          width: 191,
          height: 188,
        }}
      />
      <View style={{ alignItems: 'center', paddingHorizontal: 50 }}>
        <Text style={{
          textAlign: 'center',
          fontSize: 35,
          fontWeight: 'bold'
        }}>Profil Developer</Text>
        <Text style={{
          textAlign: 'center',
        }}>Kami dari kelompok ... membuat aplikasi guna untuk mengikuti UAS, kami membuat aplikasi ini dengan bahasa javascript dan React native sebagai Frameworknya.</Text>
      </View>
      <View style={{
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,

        margin: 5,
        // marginHorizontal: 10,
        shadowColor: 'black',
        // flexWrap: 'wrap',
        gap: 9,
        elevation: 2,
      }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 9 }}>
          <MaterialCommunityIcons name="face-man-profile" color="black" size={30} />
          <Text style={{
            fontSize: 20,
          }}>Bangun Ragil D 210103050</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 9 }}>
          <MaterialCommunityIcons name="face-man-profile" color="black" size={30} />
          <Text style={{
            fontSize: 20,
          }}>Fauzan Hasyim M 210103054</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 9 }}>
          <MaterialCommunityIcons name="face-man-profile" color="black" size={30} />
          <Text style={{
            fontSize: 20,
          }}>Muhammad Reza A 210103067</Text>
        </View>
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const Dashboard = () => (
  <Tab.Navigator screenOptions={{
    headerShown: true, // Show the header
    headerStyle: {
      backgroundColor: '#1193f3', // Set the header background color
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    headerTintColor: 'white', // Set the color of header text and icon
    headerRight: () => (
      // <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Profile')}>
      <TouchableOpacity style={styles.iconContainer} >
        <View style={styles.barprofile}>
          {/* <MaterialCommunityIcons name="account-circle" color="white" size={30} /> */}
          <Image
            style={{ width: 30, height: 30, borderRadius: 100 }}
            source={require('./assets/profile.jpg')}
          />
          <Text style={{ color: "white" }}>IKan lele</Text>
        </View>
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity style={styles.iconContainer} >

        <MaterialCommunityIcons name="menu" color="white" size={30} />

      </TouchableOpacity>
    ),
  }}>
    <Tab.Screen
      name="Home"
      component={BerandaScreen}
      options={{
        // tabBarLabel: '',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="Tentang Kami"
      component={HistoryScreen}
      options={{
        tabBarLabel: 'Tentang kami',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="face-man-profile" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="Profil Pembuat"
      component={ReservasiScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        )
      }}
    />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none" >
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
  isiKonten: {
    // backgroundColor: '#350035',
    borderRadius: 8,
    padding: 25,
    // margin: 15,
    // marginBottom: 5
  },
  judulKonten: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
  },
  barakun: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10

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
  iconContainer: {
    paddingHorizontal: 15,
  },
  barprofile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  SearchInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

  },
  cardKuota: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "center"
  },
  cardKategoriKuota: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  cardKategori: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "center"
  },
  isiKuota: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    paddingRight: 100,
    margin: 5,
    // marginHorizontal: 10,
    shadowColor: 'black',
    // flexWrap: 'wrap',
    gap: 9,
    elevation: 2,
  },
  cardIsi: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    paddingRight: 100,
    margin: 5,
    shadowColor: 'black',
    flexWrap: 'wrap',
    gap: 9,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardHarga: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#d85410"
  },
  openButton: {
    fontSize: 18,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1193f3',
    padding: 20,
  },
  // modalContainer1: {
  //   backgroundColor: 'white',
  //   borderRadius: 8,
  //   padding: 90,
  //   margin: 5,
  //   shadowColor: 'black',
  //   gap: 9,
  //   elevation: 2,
  // },

  closeButton: {
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: 'white',
    fontSize: 18,
    color: '#1193f3'
  },
  inputNomor: {
    flex: 1,
    margin: 15,
    marginVertical: 5,
    // marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: 'black',
    elevation: 2,
    width: '100%'
  },
  judulsub: {
    marginVertical: 10,
    marginHorizontal: 15,
    fontSize: 25,
    fontWeight: "bold"
  },
  tentangKami: {
    gap: 20,
    height: '100%',
    paddingTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
