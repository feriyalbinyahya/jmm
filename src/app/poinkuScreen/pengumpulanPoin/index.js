import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhiteNoBorder from '../../../components/header/headerWhiteNoBorder'
import CustomBottomSheet from '../../../components/bottomSheet'
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconSurvei from '../../../assets/images/icon/icon_survei.png';
import IconMisi from '../../../assets/images/icon/icon_misi_penting.png';
import IconKawan from '../../../assets/images/icon/icon_kawan.png';
import IconRiwayat from '../../../assets/images/icon/icon_riwayat.png';
import VoucherServices from '../../../services/voucher'
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../../utils/Utils'
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownButton from '../../../components/buttonDropdown'
import CustomSelect from '../../../components/customSelect'
import CustomButton from '../../../components/customButton'

const RiwayatPengumpulanPoinScreen = ({navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const kategori = "Misi";
    const namaKategori = "PENYELESAIAN MISI";
    const poin = "100";
    const judul = "Survei Kepuasan Kinerja Ganjar Pranowo 2022";
    const tanggal = "Jum, 21 Jul 2023";
    const [dataRiwayat, setDataRiwayat] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [dariTanggal, setDariTanggal] = useState('');
    const [sampaiTanggal, setSampaiTanggal] = useState('');
    const [kategoriPilihan, setKategoriPilihan] = useState('');


    const handleTerapkanFilter = (fromdate, todate, kategori) => {
      setDataRiwayat([]);
      setCurrentPage(1);
      setDariTanggal(fromdate);
      setSampaiTanggal(todate);
      setKategoriPilihan(kategori);
      setModalVisible(false);
    }

    const handleResetFilter = () => {
      setDariTanggal('');
      setSampaiTanggal('');
      setKategoriPilihan('');
      setModalVisible(false);
    }

    const FilterPengumpulanPoin = ({dariTanggal, sampaiTanggal, kategoriPilihan}) => {
      const [fromDate, setFromDate] = useState(dariTanggal);
      const [toDate, setToDate] = useState(sampaiTanggal);
      const [isCalendarFromVisible, setIsCalendarFromVisible] = useState(false);
      const [isCalendarToVisible, setIsCalendarToVisible] = useState(false);
      const [kategoriSelect, setKategoriSelect] = useState(kategoriPilihan);

      const dataKategori = [
        {
          id_kategori: "ajak kawan",
          nama_kategori: "Ajak Kawan"
        },
        {
          id_kategori: "penyelesaian misi",
          nama_kategori: "Penyelesaian Misi"
        },
        {
          id_kategori: "survei",
          nama_kategori: "Survei"
        },
      ];

      const handleDateChangeFrom = (event, data) => {
        setIsCalendarFromVisible(!isCalendarFromVisible);
        const currentDate = new Date(data);
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth()+1;
        let date = currentDate.getDate();
        if(month < 10){
          month = `0${currentDate.getMonth()+1}`;
        }

        if (date < 10){
          date = `0${currentDate.getDate()}`
        }
        console.log(`${year}/${month}/${date}`);
        setFromDate(`${year}-${month}-${date}`);
      }

      const handleDateChangeTo = (event, data) => {
        setIsCalendarToVisible(!isCalendarToVisible);
        const currentDate = new Date(data);
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth()+1;
        let date = currentDate.getDate();
        if(month < 10){
          month = `0${currentDate.getMonth()+1}`;
        }

        if (date < 10){
          date = `0${currentDate.getDate()}`
        }
        console.log(`${year}/${month}/${date}`);
        setToDate(`${year}-${month}-${date}`);
      }

      handleDateFromButton = () => {
        setIsCalendarFromVisible(!isCalendarFromVisible);
      }
      handleDateToButton = () => {
        setIsCalendarToVisible(!isCalendarToVisible);
      }
        return(
            <View style={{padding: 10}}>
              <Text style={{...FontConfig.titleFour, color: Color.neutralColorGrayEight}}>Kategori Poin</Text>
              <View style={{height: 5}}></View>
              <CustomSelect value={kategoriSelect} search={false} setValue={setKategoriSelect} data={dataKategori}
              title="Kategori" labelField="nama_kategori" valueField="id_kategori" />
              <View style={{height: 10}}></View>
              <Text style={{...FontConfig.titleFour, color: Color.neutralColorGrayEight}}>Periode Pengumpulan</Text>
              <View style={{height: 5}}></View>
              <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, marginVertical: 5}}>Dari tanggal</Text>
              <DropDownButton placeholder='yyyy-mm-dd' text={fromDate.toString()} onPress={handleDateFromButton} />
              {isCalendarFromVisible? <DateTimePicker maximumDate={new Date(2020, 10, 20)} 
            display="calendar" onChange={handleDateChangeFrom} value={new Date(2000, 10, 20)}
             /> : <></>}
             <View style={{height: 5}}></View>
             <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, marginVertical: 5}}>Sampai tanggal</Text>
              <DropDownButton placeholder='yyyy-mm-dd' text={toDate.toString()} onPress={handleDateToButton} />
              {isCalendarToVisible? <DateTimePicker maximumDate={new Date(2020, 10, 20)} 
            display="calendar" onChange={handleDateChangeTo} value={new Date(2000, 10, 20)}
             /> : <></>}
             <View style={{height: 10}}></View>

           <View style={{flexDirection: 'row', alignItems: 'center', 
           justifyContent: 'space-between', paddingTop: 20}}>
            <CustomButton text="Reset" onPress={()=>{
              handleResetFilter();
            }} fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralTen}}
            backgroundColor={Color.neutralZeroOne} borderWidth={1} borderColor={Color.neutralZeroFive}
            height={40} width='48%' />
            <CustomButton text="Terapkan" onPress={()=>{
              handleTerapkanFilter(fromDate, toDate, kategoriSelect);
              setModalVisible(false);
            }} fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}}
            backgroundColor={Color.primaryMain} borderWidth={1} borderColor={Color.neutralZeroFive}
            height={40} width='48%' />
           </View>
          </View>
        )
    }

    const loadMoreItem = () => {
        if(currentPage < parseInt(totalPages)){
          setCurrentPage(currentPage + 1);
        }
      }
    
      const renderLoader = () => {
        return(
          <View style={styles.loaderStyle}>
              <ActivityIndicator size="large" color={Color.graySix} />
          </View>
        );
      }
    
      const getRiwayatPengumpulanDataOnRefresh = (page) => {
        setIsLoading(true);
        VoucherServices.getAllRiwayatPengumpulan(page)
        .then(res=>{
          setDataRiwayat(res.data.data);
          setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response);
        })
      }
    
      const onRefresh =  () => {
        setRefreshing(true);
        setCurrentPage(1);
        setDataRiwayat([]);
        getRiwayatPengumpulanDataOnRefresh(1);
        setRefreshing(false);
      }

    const getDataRiwayatPengumpulan = (page, dariTanggal, sampaiTanggal, kategoriPilihan) =>{
      if(dataRiwayat.length ==0 ) setIsLoading(true);
        VoucherServices.getAllRiwayatPengumpulan(page, dariTanggal, sampaiTanggal, kategoriPilihan)
        .then(res=>{
            console.log(res.data.data);
            setDataRiwayat(res.data.data.data);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    useEffect(()=>{
      getDataRiwayatPengumpulan(currentPage, dariTanggal, sampaiTanggal, kategoriPilihan);
    },[currentPage])

    useEffect(()=>{
      getDataRiwayatPengumpulan(currentPage, dariTanggal, sampaiTanggal, kategoriPilihan);
    },[dariTanggal, sampaiTanggal, kategoriPilihan])

    const PengumpulanPoinItem = ({ namaKategori, judul, tanggal, poin}) => {
      const [convertedDate, setConvertedDate] = useState("");

      useEffect(()=>{
        const deviceTimeZone = RNLocalize.getTimeZone();

        // Make moment of right now, using the device timezone
        const today = moment().tz(deviceTimeZone);

        // Get the UTC offset in hours
        const currentTimeZoneOffsetInHours = today.utcOffset() / 60;
        const convertedToLocalTime = formatTimeByOffset(
            tanggal,
            currentTimeZoneOffsetInHours,
          );
        setConvertedDate(convertedToLocalTime);
      },[])
        return(
            <View style={{flexDirection: 'row', backgroundColor: Color.neutralZeroTwo,
            borderRadius: 8, paddingHorizontal: 10, paddingVertical: 16, marginVertical: 5}}>
                <Image style={{width: 40, height: 40}} source={namaKategori == "Penyelesaian Misi" ? IconMisi : namaKategori == "Survei" ? IconSurvei : IconKawan} />
                <View style={{width: 5}}></View>
                <View style={{width: '85%'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{...FontConfig.captionUpperOne, color: kategori == "Misi" ? Color.purple : 
                    kategori == "Survei" ? Color.blue : Color.pink}}>{namaKategori}</Text>
                        <Text style={{...FontConfig.titleFive, color: Color.warning}}>{`${`+`} ${poin} Poin`}</Text>
                    </View>
                    <Text style={{...FontConfig.titleFour, color: Color.neutralTen, marginVertical: 3}}>{judul}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="calendar-outline" size={18} color={Color.neutralZeroSeven} />
                        <View style={{width: 3}}></View>
                        <Text style={{...FontConfig.captionTwo, marginTop: 2, color: Color.neutralTen}}>{convertedDate}</Text>
                    </View>
                </View>
            </View>
        )
    }
    const titleLock = "Kamu belum memiliki riwayat";
    const descLock = "Yuk Sat Set ajak kawanmu, selesaikan misi, dan isi survei agar dapat poin";
  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <CustomBottomSheet children={<FilterPengumpulanPoin dariTanggal={dariTanggal} sampaiTanggal={sampaiTanggal}
      kategoriPilihan={kategoriPilihan} />} 
      isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
      title="Filter" />
      <HeaderWhiteNoBorder navigation={navigation} title={`Pengumpulan Poin`} />
      <View style={{padding: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{...FontConfig.titleThree, color: Color.title}}>Riwayat Pengumpulan Poin</Text>
            <Pressable onPress={()=>setModalVisible(true)} 
            style={{...styles.buttonFilter, backgroundColor:  Color.neutralZeroOne}}>
                <Text style={{...FontConfig.bodyThree, color: Color.neutralTen}}>Filter</Text>
                <View style={{width: 3}}></View>
                <Ionicons name="filter" color={Color.neutralTen} size={14} />
            </Pressable>
        </View>
      </View>
      <View style={{paddingHorizontal: 20}}>
        {!isLoading ? dataRiwayat!= 0 ? 
        <FlatList
        data={dataRiwayat}
        ListFooterComponent={currentPage.toString() != totalPages ? renderLoader : <></>}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        style={{height: '78%'}}
        renderItem={({item})=>{
          return <PengumpulanPoinItem judul={item.judul} namaKategori={item.kategori} poin={item.jumlah_poin} tanggal={item.waktu} />
        }}
         />
         :
        <View style={{alignItems: 'center', marginVertical: 20}}>
            <Image style={{width: 40, height: 40}} source={IconRiwayat} />
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.buttonOne, color: Color.neutralZeroSeven, textAlign: 'center'}}>{titleLock}</Text>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, textAlign: 'center',
        width: '90%'}}>{descLock}</Text>
        </View>
        : 
        <View style={{height: '100%', backgroundColor: Color.neutralZeroOne}}>
        <ActivityIndicator style={{marginTop: '50%'}} size="large" color={Color.primaryMain} />
        </View>
        } 
      </View>
    </View>
  )
}

export default RiwayatPengumpulanPoinScreen

const styles = StyleSheet.create({
    buttonFilter: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 32,
        borderColor: Color.neutralZeroSix,
        paddingHorizontal: 10,
        paddingVertical: 5
      },
})