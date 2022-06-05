import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getCloudURL } from '../redux/actions';
import { Camera } from 'expo-camera';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function Add2() {
  let dispatch = useDispatch();
  const navigation = useNavigation();
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [source, setSource] = useState('')
  const [loading, setLoading] =useState(false)

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.3, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source1 = data.base64;
      await cameraRef.current.pausePreview();
      setIsPreview(true);
      setSource(source1)
    }
  };
  const acceptPhoto = async() =>{

    if (source) {
      setLoading(true)
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
            dispatch(getCloudURL(data.secure_url))
            setLoading(false)
            navigation.navigate('Add')
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
        style={loading?[styles.camContainer,{ opacity: 0.7 }] :styles.camContainer}
        type={cameraType}
        onCameraReady={onCameraReady}
        
      />
  <View style={styles.container}>
  {isPreview && (
    <View style={styles.bottomButtonsContainer2}>
        {loading?<View><Image style={styles.loading} source={require('../../assets/images/loading-unscreen.gif')}/></View>: <Text style={{height: 0}}>.</Text>}
      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
        <TouchableOpacity
          onPress={acceptPhoto}
          style={styles.checkButton}
        >
          <AntDesign name='check' size={32} color='#fff' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={cancelPreview}
          style={styles.closeButton}
        >
          <AntDesign name='close' size={32} color='#fff' />
        </TouchableOpacity>
      </View>
    </View>
  )}
    {!isPreview && (
      <View style={styles.containerButtons}>
        <View style={styles.switchCamera}>
            <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
              <MaterialIcons name='flip-camera-ios' size={28} color='white' />
            </TouchableOpacity>
          </View>
        <View style={styles.bottomButtonsContainer}>
          <View style={styles.takePicture}>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!isCameraReady}
              onPress={onSnap}
              style={styles.capture}
            />
          </View>
      </View>
    </View>
    )}
  </View>
</View> )
}

const styles = StyleSheet.create({
  allContainer:{},
  container: {
    ...StyleSheet.absoluteFillObject,
    
  },
  camContainer:{
    height: '87%',
    width: '100%'
  },
  text: {
    color: '#fff'
  },
  containerButtons:{
    width: '100%',
    height: '100%'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    width: '100%',
    height: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  bottomButtonsContainer2: {
    position: 'absolute',
    flexDirection: 'column',
    bottom: 0,
    width: '100%',
    height: 99,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#EBC000',
    borderWidth: 3,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 0,
    marginHorizontal: 0,
  },
  closeButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    opacity: 1
  },
  checkButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DD05D',
    opacity: 1
  },
  switchCamera: {
    zIndex: 40,
    marginTop: 695,
    paddingRight: 20,
    alignItems: 'flex-end'
  },
  takePicture: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  acceptPhoto:{
    position: 'absolute',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    left: 35,
    backgroundColor: '#0fa5e9',
    paddingVertical: 8,
    borderRadius: 8,
  },
  loading:{
    position: 'absolute',
    height: 100,
    width: 300,
    right: -150,
    bottom: 300
  },
});


