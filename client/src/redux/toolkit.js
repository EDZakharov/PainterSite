import {createSlice} from '@reduxjs/toolkit'

const adminPanel = createSlice({
    name: 'adminPanel',
    initialState: {
        accessToken: false,
        auth: false,
        isLogoutStatus: false,
        biography: '',
        contacts:{},
        news: []

    },
    reducers: {
        setCurrentPath: (state, action) => {
            localStorage.setItem('currentEditImagePath', JSON.stringify(action.payload))
        },
        setLocalToken: (state,action) => {
            const token = action.payload
            if(token) {
                localStorage.setItem('accessToken', action.payload)
                state.accessToken = action.payload
                state.auth = true
            } else {
                localStorage.removeItem('accessToken')
                state.auth = false
            }
        },
        resetLocalToken: (state,action) => {
            const token = action.payload
            state.auth = false
            if(token) {
                localStorage.setItem('accessToken', action.payload)
                state.accessToken = action.payload
                state.auth = true
            } else {
                localStorage.removeItem('accessToken')
                state.auth = false
            }
        },
        logout: (state) => {
            localStorage.removeItem('accessToken')
            state.accessToken = false
            state.auth = false
            state.isLogoutStatus = true
        },
        setBiography: (state,action) => {
            state.biography = action.payload
        },
        setContacts: (state,action) => {
            state.contacts = action.payload
        },
        setNews: (state,action) => {
            state.news = action.payload
        }
    }
})

export default adminPanel

export const {setNews,setContacts,setBiography,setCurrentPath,setLocalToken,resetLocalToken,logout} = adminPanel.actions
