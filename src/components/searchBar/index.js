import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import CustomInput from '../../components/customInput'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color } from '../../theme';

const SearchBar = ({text, search, setSearch, width='100%', deleted=false}) => {
  return (
    <View style={{...styles.boxSearchBar, width: width}}>
        <View style={styles.searchBar}>
            <CustomInput value={search} borderRadius={36} setValue={setSearch} placeholder={`Cari `+text} childLeft={<Ionicons color={Color.secondaryText} 
            style={{padding:10}} name="search" size={22} />}
            children={<Pressable onPress={()=>setSearch("")}><Ionicons color={Color.secondaryText} 
            style={{padding:10}} name="close-circle" size={22} /></Pressable>}
             />
        </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    boxSearchBar: {
        padding: 20,
        borderColor: Color.lightBorder,
    },
    searchBar: {
    },
})