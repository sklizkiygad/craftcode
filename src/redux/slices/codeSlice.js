import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    htmlData: '',
    cssData: '',
    jsData: '',
    treeData:[],
    tabsData:[]
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

        setTreeData: (state, action) => {
            state.treeData=action.payload
        },
        setTabsData: (state, action) => {
            if(!current(state.tabsData).includes(action.payload)){
                state.tabsData=[...state.tabsData,action.payload]
            }
        },

    },


})


export const { setHtmlData, setCssData, setJsData,setTreeData , setTabsData} = codeSlice.actions

export default codeSlice.reducer

export const htmlDataSelector=(state)=>state.code.htmlData
export const cssDataSelector=(state)=>state.code.cssData
export const jsDataSelector=(state)=>state.code.jsData
export const treeDataSelector=(state)=>state.code.treeData
export const tabsDataSelector=(state)=>state.code.tabsData
