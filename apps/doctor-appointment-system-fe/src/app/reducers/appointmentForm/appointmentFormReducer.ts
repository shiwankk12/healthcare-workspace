import { Dayjs } from 'dayjs';
import { AppointmentFormActionTypes } from './appointmentFormActionTypes';

type State = {
  patientName: string;
  selectedDate: Dayjs | null;
  selectedTime: string;
  description: string;
};

// Define action types for the reducer
type Action =
  | {
      type: typeof AppointmentFormActionTypes.SET_PATIENT_NAME;
      payload: string;
    }
  | {
      type: typeof AppointmentFormActionTypes.SET_SELECTED_DATE;
      payload: Dayjs | null;
    }
  | {
      type: typeof AppointmentFormActionTypes.SET_SELECTED_TIME;
      payload: string;
    }
  | { type: typeof AppointmentFormActionTypes.SET_DESCRIPTION; payload: string }
  | { type: typeof AppointmentFormActionTypes.RESET_FORM };

export const initialAppointmentFormState: State = {
  patientName: '',
  selectedDate: null,
  selectedTime: '',
  description: '',
};

// Reducer function to handle form state updates
export const appointmentFormReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case AppointmentFormActionTypes.SET_PATIENT_NAME:
      return { ...state, patientName: action.payload };
    case AppointmentFormActionTypes.SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
        selectedTime: '', // Reset time when date changes
      };
    case AppointmentFormActionTypes.SET_SELECTED_TIME:
      return { ...state, selectedTime: action.payload };
    case AppointmentFormActionTypes.SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case AppointmentFormActionTypes.RESET_FORM:
      return initialAppointmentFormState;
    default:
      return state;
  }
};
