import { Pressable, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import Icons from 'react-native-vector-icons/MaterialIcons'

const ControlCenter = () => {

    const playBackState = usePlaybackState()
    

//next
    const skipTonext = async() => {
        await TrackPlayer.skipToNext()
    }
    //previous
    const skipToPrevious = async() => {
        await TrackPlayer.skipToPrevious()
    }

    const togglePlayback = async (playback: State) => {
        const currentTrack = await TrackPlayer.getCurrentTrack()


if (currentTrack !== null) {
    if (playback.state === "ready" || playback.state === "paused") {
        await TrackPlayer.play()

    } else {
        await TrackPlayer.pause()
    }
        }

    }
  return (
    <View style={styles.container}>
        <Pressable onPress={skipToPrevious}>
            <Icons style={styles.icon} name ="skip-previous" size={40}/>
        </Pressable>
        <Pressable onPress={ () => togglePlayback(playBackState)}>

            <Icons style={styles.icon}
             name ={playBackState.state === "playing" ? "pause" :"play-arrow"} 
            size={40}/>
        </Pressable>
        <Pressable onPress={skipTonext}>
            <Icons style={styles.icon} name ="skip-next" size={40}/>
        </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
    
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        color: '#FFFFFF',
      },
      playButton: {
        marginHorizontal: 24,
      },
})

export default ControlCenter