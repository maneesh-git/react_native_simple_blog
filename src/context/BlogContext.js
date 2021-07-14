import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {

    switch(action.type) {
        case 'get_blogposts' : 
            return action.payload;
        case 'add_blogpost' :
            return [
                ...state,
                {
                    id : Math.floor( Math.random() * 99999 ), 
                    title: action.payload.title,
                    content : action.payload.content
                } 
            ];
        
        case 'delete_blogpost' : 
            return state.filter((blogPost) => blogPost.id !== action.payload );

        case 'edit_blogpost' :
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            })
        default : return state;    
    }
};

const getBlogPosts = (dispatch) => {
    return async() => {
        const response = await jsonServer.get('/blogposts');

        dispatch({ type : 'get_blogposts' , payload : response.data });
    }
}

const addBlogPost = (dispatch) => {    
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', { title, content})
        // dispatch({ type : 'add_blogpost', payload : { title, content } })
        if(callback) {
            callback();
        }
    };    
};

const deleteBlogPost = (dispatch) => {
    return async(id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        
        dispatch({ type : 'delete_blogpost', payload : id });
    }
}

const editBlogPost = (dispatch) => {
    return async(id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content } );

        dispatch({ type : 'edit_blogpost', payload : { id, title, content } })
        if(callback) {
            callback();
        }
    }
}

export const { Context, Provider } = createDataContext(
    blogReducer,
    { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost },
    []
);

/* 

    We create a context object.
    we show the context_object_thing.Provider 
    and then we give it a value prop
    that has whatever information that we want to share.
    That is it on the top level

    const App = () => {
        return <CustomComponent>
            <Text>Hi there!</Text>
        </CustomComponent>
    };

    Just imagine the above code
    When we use the kind of syntax shown above
    The app component essentially renders the CustomComponent, no issue there.

    But the surprising thing here is that 
    the since the Text element is wrapped inside of a custom component
    its is going to passed as a prop from App down into custom component
    as a prop called children 

    So we use this technique above to allow ourselves
    to make custom components just like this and 
    accept some other component more or less as an argument
    
    So its going to show up inside of custom component as a prop called children.


    Thus check inside of App.js,
    we are passing the App as a child component of <BlogProvider>

    so we can imagine the children inside of BLogContext is actually the <App /> component.


    When we create a Context on=bject using React.createContext,
    we also get inside that object something called the Provider.

    Provider accepts some information, like source of information and
    whatever information we provide it and its going to make it available
    to all of our child components. 
    It does so using the prop value.





    BlogProvider using useState (Previous Version)

    const [ blogPosts, setBlogPosts ] = useState([]);
    
    const addBlogPost = () => {
        setBlogPosts([ ...blogPosts, { title : `Blog Post #${blogPosts.length + 1}` } ])
    }

    return <BlogContext.Provider value={{ data : blogPosts , addBlogPost : addBlogPost }} >
        {children}
    </BlogContext.Provider>


    BlogContext and BlogProvider using the normal useReducer and basic functions to handle the data.

        import React, { useReducer } from 'react';

        const BlogContext = React.createContext();

        const blogReducer = (state, action) => {

            switch(action.type) {
                case 'add_blogpost' :
                    return [...state, { title: `Blog Post #${state.length + 1}`} ];
                
                
                default : return state;
            
            }

        };

        export const BlogProvider = ({ children }) => {

            const [ blogPosts, dispatch ] = useReducer(blogReducer, []);

            const addBlogPost = () => {
                dispatch({ type : 'add_blogpost' })
            };
            
            return (
                <BlogContext.Provider value={{ data : blogPosts, addBlogPost }} >
                    {children}
                </BlogContext.Provider>
            );

        };

        export default BlogContext;


*/