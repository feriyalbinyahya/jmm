import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageExample from '../../assets/images/example/exampleProfile.png'
import { Color, FontConfig } from '../../theme'
import { height } from '../../assets/constants'
import ImageServices from '../../services/getImage'

const ReplyKomenView = ({dataBalasan}) => {

    const ReplyItem = ({item}) =>{

        const [dataImage, setDataImage] = useState("");
        const [imageLoading, setImageLoading] = useState(false);
        const getDataImage = () =>{
            setImageLoading(true);
            ImageServices.getImage("relawan", item.foto_profil)
            .then(res=>{
              setDataImage(res.data.data);
              setImageLoading(false);
            })
            .catch(err=>{
              console.log(err);
            })
        }

        useEffect(()=>{
            getDataImage();
        },[])
        return(
            <View style={styles.komentarContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={styles.fotoProfile} source={{uri: `data:image/png;base64, ${dataImage}`}} />
                    <Text style={styles.textUsername}>{item.username}</Text> 
                </View>
                <View style={{height: 8}}></View>
                <Text style={styles.textKomen}>{item.reply}</Text>
                <View style={{height: 5}}></View>
            </View>
        )
    }
  return (
    <View>
      <FlatList
            data={dataBalasan} 
            renderItem={({item}) => <ReplyItem item={item} />}
            style={styles.flatlistStyle}
            
        />
    </View>
  )
}

export default ReplyKomenView

const styles = StyleSheet.create({
    fotoProfile: {
        width: 32,
        height: 32,
        borderRadius: 16
    },
    textUsername: {
        ...FontConfig.titleThree,
        color:Color.title,
        marginHorizontal: 10
    },
    komentarContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    textKomen: {
        ...FontConfig.bodyThree,
        color: Color.title
    },
})