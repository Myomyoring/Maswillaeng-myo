import React, { createContext, useContext } from 'react';

const authContext = createContext();

function ProvideAuth() {
    
}

function useAuth() {
    return useContext();
}

export default { ProvideAuth, useAuth };