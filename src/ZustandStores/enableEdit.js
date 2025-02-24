import { create } from 'zustand'
export const useEnableEdit = create((set) => ({
    buttonStates: {
        profile: {editMode:false},
        store:{editMode:false}
    },
    setEnableEditMode: (buttonType) => set((state) => ({
        buttonStates: {
            ...state.buttonStates,
            [buttonType]: {
                ...state.buttonStates[buttonType],
                editMode:true
            },
        },
        disableEditMode: (buttonType) => set(() => ({
            buttonStates:{
                ...state.buttonStates,
                [buttonType]: {
                    ...state.buttonStates[buttonType],
                    editMode:false
                }
            }
        }))
    }))
}))