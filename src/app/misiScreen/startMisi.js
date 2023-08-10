import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderRed from '../../components/header/headerRed'
import IconTime from '../../assets/images/icon/icon_time.png';
import IconDeadline from '../../assets/images/icon/icon_deadline.png';
import IconSatu from '../../assets/images/icon/icon_satu.png';
import IconDua from '../../assets/images/icon/icon_dua.png';
import IconTiga from '../../assets/images/icon/icon_tiga.png';
import CustomButton from '../../components/customButton';

const StartMisiScreen = ({navigation}) => {
    const is_important = true;
    const judul = "Buat Konten Dengan Tema dilarang Golput";
    const deskripsi = "Buatlah konten digital berformat vidio dengan tema dilarang golput/golput bukan solusi";
    const startDate= "Jum, 1 Juli 2023  14:00:00";
    const deadlineDate = "Jum, 21 Juli 2023  23:00:00";

    const CommandItem = ({image, title, content, subtitle}) => {
        return (
            <View style={{flexDirection: 'row', padding: 10, borderWidth: 1, 
            borderColor: Color.neutralZeroFour, borderRadius: 8, marginVertical: 10}} >
                <Image style={{width: 30, height: 30}} source={image} />
                <View style={{width: 15}}></View>
                <View style={{width: '80%'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.textCommandTitle}>{title}</Text>
                        {subtitle ? <Text style={{...FontConfig.buttonThree, color: Color.neutralZeroSeven,
                        marginHorizontal: 5}}>{subtitle}</Text> : <></>}
                    </View>
                    <Text style={styles.textCommandContent}>{content}</Text>
                </View>
            </View>
        )
    }

    const handleLanjutkan = () => {
      navigation.navigate("FormMisi");
    }
  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderRed navigation={navigation} title="Misi" />
      <View style={{padding: 20}}>
        <Text style={is_important ? styles.textMisiSangatPenting : styles.textMisi}>{is_important ?
         `MISI SANGAT PENTING` : `MISI`}</Text>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.titleOne, color: Color.neutralTen}}>{judul}</Text>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, width: '90%', color: Color.neutralZeroSeven}}>{deskripsi}</Text>
        <View style={{height: 10}}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 16, height: 16}} source={IconTime} />
            <View style={{width: 4}}></View>
            <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>{`Misi dibuat : `}</Text>
            <Text style={{...FontConfig.buttonThree, color: Color.neutralZeroSeven}}>{startDate}</Text>
        </View>
        <View style={{height: 5}}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 16, height: 16}} source={IconDeadline} />
            <View style={{width: 4}}></View>
            <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>{`Batas waktu : `}</Text>
            <Text style={{...FontConfig.buttonThree, color: Color.danger}}>{deadlineDate}</Text>
        </View>
        <View style={{height: 10}}></View>

        {/** Konsep kegiatan */}
        <CommandItem image={IconSatu} content={`Konsep dapat dijelaskan dalam kolom deskripsi dan (jika ada) lampirkan pada dokumen`}
        title="Siapkan Konsep Kegiatan" />
        <CommandItem image={IconDua} content={`Bukti dapat berupa foto atau video`}
        title="Lampirkan Bukti Kegiatan" />
        <CommandItem image={IconTiga} content={`Masukan perkiraan partisipan dan tandai keikutsertaan kawan yang telah kamu daftar`}
        title="Partisipan" subtitle={`(Opsional)`} />
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.buttonContinue}>
          <CustomButton
              onPress={handleLanjutkan} 
              fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
              width='100%' height={44} text="Mulai Misi"
              backgroundColor={Color.primaryMain}
              />
        </View>
      </View>
    </View>
  )
}

export default StartMisiScreen

const styles = StyleSheet.create({
    textMisiSangatPenting: {
        color: Color.magenta,
        ...FontConfig.captionUpperTwo
    },
    textCommandTitle: {
        ...FontConfig.titleThree,
        color: Color.neutralTen
    },
    textCommandContent: {
        ...FontConfig.bodyTwo,
        color: Color.neutralZeroSeven
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
})