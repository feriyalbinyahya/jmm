import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Shadow } from 'react-native-shadow-2';
import { Color, FontConfig } from '../../theme';
import CustomButton from '../customButton';
import { Box, AspectRatio, Center, Stack, HStack, Heading } from 'native-base';

const CardSurvei = ({navigation, image, judul, id}) => {
    const handleIsiSurvei = () => {
        navigation.navigate("StartSurvei", {id: id});
    }
  return (
    <Box alignItems="center">
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{uri: `data:image/png;base64,${image}`}} alt="image" />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3} style={{backgroundColor: Color.neutralZeroOne}}>
          <Stack space={2}>
            <Text style={{...FontConfig.titleThree, color: '#000000'}}>{judul}</Text>
          </Stack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <CustomButton onPress={handleIsiSurvei} text="Isi Survei" height={32} backgroundColor={Color.primaryMain}
              fontStyles={{...FontConfig.buttonThree, color: Color.neutralZeroOne}}
              borderRadius={32} />
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  )
}

export default CardSurvei

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 8
    },
    image:{
        width: '100%',
        height: 100,
        aspectRatio: 2/1,
        borderRadius: 4,
        overflow: 'hidden'
    },
    textTopik: {
        ...FontConfig.titleSeven,
        color: '#000000',
        marginTop: 20,
    },
})