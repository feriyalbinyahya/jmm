import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../customButton';
import { useSelector } from 'react-redux';
import LaporanServices from '../../services/laporan';
import RegistrationService from '../../services/registration';
import CustomSelect from '../customSelect';

const FilterSimpatisan = ({ data_provinsi, data_kota, onPressFilter, onPressResetFilter}) => {
    const [provinsi, setProvinsi] = useState(data_provinsi);
    const [kota, setKota] = useState(data_kota);
    const [dataProvinsi, setDataProvinsi] = useState([]);
    const [dataKabkot, setDataKabkot] = useState([]);

    const getDataProvinsi = () => {
        RegistrationService.getAllProvinsi()
        .then(res=> {
          setDataProvinsi(res.data.data);
        })
        .catch(err=> {
          console.log(err);
        })
      }
  
    const getDataKota = (properti) => {
        RegistrationService.getAllKota(properti)
        .then(res=> {
            setDataKabkot(res.data.data);
        })
        .catch(err=> {
            console.log(err);
        })
    }
    
    useEffect(()=>{
        getDataProvinsi();
    },[])

    useEffect(()=>{
        if(provinsi != '' && provinsi != 0){
          getDataKota(parseInt(provinsi));
        }
      }, [provinsi])
  return (
    <View>
        <CustomSelect value={provinsi} setValue={setProvinsi} data={dataProvinsi}
        title="Provinsi" labelField="nama_provinsi" valueField="id_provinsi" />
        <View style={{height: 10}}></View>
        {provinsi != "" ? 
        <CustomSelect value={kota} setValue={setKota} data={dataKabkot}
        title="Kota/Kabupaten" labelField="nama_kabkot" valueField="id_kabkot" /> : <></>
        }
        <View style={{height:15}}></View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <CustomButton onPress={onPressResetFilter} text="Reset" backgroundColor={Color.neutralZeroOne} fontStyles={styles.textReset}
            borderColor={Color.primaryMain} height={44} width='40%' borderWidth={1} />
            <CustomButton onPress={() => onPressFilter(provinsi, kota)} text="Terapkan" backgroundColor={Color.primaryMain} fontStyles={styles.textTerapkan}
            height={44} width='40%'/>
        </View>
    </View>
  )
}

export default FilterSimpatisan

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    checkboxOff: {
        borderWidth: 1,
        borderColor: Color.secondaryText,
        width: 16,
        height: 16,
        backgroundColor: Color.neutralZeroOne,
        marginHorizontal: 3
    },
    textTag: {
        ...FontConfig.titleFour,
        color: '#000000'
    },
    textKategori: {
        ...FontConfig.bodyTwo,
        color: '#000000'
    },
    textTerapkan: {
        ...FontConfig.buttonOne,
        color: Color.neutralZeroOne
    },
    textReset: {
        ...FontConfig.buttonOne,
        color: Color.primaryMain
    },
    unSelected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55
    },
    selected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55
    },
    title: {
        ...FontConfig.bodyTwo,
        color: '#000000'
    },
    textPilih : {
        ...FontConfig.buttonOne, 
        color: 'white'},
})