import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import {
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
  screen,
} from '@storybook/test';

import { AppLayout } from './AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { defaultUpdateAppointmentsHandler } from 'apps/doctor-appointment-system-fe/src/mocks/handlers/appointments';
import { defaultDoctorDetailsHandler } from 'apps/doctor-appointment-system-fe/src/mocks/handlers/doctorDetails';
import { defaultScheduleHandler } from 'apps/doctor-appointment-system-fe/src/mocks/handlers/schedule';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient();

export default {
  title: 'Doctor Appointment/Home',
  component: AppLayout,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Story />
        </LocalizationProvider>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        defaultDoctorDetailsHandler,
        defaultScheduleHandler,
        defaultUpdateAppointmentsHandler,
      ],
    },
  },
} as Meta<typeof AppLayout>;

export const Default: StoryObj = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/book-appointment']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('progressbar')).toBeVisible();

    await waitForElementToBeRemoved(() => canvas.queryByRole('progressbar'));

    await expect(
      canvas.getByText('Doctor Appointment System'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Dr. Smith - 5 days/week, 8 slots/day'),
    ).toBeInTheDocument();

    // Verify we're on the booking tab by default
    await expect(canvas.getByText('Book New Appointment')).toBeInTheDocument();

    // Fill in patient name
    const patientNameInput = canvas.getByLabelText(/patient name/i);
    await userEvent.type(patientNameInput, 'John Doe');
    await expect(patientNameInput).toHaveValue('John Doe');

    // Select appointment date
    const dateInput = canvas.getByRole('button', { name: 'Choose date' });
    await userEvent.click(dateInput);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Wait for date picker to open and select tomorrow's date
    const tomorrow = dayjs().add(1, 'day').date();
    const tomorrowButton = screen.getAllByRole('gridcell', {
      name: tomorrow.toString(),
    })[0];
    await userEvent.click(tomorrowButton);

    // // Select time slot
    const timeSelect = canvas.getByRole('combobox');
    await userEvent.click(timeSelect);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Select first available slot (9:00)
    const timeOption = screen.getByRole('option', { name: '09:00' });
    await userEvent.click(timeOption);

    // Fill in description
    const descriptionInput = canvas.getByLabelText(
      /description of health issue/i,
    );
    await userEvent.type(descriptionInput, 'Regular checkup and consultation');
    await expect(descriptionInput).toHaveValue(
      'Regular checkup and consultation',
    );

    // Submit the form
    const bookButton = canvas.getByRole('button', {
      name: /book appointment/i,
    });
    await expect(bookButton).toBeEnabled();
    await userEvent.click(bookButton);

    // Verify success message appears
    await expect(
      canvas.getByText('Appointment booked successfully!'),
    ).toBeInTheDocument();
  },
};

// Story specifically for the schedule view
export const ScheduleView: StoryObj = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/schedule']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for loading to finish
    await waitForElementToBeRemoved(() => canvas.queryByRole('progressbar'), {
      timeout: 5000,
    });

    // Verify we're on the schedule tab
    await expect(canvas.getByText("Doctor's Schedule")).toBeInTheDocument();
  },
};
