import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { Component, useState } from 'react'

import TrackPlayer,{Event,Track,useTrackPlayerEvents }from 'react-native-track-player'
import { playListData } from '../constants'
import SongInfo from '../components/songInfo'
import SongSlider from '../components/songSlider'
import ControlCenter from '../components/controlCenter'

const {width} = Dimensions.get('window')

const MusicPlayer = () => {
    const [track, setTrack] = useState<Track | null>()

    useTrackPlayerEvents([Event.PlaybackTrackChanged] , 
       async event => {
            switch (event.type) {
                case Event.PlaybackTrackChanged:
                    const playingTrack = await TrackPlayer.getTrack
                    (event.nextTrack)
                    setTrack(playingTrack)
                    break;
            
                default:
                    break;
            }
    }) 

    const renderArtWork =() => {
        return(
            <View style={styles.listArtWrapper}>
                <View style={styles.albumContainer}>
                {track?.artwork && (
                    <Image style={styles.albumArtImg}
                    source={{uri: track?.artwork?.toString()}} />
                )}
                </View>
            </View>
        )
    }
  return (
    <View style={styles.container}>
        <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtWork} 
        keyExtractor={song => song.id.toString()}
        />
        <SongInfo track={track} />
        <SongSlider />
        <ControlCenter/>
    </View>
  )
}

export default MusicPlayer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001d23',
      },
      listArtWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
      },
      albumContainer: {
        width: 300,
        height: 300,
      },
      albumArtImg: {
        height: '100%',
        borderRadius: 4,
      },
})