import React, { useReducer } from 'react';

export default ( reducer, actions, initialState ) => {

    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        // actions === { addBlogPost: (dispatch) => { return() => {} } }

        const boundActions = {};
        for(let key in actions){
            boundActions[key] = actions[key](dispatch);
        }

        return <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
    }

    return { Context, Provider };
};

/*
    To understand this concept of creating context automatically 
    check the tutorial 12 : lessons 13 and 14

*/