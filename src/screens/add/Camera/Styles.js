import { StyleSheet } from 'react-native';

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

export { styles }