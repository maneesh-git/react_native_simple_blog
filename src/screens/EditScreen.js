import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';


const EditScreen = ({ navigation }) => {
    // console.log(navigation);    
    const id = navigation.getParam('id');
    const { state, editBlogPost } = useContext(Context);
    const blogPost = state.find( (blogPost) => blogPost.id === id );

    return (
        <BlogPostForm 
            initialValues={{ title : blogPost.title, content : blogPost.content }}
            onSubmit={(title, content) => { 
                editBlogPost(id, title, content, () => navigation.pop());
            } }
        />
    );
}

/* 
Line 18 : navigation.pop  pops the current or the latest element in the stack
which is the current screen 
so in turn react navigates directly to the previous screen.

*/

const styles = StyleSheet.create({});

export default EditScreen;