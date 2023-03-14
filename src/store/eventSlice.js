import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  editMode: { isEdit: false, row: {} }
}

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvents: (state, action) => ({ ...state, events: [...state.events, action.payload] }),
    removeEvent: (state, action) => ({
      ...state,
      events: [...state.events.filter((item => item.eventName !== action.payload))]
    }),
    editFormEnable: (state, action) => ({
      ...state,
      editMode: { isEdit: action.payload.isEdit, row: action.payload.row }
    }),
    updateEvent: (state, action) => ({
      ...state,
      events: [...state.events.map(item => {
        const { currentForm, updatedForm } = action.payload
        if (item.eventName === currentForm.eventName) {
          return {
            eventName: updatedForm.eventName,
            eventDate: updatedForm.eventDate,
            eventDesc: updatedForm.eventDesc,
            price: updatedForm.price,
            bookingType: updatedForm.bookingType,
            acceptTerms: updatedForm.acceptTerms,
          }
        } else {
          return item
        }
      })]
    })
  },
})

export const { addEvents, removeEvent, editFormEnable, updateEvent } = eventSlice.actions;

export default eventSlice.reducer;