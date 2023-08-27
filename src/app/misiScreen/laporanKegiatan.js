import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import Pdf from 'react-native-pdf'
import HeaderRed from '../../components/header/headerRed';
import ImageServices from '../../services/getImage';
import Utils from '../../utils/Utils';

const LaporanView = ({navigation, route}) => {
    const {namaFile, filepath} = route.params;
    const [isLoadingFile, setIsLoadingFile] = useState(false);
    const [dataFile, setDataFile] = useState("");

    const getDataFile = () =>{
        setIsLoadingFile(true);
        ImageServices.getImage("misi", namaFile)
        .then(res=>{
            setDataFile(res.data.data);
            setIsLoadingFile(false);
        })
        .catch(err=>{
            console.log(err.response);
            setIsLoadingFile(false);
        })
    }

    const getDataFileFromFilepath = async() =>{
        setIsLoadingFile(true);
        let fileBase64 = await Utils.readFileBase64(filepath);
        console.log(fileBase64);
        setDataFile(`data:application/pdf;base64,${fileBase64}`);
        setIsLoadingFile(false);
    }

    useEffect(()=>{
        if(namaFile != ""){
            getDataFile();
        }else{
            getDataFileFromFilepath();
        }
    },[])

  return (
    <View style={{height: '100%', justifyContent: 'center'}}>
        <HeaderRed title="Laporan Kegiatan" navigation={navigation} />
        <Pdf
        source={{uri: dataFile}} 
        style={{
            flex:1,
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height,
        }}
        />
    </View>
  )
}

export default LaporanView

const styles = StyleSheet.create({})