import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { Color, FontConfig } from '../../theme'
import SearchBar from '../searchBar';

const ListPilihan = ({title, data, handleSelected, onSelect, search, setSearch, filteredData}) => {
    const Item = ({text}) => (
        <Pressable onPress={()=> {handleSelected(text);}}>
            <View style={text === onSelect? styles.selected : styles.unSelected}>
                <Text style={styles.title}>{text}</Text>
                {text=== onSelect? <Ionicons name="radio-button-on" color={Color.primaryMain} size={22} /> 
                : <Ionicons name="radio-button-off" color={Color.secondaryText} size={22} />}
            </View>
        </Pressable>
    );
  return (
    <>
        {(()=> {
            switch(title){
                case 'Pekerjaan':
                    return (<View style={{height: '80%'}}>
                    <SearchBar text={title} search={search} setSearch={setSearch} />
                    <FlatList
                    data={data}
                    renderItem={({item}) => <Item text={item.nama_pekerjaan}/>}
                    keyExtractor={item => item.id_pekerjaan}
                    /></View>)
                case 'Provinsi':
                    return (<View style={{height: '80%'}}>
                    <SearchBar text={title} search={search} setSearch={setSearch} />
                    <FlatList
                    data={data}
                    renderItem={({item}) => <Item text={item.nama_pekerjaan}/>}
                    keyExtractor={item => item.id_pekerjaan}
                    /></View>)
                default:
                    return null
            }
        })()
        }
    </>
  )
}

export default ListPilihan

const styles = StyleSheet.create({
    unSelected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Color.neutralZeroThree
    },
    title: {
        color: Color.title,
        ...FontConfig.bodyOne
    },
})