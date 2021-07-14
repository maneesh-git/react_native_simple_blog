import React from 'react';
import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider } from './src/context/BlogContext';
import IndexScreen from './src/screens/IndexScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

const navigator = createStackNavigator({
    Index : IndexScreen,
    Show : ShowScreen,
    Create : CreateScreen,
    Edit : EditScreen
},{
    initialRouteName : 'Index',
    defaultNavigationOptions : {
      title: "Blogs",
    }
});

const App = createAppContainer(navigator);


export default () => {
    return (
        <Provider>
            <App />    
        </Provider>
    );
}

/* 
    Wrapping the whole of the stack navigator within a  provider of sorts

    instead of exporting the createAppContainer with navigator,
    we assign the result of it to a variable
    and export default our own custom component.

    App.js file requires us to return a component by default.

    Context system is used to send or move information 
    from a parent component to some nested child

    

*/