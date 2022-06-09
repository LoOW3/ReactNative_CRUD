import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    supremeContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '100%'
    },
    supremeContainerDark:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        height: '100%'
    },
    container: {
        marginTop: 20,
        width: '90%',
        borderRadius: 6,
    },
    title:{
        
        fontSize: 50,
        marginBottom: 50,
        marginTop: 30,
    },
    titleDark:{
        fontSize: 50,
        marginBottom: 50,
        marginTop: 30,
        color: '#e1e1e1'
    },
    title2:{
        fontSize: 35,
        marginBottom: 50,
        marginTop: 30,
    },
    title2Dark:{
        fontSize: 35,
        marginBottom: 50,
        marginTop: 30,
        color: '#e1e1e1'
    },

    createAccount:{
        color: '#0fa5e9'
    },
    textInput:{
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 6,
    },
    textInputDark:{
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderBottomWidth: 1,
        borderColor: '#555',
        color: '#e1e1e1'
    },
    button: {
        marginTop: 10,
        backgroundColor: '#0fa5e9',
        paddingVertical: 8,
        width: '90%',
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
        
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    downText:{
    },
    downTextDark: {
        color: '#e1e1e1'
    },
    errorText:{
        width: '85%',
        color: 'red'
    },
  
   
});

export { styles }