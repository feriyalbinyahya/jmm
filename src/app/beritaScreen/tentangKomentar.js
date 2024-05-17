import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontConfig } from '../../theme'
import CustomButton from '../../components/customButton';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BeritaServices from '../../services/berita';

const TentangKomentar = ({item, setMode, mode, setLaporan, setBlokir, setModalVisible, dataAlasan, setReportSent, id}) => {

    const [onSelect, setOnSelect] = useState('');
    const [idSelect, setIdSelect] = useState('');

    const DATA = [
        {
          id: '1',
          jenis: 'Spam',
        },
        {
          id: '2',
          jenis: 'Komentar Mengandung SARA',
        },
        {
            id: '3',
            jenis: 'Bullying atau Pelecehan',
        },
        {
            id: '4',
            jenis: 'Informasi Bohong',
        },
      ];

      handleSelected = (item, id) => {
        setOnSelect(item);
        setIdSelect(id);
      }

      const kirimLaporan = () => {
        console.log(idSelect);
        BeritaServices.reportKomentar({"alasan": parseInt(idSelect)}, id)
        .then(res=>{
          console.log(res.data);
          if(res.data.message == "Sukses melaporkan komentar ini."){
            setReportSent(true);
          }
        })
        .catch(err=>{
          console.log(err.response);
        })
      }

      handlePilih = () => {
        if(onSelect != ''){
            kirimLaporan();
            setModalVisible(false);
        }
      }

      handleBlokir = () => {
        setModalVisible(false);
        setBlokir(true);
      }

      const Item = ({text, id}) => (
        <Pressable onPress={()=> {handleSelected(text, id);}}>
            <View style={text === onSelect? styles.selected : styles.unSelected}>
                <Text style={styles.title}>{text}</Text>
                {text=== onSelect? <Ionicons name="radio-button-on" color={Color.primaryMain} size={22} /> 
                : <Ionicons name="radio-button-off" color={Color.secondaryText} size={22} />}
            </View>
        </Pressable>
      );

    const handleLapor = () => {
        setMode("lapor");

    }
  return (
    <View >
        {mode == "" ?<View style={{padding: 10}}>
      <Pressable onPress={handleLapor}>
        <Text style={{color: Color.neutralColorGrayNine, ...FontConfig.buttonZeroOne}}>Laporkan Komentar</Text>
      </Pressable>
      <View style={{height: 15}}></View>
      <Pressable onPress={handleBlokir}>
        <Text style={{color: Color.primaryMain, ...FontConfig.buttonZeroOne}}>{`Blokir ${item.username}`}</Text>
      </Pressable>
      </View>
        : mode == "lapor" ?
        <View>
            <Text style={{...FontConfig.buttonThree, color: Color.primaryText, marginHorizontal: 10, marginVertical: 7}}>{`Komentar : ${item.username}`}</Text>
            <Text style={{...FontConfig.bodyTwo, color: Color.primaryText, marginHorizontal: 10}}>{item.komen}</Text>
            <View style={{height: 10}}></View>
            <FlatList
                data={dataAlasan}
                renderItem={({item}) => <Item text={item.nama} id={item.id}/>}
                keyExtractor={item => item.id}
            />
            <CustomButton onPress={handlePilih} disabled={!onSelect} height={44} text='Kirim Laporan' backgroundColor={Color.primaryMain} fontStyles={styles.textPilih} />
        </View>
        :
        <>
        </>
        }
    </View>
  )
}

export default TentangKomentar

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
        backgroundColor: Color.redOne
    },
    title: {
        ...FontConfig.titleThree,
        color: Color.title
    },
    textPilih : {
        ...FontConfig.buttonOne, 
        color: 'white'},
})