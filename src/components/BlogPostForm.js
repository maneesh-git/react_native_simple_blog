import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const BlogPostForm = ({ onSubmit, initialValues }) => {

    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View>
            <Text style={styles.label} >Enter Title : </Text>
            <TextInput value={title} 
                style={styles.input} 
                onChangeText={ (text) => setTitle(text) } 
            />
            <Text style={styles.label}>Enter Content : </Text>
            <TextInput value={content} 
                style={styles.input} 
                onChangeText={ (text) => setContent(text) } 
            />
            <Button 
                title="Save Blog Post"
                onPress={() => onSubmit(title,content)}
            />
        </View>
    );
}

BlogPostForm.defaultProps = {
    initialValues : {
        title : '',
        content : ''
    }
};

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

export default BlogPostForm;


/*


DefaultProps is used to give the components some default props if the component is not called with any props at all
so if its a reusable component, it doesnt affect the behaviour if some component has no props to send to it.

default props is totally automatic,
react automatically checks in this case is the BLogPostForm has any props called initialValues
and if it doesn't contain this prop,
react will set it to the default props mentioned.

BlogPostForm.defaultProps = {
    initialValues : {
        title : '',
        content : ''
    }
};


*/