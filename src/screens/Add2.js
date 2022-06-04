import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function Add2() {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [source, setSource] = useState('')

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source1 = data.base64;
      await cameraRef.current.pausePreview();
      setIsPreview(true);
      setSource(source1)
    }
  };
  const acceptPhoto = async() =>{
    if (source) {
      let base64Img = `data:image/jpg;base64,${source}`;
      let apiUrl =
        'https://api.cloudinary.com/v1_1/ignaciodiaz12/image/upload';
      let data = {
        file: base64Img,
        upload_preset: 'reactnativecrud'
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        .then(async response => {
          let data = await response.json();
          if (data.secure_url) {
            console.log(data.secure_url)
            alert('Upload successful');
          }
        })
        .catch(err => {
          alert('Cannot upload');
        });
    }
  }
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };
  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
  <Camera
    ref={cameraRef}
    style={styles.container}
    type={cameraType}
    onCameraReady={onCameraReady}
  />
  <View style={styles.container}>
  {isPreview && (
    <View>
        <TouchableOpacity
          onPress={cancelPreview}
          style={styles.closeButton}
        >
          <AntDesign name='close' size={32} color='#fff' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={acceptPhoto}
          style={styles.acceptPhoto}
        >
        <Text style={{fontSize: 30, fontWeight:'bold', color: 'white'}}>Aceptar</Text>
      </TouchableOpacity>
    </View>
  )}
    {!isPreview && (
      <View style={styles.bottomButtonsContainer}>
        <View style={styles.switchCamera}>
          <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
            <MaterialIcons name='flip-camera-ios' size={28} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.takePicture}>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isCameraReady}
            onPress={onSnap}
            style={styles.capture}
          />
        </View>
    </View>
    )}
  </View>
</View> )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: '#fff'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 0,
    marginHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0fa5e9',
    opacity: 1
  },
  switchCamera: {
  },
  takePicture: {
    alignItems: 'center'
  },
  acceptPhoto:{
    position: 'absolute',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    top: 550,
    left: 35,
    backgroundColor: '#0fa5e9',
    paddingVertical: 8,
    borderRadius: 8,
  }
});


