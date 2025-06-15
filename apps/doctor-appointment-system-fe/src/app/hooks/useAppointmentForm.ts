import { useReducer } from 'react';
import {
  appointmentFormReducer,
  initialAppointmentFormState,
} from 'apps/doctor-appointment-system-fe/src/app/reducers/appointmentForm/appointmentFormReducer';
import { AppointmentFormActionTypes } from 'apps/doctor-appointment-system-fe/src/app/reducers/appointmentForm/appointmentFormActionTypes';
import { Dayjs } from 'dayjs';

// Custom hook for appointment form management
export const useAppointmentForm = () => {
  const [formState, dispatch] = useReducer(
    appointmentFormReducer,
    initialAppointmentFormState,
  );

  // Action creators for cleaner API
  const updatePatientName = (name: string) => {
    dispatch({
      type: AppointmentFormActionTypes.SET_PATIENT_NAME,
      payload: name,
    });
  };

  const updateSelectedDate = (date: Dayjs | null) => {
    dispatch({
      type: AppointmentFormActionTypes.SET_SELECTED_DATE,
      payload: date,
    });
  };

  const updateSelectedTime = (time: string) => {
    dispatch({
      type: AppointmentFormActionTypes.SET_SELECTED_TIME,
      payload: time,
    });
  };

  const updateDescription = (description: string) => {
    dispatch({
      type: AppointmentFormActionTypes.SET_DESCRIPTION,
      payload: description,
    });
  };

  const resetForm = () => {
    dispatch({ type: AppointmentFormActionTypes.RESET_FORM });
  };

  // Form validation helper
  const isFormValid = (): boolean => {
    const { patientName, selectedDate, selectedTime, description } = formState;
    return !!(patientName && selectedDate && selectedTime && description);
  };

  return {
    formState,
    updatePatientName,
    updateSelectedDate,
    updateSelectedTime,
    updateDescription,
    resetForm,
    isFormValid,
  };
};
