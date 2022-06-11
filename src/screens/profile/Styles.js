import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    changeTheme:{
        fontSize: 40
    },
    changeThemeDark:{
        fontSize: 40,
        color: 'white'
    },
    infoUser:{
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#e1e1e1'
    },
    photo: {
        marginLeft: 10
    },
    nameEmail:{
        width: '100%',
        paddingTop: 10,
        paddingLeft: 15,
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    titleEdit:{
        fontSize: 30,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: '#999'
    },
    caption: {
        fontSize: 18,
        marginVertical: 10,
    },
    edit:{
        color: '#0fa5e9',
        marginBottom: 10
    }
   
});

export { styles }