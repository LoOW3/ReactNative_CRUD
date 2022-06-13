import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingVertical: 10,
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#e1e1e1',
        backgroundColor: 'white'
    },
    infoUserDark:{
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#e1e1e1',
        backgroundColor: 'black'
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
    titleDark:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#e1e1e1'
    },
    titleEdit:{
        fontSize: 30,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: '#999'
    },
    titleEditDark:{
        fontSize: 30,
        color: '#e1e1e1',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: '#999'
    },
    caption: {
        fontSize: 18,
        marginVertical: 10,
    },
    captionDark: {
        fontSize: 18,
        marginVertical: 10,
        color: '#e1e1e1'
    },
    edit:{
        color: '#0fa5e9',
        marginBottom: 10
    },
    basket: {
        width: '100%',
        height: '100%',
    },
    basketDark: {
        width: '100%',
        height: '100%'
    },
   
});

export { styles }