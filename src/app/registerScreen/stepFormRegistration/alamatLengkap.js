import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderRegistration from '../../../components/headerRegistration'
import { Color, FontConfig } from '../../../theme'
import DropDownButton from '../../../components/buttonDropdown'
import CustomTextArea from '../../../components/customTextArea'
import { useDispatch, useSelector } from 'react-redux'
import { setAlamatLengkapRegistration } from '../../../redux/registration'
import Snackbar from 'react-native-snackbar'
import CustomButton from '../../../components/customButton'

const AlamatLengkapScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [idProvinsi, setIdProvinsi] = useState('');
    const [kota, setKota] = useState('');
    const [idKota, setIdKota] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [idKecamatan, setIdKecamatan] = useState('');
    const [kelurahan, setKelurahan] = useState('');
    const [idKelurahan, setIdKelurahan] = useState('');
    const [rt, setRT] = useState('');
    const [rw, setRW] = useState('');
    const [kodePos, setKodePos] = useState('');
    const [isContinue, setIsContinue] = useState(false);

    const [isAddress, setIsAddress] = useState(true);

    const setOldKota = (data, id) => {
      setKota(data);
      setIdKota(id);
    }

    handleKotaButton = () => {
      if(idProvinsi != 0){
        navigation.navigate('DropDown', {title: 'Kota', item: kota, id: idKota, onGoBack: setOldKota,  properti: idProvinsi});
      }else{
        Snackbar.show({
          text: 'Pilih Provinsi terlebih dahulu',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }

    const setOldKecamatan = (data, id) => {
      setKecamatan(data);
      setIdKecamatan(id);
    }

    handleKecamatanButton = () => {
      if(idKota != 0){
        navigation.navigate('DropDown', {title: 'Kecamatan', item: kecamatan, id: idKecamatan, onGoBack: setOldKecamatan, properti: idKota});
      }else{
        Snackbar.show({
          text: 'Pilih Kota / Kabupaten terlebih dahulu',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }

    const setOldKelurahan = (data, id) => {
      setKelurahan(data);
      setIdKelurahan(id);
    }

    handleKelurahanButton = () => {
      if(idKecamatan != 0 ){
        navigation.navigate('DropDown', {title: 'Kelurahan', item: kelurahan, id: idKelurahan, onGoBack: setOldKelurahan, properti: idKecamatan});
      }else{
        Snackbar.show({
          text: 'Pilih Kecamatan terlebih dahulu',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }

    const setOldProvinsi = (data, id) => {
      setProvinsi(data);
      setIdProvinsi(id);
    }

    handleProvinsiButton = () => {
      navigation.navigate('DropDown', {title: 'Provinsi', item: provinsi, id: idProvinsi, onGoBack: setOldProvinsi, properti: ''});
    }

    const saveAlamatLengkapRegistration = () => {
      console.log({address: address, provinsi: idProvinsi, namaProvinsi: provinsi, kota: idKota, 
        kecamatan: idKecamatan, kelurahan: idKelurahan == 0? "" : idKelurahan, rt: rt, rw: rw, kodepos: kodePos});
      dispatch(
        setAlamatLengkapRegistration({address: address, provinsi: idProvinsi, namaProvinsi: provinsi, kota: idKota, 
          kecamatan: idKecamatan, kelurahan: idKelurahan == 0? "" : idKelurahan, rt: rt, rw: rw, kodepos: kodePos})
      );
    }
  
    handleLanjutkan = () => {
      saveAlamatLengkapRegistration();
      navigation.navigate("AmbilSelfieRegister");
    }

    useEffect(()=> {
      setKota('');
      setIdKota(0);
      setKecamatan('');
      setIdKecamatan(0);
      setKelurahan('');
      setIdKelurahan(0);
    }, [provinsi]);

    useEffect(()=> {
      setKecamatan('');
      setIdKecamatan(0);
      setKelurahan('');
      setIdKelurahan(0);
    }, [kota]);

    useEffect(()=> {
      setKelurahan('');
      setIdKelurahan(0);
    }, [kecamatan]);

    handleValidation = () => {
      if(address && provinsi && kota && kecamatan){
        setIsContinue(true);
      }else{
        setIsContinue(false);
      }
    }

    useEffect(()=> {
      handleValidation();
    }, [address, provinsi, kota, kecamatan])

  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderRegistration navigation={navigation} numberStep={2} />
      <ScrollView>
        <View style={styles.topSection}>
            <Text style={styles.textIsiData}>Isi alamat lengkap</Text>
            <Text style={styles.textLengkapi}>Lengkapi alamat lengkap sesuai domisilimu.</Text>
            <View style={styles.boxForm}>
                <Text style={styles.titleFormInput}>Alamat Lengkap</Text>
                <CustomTextArea inputNotWrong={isAddress} value={address} setValue={setAddress}
                 placeholder="Contoh: Jl. Relawan, Gg. 01, No. 10" width='100%' />
                <Text style={styles.titleFormInput}>Provinsi</Text>
                <DropDownButton placeholder='Pilih Provinsi' text={provinsi} onPress={handleProvinsiButton} />
                <Text style={styles.titleFormInput}>Kota / Kabupaten</Text>
                <DropDownButton disabled={idProvinsi != 0 ? false : true} placeholder='Pilih Kota/Kabupaten' text={kota} onPress={handleKotaButton} />
                <Text style={styles.titleFormInput}>Kecamatan</Text>
                <DropDownButton disabled={idKota != 0 ? false : true} placeholder='Pilih Kecamatan' text={kecamatan} onPress={handleKecamatanButton} />
                <Text style={styles.titleFormInput}>{`Desa / Kelurahan (Opsional)`}</Text>
                <DropDownButton disabled={idKecamatan != 0 ? false : true} placeholder='Pilih Desa/Kelurahan' text={kelurahan} onPress={handleKelurahanButton} />
                <View style={styles.rtrw}>
                  <View style={{flex: 2}}>
                    <Text style={styles.titleFormInput}>{`RT (Opsional)`}</Text>
                    <TextInput value={rt} onChangeText={setRT}
                    style={{...styles.phoneInput, borderColor: (rt)? Color.neutralZeroSeven : Color.lightBorder}} 
                    keyboardType='number-pad' placeholder='Masukkan RT' />
                  </View>
                  <View style={{flex: 0.75, alignItems: 'center', marginTop: 30}}><View style={{height: 1, width: '50%', backgroundColor: Color.disable, transform: [{ rotate: '108deg'}]}} /></View>
                  <View style={{flex: 2}}>
                    <Text style={styles.titleFormInput}>{`RW (Opsional)`}</Text>
                    <TextInput value={rw} onChangeText={setRW}
                    style={{...styles.phoneInput, borderColor: (rw)? Color.neutralZeroSeven : Color.lightBorder}} 
                    keyboardType='number-pad' placeholder='Masukkan RW' />
                  </View>
                </View>
                <Text style={styles.titleFormInput}>{`Kode Pos (Opsional)`}</Text>
                <TextInput value={kodePos} onChangeText={setKodePos}
                  style={{...styles.phoneInput, borderColor: (kodePos)? Color.neutralZeroSeven : Color.lightBorder}} 
                  keyboardType='number-pad' placeholder='Masukkan Kode Pos' />
            </View>
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <View style={styles.buttonContinue}>
          <CustomButton
              onPress={handleLanjutkan} 
              fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
              width='100%' height={44} text="Lanjutkan"
              disabled={!isContinue}
              backgroundColor={Color.primaryMain}
              />
        </View>
      </View>
    </View>
  )
}

export default AlamatLengkapScreen

const styles = StyleSheet.create({
    boxForm: {
        marginTop: 10
    },
    bottomSection: {
      backgroundColor: Color.neutralZeroOne,
      height: '12%',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowOpacity: 1,
      shadowOffset: {width: 2, height: 4},
      shadowRadius: 3,
      shadowColor: 'black',
      elevation: 10
    },
    buttonContinue: {
      borderRadius: 20, 
      width: '80%',
    },
    rtrw: {
      flexDirection: 'row',
      alignItems: 'center'

    },
    phoneInput: {
      height: 40,
      width: '100%',
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      ...FontConfig.bodyOne,
      color: Color.primaryText
    },
    topSection: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFFF'
    },
    textIsiData: {
        ...FontConfig.titleOne,
        color: Color.grayThirteen,
    },
    textLengkapi: {
        ...FontConfig.bodyTwo,
        color: Color.graySeven,
        marginTop: 5
    },
    textInputAlamat: {
        ...FontConfig.bodyOne,
        color: Color.primaryText,
    },
    titleFormInput:{
      color: Color.secondaryText,
      ...FontConfig.bodyTwo,
      marginTop: 11,
      marginBottom: 1
    },
})