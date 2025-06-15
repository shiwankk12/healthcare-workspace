# Doctor Appointment System

A full-stack appointment booking system built with **Nx monorepo**, **React 19**, **Material-UI 6+**, **React Query**, and **Node.js Express**.

## Features

- **Book Appointments** - Select available dates and time slots
- **View Schedule** - See doctor's availability with real-time updates
- **Prevent Double Booking** - System prevents booking the same slot twice
- **Responsive Design** - Mobile-first design with Material-UI
- **Component Documentation** - Interactive Storybook with comprehensive test cases

## Tech Stack

**Frontend:** React 19, TypeScript, Material-UI 6+, React Query  
**Backend:** Node.js, Express, TypeScript  
**Documentation:** Storybook with play canvas testing  
**Tools:** Nx Monorepo, pnpm, Webpack

## Prerequisites

- **Node.js** 20+
- **pnpm** 8+

```bash
npm install -g pnpm@latest
```

## Installation

```bash
# Create project directory
mkdir healthcare-workspace && cd healthcare-workspace

# Copy all project files, then install dependencies
pnpm install

# Optional: Install Nx CLI globally
pnpm add -g nx@18.0.0
```

## Running the Application

### Start Both Applications

```bash
pnpm dev
```

### Start Individually

```bash
# Backend only (port 3000)
pnpm serve:backend

# Frontend only (port 4200)
pnpm serve:frontend

# Storybook
pnpm storybook
```

## Access Points

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000

## Project Structure

```
healthcare-workspace/
├── package.json                           # pnpm workspace config
├── .storybook/                           # Storybook configuration
│   ├── main.ts
│   ├── preview.ts
├── apps/
│   ├── doctor-appointment-system-fe/      # React Frontend
│   │   ├── src/
│   │   │   ├── main.tsx                   # App entry point with QueryClient
│   │   │   ├── mocks/
│   │   │   │   └── data/
│   │   │   │       └── schedule.ts        # Mock data for stories
│   │   │   └── app/
│   │   │       ├── App.tsx                # Main app with lazy loading
│   │   │       ├── App.stories.tsx
│   │   │       ├── types.ts               # TypeScript interfaces
│   │   │       ├── components/
│   │   │       │   ├── index.ts
│   │   │       │   └── TabPanel.tsx       # Reusable TabPanel component
│   │   │       ├── features/
│   │   │       │   ├── AppointmentBooking/
│   │   │       │   │   ├── AppointmentBooking.tsx
│   │   │       │   │   └── AppointmentBooking.stories.tsx
│   │   │       │   └── Schedule/
│   │   │       │       ├── Schedule.tsx
│   │   │       │       ├── Schedule.stories.tsx
│   │   │       │       ├── ScheduleDayItem.tsx
│   │   │       │       └── ScheduleDayItem.stories.tsx
│   │   │       ├── hooks/
│   │   │       │   ├── index.ts
│   │   │       │   ├── useDoctor.ts       # Doctor data fetching
│   │   │       │   ├── useSchedule.ts     # Schedule data fetching
│   │   │       │   ├── useBookAppointment.ts  # Booking mutation
│   │   │       │   └── useAppointmentForm.ts  # Form state management
│   │   │       ├── services/
│   │   │       │   └── api.ts             # API endpoints & axios config
│   │   │       ├── utils/
│   │   │       │   └── dateUtils.ts       # Date formatting utilities
│   │   │       └── reducers/
│   │   │           └── appointmentForm/
│   │   │               ├── appointmentFormReducer.ts
│   │   │               └── appointmentFormActionTypes.ts
│   │   └── project.json
│   └── doctor-appointment-system-bff/     # Node.js Backend
│       └── src/main.ts
```

## Usage

### Book Appointment

1. Go to "Book Appointment" tab
2. Select date and time slot
3. Fill patient details
4. Submit booking

### View Schedule

1. Go to "View Schedule" tab
2. See available (green) and booked (red) slots

## Configuration

**Doctor Settings** in `apps/doctor-appointment-system-bff/src/main.ts`:

```typescript
const doctor = {
  name: 'Dr. Smith',
  workingDays: 5, // Monday-Friday
  slotsPerDay: 8, // 9 AM - 5 PM
};
```

---

**Ready to go! Run `pnpm dev` and visit http://localhost:4200**
