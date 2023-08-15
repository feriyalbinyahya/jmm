import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhite from '../../../components/header/headerWhite'
import Swiper from 'react-native-swiper'
import LaporanImage from '../../../assets/images/example/laporan.png'
import LaporanServices from '../../../services/laporan'
import { useSelector } from 'react-redux'


const DetailLaporanScreen = ({navigation, route}) => {
    const {id} = route.params;
    const [dataDetail, setDataDetail] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [media, setMedia] = useState([]);
    const [kawan, setKawan] = useState([]);
    const [status, setStatus] = useState("Diterima");
    const imageList = [LaporanImage, LaporanImage];
    const judul = "Ganjar di Gercep Bareng Kreator";
    const deskripsi = "Pak Ganjar menghadiri acara Gercep Bareng Kreator sebagai special guest yang diadakan di Bogor. "
    const capres = "Ganjar Pranowo";
    const tag = "Seminar";
    const perkiraan_partisipan = "250";
    const lokasi = "Jl. Surya Kencana 7, no 10, Kec.Serpong, Kota Tanggerang Selatan, Banten 15310, Indonesia. -001.260176, 36.738851";
    const tanggal = "02 Januari 2023, 10:20:24 WIB";

    const is_tag_kawan = useSelector((state)=>{
        return state.laporan.jenisLaporan.is_tag_kawan;
      });
    
      const is_estimasi_partisipan = useSelector((state)=>{
        return state.laporan.jenisLaporan.is_estimasi_partisipan_required;
      });

    const getLaporanDetail = () => {
        setIsLoading(true);
        LaporanServices.getDetail(id)
        .then(res=>{
            console.log(res.data.data);
            setDataDetail(res.data.data[0]);
            setMedia(res.data.data[0].media);
            setKawan(res.data.data[0].kawan);
            setStatus(res.data.data[0].status);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response.message);
        })
    }

    useEffect(()=>{
        getLaporanDetail();
    },[])
    return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhite navigation={navigation} title="" />
      {!isLoading ? <><Swiper activeDotColor={Color.purple} style={{height: '100%'}}>
        {media.map((item, index)=>{
            return (
                <View key={index} style={{paddingHorizontal: '20%'}}><Image style={styles.imageLaporan} source={{uri: `data:image/png;base64,${item}`}} /></View>
            )
        })}
      </Swiper>
      <ScrollView style={{paddingHorizontal: 20, height: '33%'}}>
        <View style={{height: 20}}></View>
        <Text style={{...FontConfig.titleThree, color:Color.primaryMain}}>Detail Laporan</Text>
        <View style={status == "Diterima" ? styles.boxSuccess : status == "Ditolak" ? styles.boxDitolak : styles.boxMenunggu}>
            <Text style={status == "Diterima" ? styles.textSuccess : status == "Ditolak" ? styles.textDitolak : styles.textMenunggu}>{status}</Text>
        </View>
        <Text style={styles.textSubject}>Judul Laporan</Text>
        <Text style={styles.textContent}>{dataDetail.judul}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Deskripsi</Text>
        <Text style={styles.textContent}>{dataDetail.deskripsi}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Capres</Text>
        <Text style={styles.textContent}>{dataDetail.capres}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Tag</Text>
        <Text style={styles.textContent}>{dataDetail.tag}</Text>
        <View style={{height: 10}}></View>
        {is_tag_kawan ? <><Text style={styles.textSubject}>Kawan</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>{kawan.map((item, index)=> {
            if(index == kawan.length-1){
                return(
                    <Text key={index} style={styles.textContent}>{item.nama}</Text>
                )
            }else{
            return(
                <Text key={index} style={styles.textContent}>{`${item.nama}, `}</Text>
            )}
        })}</View>
        <View style={{height: 10}}></View></> : <></>}
        {is_estimasi_partisipan ? <><Text style={styles.textSubject}>Perkiraan Partisipan</Text>
        <Text style={styles.textContent}>{dataDetail.perkiraan_partisipan}</Text>
        <View style={{height: 10}}></View></> : <></>}
        <Text style={styles.textSubject}>Lokasi</Text>
        <Text style={styles.textContent}>{dataDetail.alamat}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Tanggal dibuat</Text>
        <Text style={styles.textContent}>{dataDetail.waktu_dibuat}</Text>
        <View style={{height: 30}}></View>
      </ScrollView></> : 
      <View style={{height: '60%', justifyContent: 'center'}}><ActivityIndicator size="large" color={Color.grayEight} /></View>
      }
    </View>
  )
}

export default DetailLaporanScreen

const styles = StyleSheet.create({
    textSuccess: {
        color: Color.successMain,
        ...FontConfig.bodyThree
    },
    textDitolak: {
        color: Color.danger,
        ...FontConfig.bodyThree
    },
    textMenunggu: {
        color: Color.warning,
        ...FontConfig.bodyThree
    },
    boxSuccess: {paddingVertical: 8, marginVertical: 10, paddingHorizontal: 20,  borderWidth: 1, borderColor: Color.successMain, 
        alignSelf: 'baseline', borderRadius: 24, backgroundColor: '#F0FFF3'},
    boxDitolak: {paddingVertical: 8, marginVertical: 10, paddingHorizontal: 20,  borderWidth: 1, borderColor: Color.danger, 
        alignSelf: 'baseline', borderRadius: 24, backgroundColor: Color.redOne},
    boxMenunggu: {paddingVertical: 8, marginVertical: 10, paddingHorizontal: 20,  borderWidth: 1, borderColor: Color.warning, 
        alignSelf: 'baseline', borderRadius: 24, backgroundColor: Color.warningSurface},
    textSubject: {
        ...FontConfig.bodyTwo,
        color:Color.neutralZeroSeven
    },
    textContent: {
        color: Color.primaryMain,
        ...FontConfig.bodyTwo,
        marginVertical: 3,
        textAlign: 'justify'
    },
    imageLaporan: {
        height: '100%',
        width: '100%'
    }
})