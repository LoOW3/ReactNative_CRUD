import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f6f2fc',
      },
      containerDark: {
        flex: 1,
        backgroundColor: '#000'
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 16,
        color: 'white'
      },
      buttonText: {
        fontSize: 18,
        color: '#0fa5e9',
        marginTop: 10
      },
      showProducts:{
        position: 'absolute',
        zIndex: 60,
        bottom: 10,
        width: '45%',
        height: 40,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 100,
        backgroundColor: '#fff',
        borderRadius: 100,
      },
      showProductsDark:{
        position: 'absolute',
        zIndex: 60,
        bottom: 10,
        width: '45%',
        height: 40,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#595959',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 100,
        backgroundColor: '#000',
        borderRadius: 100,
      }
   
});

export { styles }