import { StyleSheet, Text, View, Pressable, TextInput, FlatList} from 'react-native'
import React, {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Color } from '../../theme';
import SearchBar from '../searchBar';

const CustomMultipleSelect = ({data, value, placeholder}) => {
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState("");

    const toggleDropdown = () => {
        setVisible(!visible);
      };

      const renderDropdown = () => {
        if (visible) {
          return (
              <View style={styles.dropdown}>
                <TextInput placeholder='Cari' value={search} onChangeText={setSearch} 
                style={{borderColor: Color.neutralZeroThree, borderWidth: 1, paddingHorizontal: 10}}  />
                <View style={{height: 10}}></View>
                <FlatList />
              </View>
          );
        }
      };
  return (
    <Pressable
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>{placeholder}</Text>
      <Ionicons size={18} name='chevron-down'/>
    </Pressable>
  )
}

export default CustomMultipleSelect

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        height: 50,
        width: '90%',
        paddingHorizontal: 10,
        zIndex: 1,
      },
      buttonText: {
        flex: 1,
        textAlign: 'center',
      },
      dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: 50,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Color.neutralZeroThree,
        heigth: 100,
        width: '100%',
        padding: 10
      },
})