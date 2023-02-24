import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    htmlData: '',
    cssData: '',
    jsData: '',
}

export const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        setHtmlData: (state, action) => {
         state.htmlData=action.payload
        },
        setCssData: (state, action) => {
            state.cssData=action.payload
        },
        setJsData: (state, action) => {
            state.jsData=action.payload
        },
    },

})


export const { setHtmlData, setCssData, setJsData } = codeSlice.actions

export default codeSlice.reducer

export const htmlDataSelector=(state)=>state.code.htmlData
export const cssDataSelector=(state)=>state.code.cssData
export const jsDataSelector=(state)=>state.code.jsData
