import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {

    // const id = navigation.getParam('id'); How to recieve props in navigation.
    const { state } = useContext(Context);

    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'))
    
    return (
        <View>            
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    );
}

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight : (
            <TouchableOpacity 
                onPress={() => navigation.navigate('Edit', { id : navigation.getParam('id')} )}
            >
                <Feather name="edit-3" size={35} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

});

export default ShowScreen;


/*
    Getting content from Context.
    get the state and the desired function from the context using useContext hook.
    Use the state according to your needs.


    
*/