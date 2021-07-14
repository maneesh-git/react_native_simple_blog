import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({ navigation }) => {

    
    const { addBlogPost } = useContext(Context);

    return (
        <BlogPostForm 
            onSubmit={(title, content) => {
                addBlogPost(title, content , () => navigation.navigate('Index'))
            }}        
        />
    )

}

const styles = StyleSheet.create({
    input : {
        fontSize : 18,
        borderColor : 'black',
        borderWidth : 1,
        marginBottom : 15,
        padding : 5,
        margin : 15
    },
    label : {
        fontSize : 20,
        marginBottom : 10,
        marginLeft : 15
    }

});

export default CreateScreen;