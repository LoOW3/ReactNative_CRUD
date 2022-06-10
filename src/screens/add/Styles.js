import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        marginTop: 0,
        flex: 1,
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        width: '95%',
        borderRadius: 6,
        height: '95%',
        backgroundColor: 'white'
      },
      containerDark: {
        marginTop: 10,
        flex: 1,
        borderRadius: 8,
        alignItems: 'center',
        width: '95%',
        height: '95%',
        backgroundColor: '#000'
      },
      title: {
          marginTop: 5,
          fontSize: 32,
          fontWeight: '300',
      },
      titleDark: {
        marginTop: 5,
        fontSize: 32,
        fontWeight: '300',
        color: '#e1e1e1'
    },
      inputContainer: {
          width: '90%',
          padding: 13,
          marginVertical: 6,
          borderBottomWidth: 1,
          borderColor: '#e1e1e1',
          borderRadius: 6,
      },
      inputContainerDark: {
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderBottomWidth: 1,
        borderColor: '#555',
        color: '#e1e1e1'
    },
      emoji: {
          width: 250,
          height: 250,
          borderRadius: 6,
          padding: 10,
          marginTop: 20,
  
      },
      button: {
          marginTop: 10,
          backgroundColor: '#0fa5e9',
          paddingVertical: 8,
          width: '90%',
          marginVertical: 6,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 20
  
      },
      buttonText: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff'
      },
      buttonTextCamera:{
        color: '#0fa5e9',
        marginBottom: 20,
        marginTop: 5
      },
      picker:{
        height: 30,
        width: '90%',
        padding: 13,
        marginVertical: 6,
        color: '#666',
        fontSize: 20,
      }
  
   
});

export { styles }