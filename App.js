

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, Pressable, PermissionsAndroid } from 'react-native';
import logoUnivalle from './assets/univalle1.png';
import * as ImagePicker from 'expo-image-picker';
import { launchCamera } from 'react-native-image-picker';


export default function App() {

  const [ImageSelected, setImageSelected] = useState(null);
  const [cameraPhoto,setCameraPhoto]=useState(null);
  let options ={
    saveToPhotos: true,
    mediaType: 'foto',

  };


  let abrirArchivosAsync = async () => {
    let ResultadoPermiso =  await ImagePicker.requestMediaLibraryPermissionsAsync();

    //Ya no es necsario pedir permiso
    if (ResultadoPermiso.granted === false){
      alert("Si no me das permiso, no puedo funcionar");
      return;
    }

    if (ResultadoPermiso.granted === true){
      
      const ResultadoSeleccion = await ImagePicker.launchImageLibraryAsync();
      
      if (ResultadoSeleccion.canceled == true){
        return;
      }
      else{
        setImageSelected({
          direccion: ResultadoSeleccion.assets[0].uri,
        })
      }
      
    }
  }

  const openCameraAsync = async() => {

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if(granted === PermissionsAndroid.RESULTS.GRANTED){
      const result= await ImagePicker.launchCameraAsync(options);
      setCameraPhoto(result.assets[0].uri);
    }
    await launchCamera.launchCameraAsync(ImageSelected.direccion);
  };


  return (
    <View style={styles.container}>

      <StatusBar style="auto"/>
      
      <Image
        source={cameraPhoto == null ? require("./assets/login.png"):
         {uri:cameraPhoto}}
        style={styles.logo}
      />

     
      <Text style={styles.titulo}>
        Hola Univalle
      </Text>

      <Text style={styles.subtitulo}>
        Bienvenidos desde La Paz
      </Text>

      
      <Pressable style={styles.boton2}
          onPress={openCameraAsync}>
            <Text style={styles.textoBoton}>
              Open Camera
            </Text>
          </Pressable>
    

        <Image
        source={{uri: ImageSelected !== null ?
           ImageSelected.direccion : 'https://udols.wordpress.com/wp-content/uploads/2010/12/fondos-paisajes-1024.jpg',}}
        style={styles.logo2}
        />
       
          <Pressable 
        style={styles.boton2}
        onPress={abrirArchivosAsync}
          >
        <Text style={styles.textoBoton}>
          Open Gallery
        </Text>
      </Pressable>
      <Text style={styles.subtitulo}>
        Los saluda Olga Delia Mamani Condorena...!!!
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {

    fontSize: 50,
    color: "black",
  
  },
  subtitulo: {
    fontFamily: 'Lucida Calligraphy',
    fontSize: 15,
    alignSelf: 'center',    

  },
  logo:{
    height: 200,
    width: 200,
    borderRadius: 100,
    
    borderWidth:1,
    borderColor:"grey",

    resizeMode: 'contain',
    
  },
  logo2:{
    height: 200,
    width: 200,
    borderRadius: 10,
    
    borderWidth:1,
    borderColor:"grey",

    resizeMode: 'contain',
  },
  boton2:{
    backgroundColor: "#2510ABFF",
    margin: 20,
    padding: 15,
  },
  textoBoton:{
    fontSize: 20,
    color: "white",
  }
});


