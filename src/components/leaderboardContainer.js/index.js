import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme'
import IconGold from '../../assets/images/icon/icon_gold.png'
import IconSilver from '../../assets/images/icon/icon_silver.png'
import IconBronze from '../../assets/images/icon/icon_bronze.png'
import ImageProfile from '../../assets//images/example/Bonar.png'
import { useSelector } from 'react-redux'
import ImageServices from '../../services/getImage'
import Skeleton from '../skeleton'

const LeaderboardContainer = ({data, myRank}) => {
  const nama = useSelector((state)=>{
    return state.credential.fullname;
  })
  const foto = useSelector((state)=>{
    return state.credential.fotoProfil;
  })
  const BoxMedal = ({nama, medal, rank, image, poin, boxStyles, textRankStyles, textPoinStyles}) => {
    const [dataImage, setDataImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

      const getDataImage = () =>{
        setIsLoading(true);
        ImageServices.getImage("relawan", image)
        .then(res=>{
          setDataImage(res.data.data);
          setIsLoading(false);
        })
        .catch(err=>{
          console.log(err);
        })
      }

      useEffect(()=>{
        getDataImage();
      }, [])
    return(
      <View style={{alignItems: 'center', width:'35%'}}>
          <Image source={medal} style={{width: 32,height: 32}} />
          <View style={{height: 10}}></View>
          {!isLoading ?<Image source={{uri: `data:image/png;base64,${dataImage}`}}
           style={{width: 72,height: 72, borderRadius: 40}} /> : 
           <Skeleton width={72} height={72} style={{borderRadius: 40}} />
           }
          <View style={{height: 10}}></View>
          <Text style={{ ...FontConfig.captionThree,color: '#000000'}}>{nama}</Text>
          <View style={{height: 10}}></View>
          <View style={boxStyles}>
              <Text style={textRankStyles}>{rank}</Text>
              <View style={{height: 5}}></View>
              <Text style={textPoinStyles}>{poin}</Text>
          </View>
      </View>
    );
  }

  useEffect(()=>{
  },[])

  const BoxRank = ({image, nama, rank, boxStyles, boxPoinStyles, poin, other=true}) => {
    const [dataImage, setDataImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

      const getDataImage = () =>{
        setIsLoading(true);
        ImageServices.getImage("relawan", image)
        .then(res=>{
          setDataImage(res.data.data);
          setIsLoading(false);
        })
        .catch(err=>{
          console.log(err);
        })
      }

      useEffect(()=>{
        getDataImage();
      }, [])
    return(
    <View style={boxStyles}>
      <Text style={{...FontConfig.buttonZeroTwo, color: other ? Color.title : Color.neutralZeroOne}}>
        {rank}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '70%'}}>
        {!isLoading?<Image source={{uri: `data:image/png;base64,${dataImage}`}} style={styles.imageRank} /> : <Skeleton width={32} height={32} style={{borderRadius: 15}} />
           }
        <Text style={{...FontConfig.buttonOne, color: other? Color.title : Color.neutralZeroOne, marginHorizontal: 8}}>
        {nama}</Text></View>
      <View style={boxPoinStyles}>
        <Text style={{...FontConfig.buttonThree, color: '#000000'}}>
          {poin}</Text>
      </View>
    </View>
    )
  }
  return (
    <>{data.length != 0 ? <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <View style={styles.standings}>
        {data.length > 1 ? <BoxMedal nama={data[1].nama_lengkap} medal={IconSilver} 
        rank="2nd" image={data[1].foto_profil} poin={data[1].total} boxStyles={styles.boxSilver}
        textPoinStyles={{...FontConfig.titleTwo, color: Color.primaryMain}}
        textRankStyles={{...FontConfig.buttonOne, color: '#000000'}} /> : <></>}
        {data.length > 0 ? <BoxMedal nama={data[0].nama_lengkap} medal={IconGold} 
        rank="1st" image={data[0].foto_profil} poin={data[0].total} boxStyles={styles.boxGold}
        textPoinStyles={{...FontConfig.titleTwo, color: Color.neutralZeroOne}}
        textRankStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}} /> : <></>}
        {data.length > 2 ? <BoxMedal nama={data[2].nama_lengkap} medal={IconBronze} 
        rank="3rd" image={data[2].foto_profil} poin={data[2].total} boxStyles={styles.boxBronze}
        textPoinStyles={{...FontConfig.titleTwo, color: Color.primaryMain}}
        textRankStyles={{...FontConfig.buttonOne, color: '#000000'}} /> : <></>}
      </View>
      <ScrollView style={styles.otherStandings}>
        {
          data.slice(3,data.length).map((item, index) => {
            return(
              <BoxRank key={index} image={item.foto_profil} nama={item.nama_lengkap} rank={item.rank} 
              boxStyles={styles.boxOtherRank} boxPoinStyles={styles.boxPoinOtherRank} 
              poin={item.total} />
            );
          })
        }
      </ScrollView>
      <View style={styles.boxMyRank}>
        <Text style={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}}>
          {myRank.self_rank_laporan}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', width: '70%'}}>
          <Image source={{uri: `data:image/png;base64,${foto}`}} style={styles.imageRank} />
          <Text style={{...FontConfig.buttonOne, color:  Color.neutralZeroOne, marginHorizontal: 8}}>
          {nama}</Text></View>
        <View style={styles.boxPoinMyRank}>
          <Text style={{...FontConfig.buttonThree, color: '#000000'}}>
            {myRank.total_poin}</Text>
        </View>
      </View>
    </View> : <View></View>}</>
  )
}

export default LeaderboardContainer

const styles = StyleSheet.create({
    standings: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        height: '54%',
        paddingTop: 20,
        paddingHorizontal: 20
        
    },
    otherStandings: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: Color.neutralZeroOne,
      elevation: 10,
      shadowOpacity: 1,
      shadowOffset: {width: 2, height: 4},
      shadowRadius: 3,
      shadowColor: 'black',
      height: '100%'
    },
    boxSilver: {
        backgroundColor: Color.neutralZeroThree,
        height: '35%',
        width: '80%',
        alignItems: 'center',
        padding: 20
    },
    boxGold: {
      backgroundColor: Color.purple,
      height: '43%',
      alignItems: 'center',
      width: '80%',
      padding: 20
    },
    boxBronze: {
      backgroundColor: Color.neutralZeroThree,
      height: '27%',
      alignItems: 'center',
      width: '80%',
      padding: 20
    },
    boxMyRank: {
      backgroundColor: Color.primaryMain,
      paddingVertical: 15,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    boxOtherRank: {
      backgroundColor: Color.neutralZeroOne,
      paddingVertical: 15,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    boxPoinOtherRank: {
      padding: 10,
      backgroundColor: Color.neutralZeroOne,
      borderWidth: 1,
      borderColor: Color.primaryMain,
      borderRadius: 4,
      width: 56,
      alignItems: 'center'
    },
    imageRank: {
      width: 32,
      height: 32,
      borderRadius: 15
    },
    boxPoinMyRank: {
      padding: 10,
      backgroundColor: Color.neutralZeroOne,
      borderRadius: 4,
      width: 56,
      alignItems: 'center'
    },
})