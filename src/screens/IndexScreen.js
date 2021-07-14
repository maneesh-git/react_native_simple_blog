import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {

    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        })

        return () => {
            listener.remove();
        }
    },[]);

    /* 
        If useEffect has to be run only once when the component shows up on the screen,
        it is given an empty array as the second argument.
        useEffect only gets called once, so the second time we navigate to index screen after creating a new blog,
        the blog list will be updated in DB
        but it will not be rendered on the IndexScreen.

        To call the getBlogPosts again within useEffect method, 
        we need to add a listener inside useEffect method.
        
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        })

        This tells react navigation that anytime this component , here IndexScreen component,
        gains focus or is like the primary screen on the device,
        then the callback function written within will be invoked. 


        Once you add a listener, the listener must be removed manually.
        or else the listerer continues to stay in the code having some memory.
        
        We don't want to have any dangling listeners like we have right here 
        that would lead to a memory leak.
        To cleanup after the lisenter, we can return a function from the useEffect method.
        When you return a function in useEffect,
        that function will be invoked only if the instance of this component, i.e., IndexScreen here,
        will ever completely stop showing on the screen. 

        return () => {
            listener.remove();
        }

    */

    return(
        <View>
            <FlatList
                data={state}
                keyExtractor={ (blogPost) => blogPost.title }
                renderItem={ ({ item })=> {
                    return  (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id : item.id })}>
                            <View style={styles.row} >
                                <Text style={styles.title} >
                                    {item.title} - {item.id}
                                </Text>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
}

IndexScreen.navigationOptions = ({ navigation })  => {
    return {
        headerRight : <TouchableOpacity onPress={() => navigation.navigate('Create') }>
            <Feather name="plus" size={30} />
        </TouchableOpacity>
    };
}

const styles = StyleSheet.create({
    row : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingVertical : 20,
        paddingHorizontal : 10,
        borderTopWidth : 1,
        borderColor : 'gray',
    },
    title : {
        fontSize : 18
    },
    icon : {
        fontSize : 24
    }
});

export default IndexScreen;

/* 
    Getting values from BLogContext :::

    import the useContext
    and the context_object we had created.
    We use useContext in the component where the value is required like follows :
    
    const value = useContext(context_object);
    useContext(BlogContext); // here




    Passing props to another component using navigate
    We can pass in an object as a second parameter to naviagetion.navigate funtion.

    onPress={() => navigation.navigate('Show', { id: item.id} )}

    We can send anything in the scond object.
    Since the api requires only the id of the business we just pass that for now.

    Within the ShowScreen Component we can receive it from navigation.
    first get naigation prop from props.
    Extract the id from it using getParam call like the following.
    We extract id here as that is we arre sending from the ResultsList component.

    const ShowScreen = ({ navigation }) => {}

    const id = navigation.getParam('id');
    



    Navigation on header :

    IndexScreen.navigationOptions = ({ navigation })  => {
    return {
        headerRight : <TouchableOpacity onPress={() => navigation.navigate('Create') }>
            <Feather name="plus" size={30} />
        </TouchableOpacity>
    };
}

*/