# Tomato Health Dashboard

Create a comprehensive, responsive web dashboard using Ionic React and Vite for a project titled "BlightDetect+: An AI and IoT-Based Tomato Blight Detection, Classification, Sorting, and Yield Monitoring System." The project must be configured to run locally using ionic serve and compile for production using ionic build.

*System Architecture & Hardware Context (For UI Reference):*
The physical hardware consists of an Arduino Uno controlling a conveyor belt and a servo motor (the physical sorter), integrated with proximity sensors and a dedicated power supply. A laptop camera runs a YOLO computer vision model (via VS Code) to detect and classify tomato blight. The YOLO script pushes real-time detection data and hardware states to Firebase, which this web app will consume.

*Key UI/UX Requirements:*

1. *Dashboard Page (Yield Monitoring):*
   - *Metrics Cards:* Display live statistics using IonCard. Include "Total Tomatoes Processed", "Healthy Yield", and "Blight Detected" (rejected).
   - *Live Sorting Feed:* An IonList showing a real-time event log of the classification process (e.g., "ID #402 - Early Blight Detected - Rejected - 10:42 AM").
   - *Classification Accuracy:* A chart or visual progress bar illustrating the percentage of healthy vs. infected tomatoes.

2. *System Status Page (IoT Hardware Monitoring):*
   - Display a grid of IonBadge or custom status cards for the hardware components.
   - Components to track: YOLO Vision Camera, Arduino Uno, Conveyor Belt, Servo Motor, Sensors, and Power Supply.
   - States should visually toggle between "Online/Active" (Green), "Offline" (Red), and "Standby" (Yellow).

3. *Technical Integrations:*
   - Create a placeholder firebaseConfig.js file and initialize a basic Firebase connection so I can drop in my actual credentials later.
   - Use React Hooks (useEffect, useState) to manage mock data streaming, simulating how the app will listen to Firebase Realtime Database or Firestore updates for the live feed and metrics.

4. *Styling & Structure:*
   - Use standard Ionic UI components (IonHeader, IonContent, IonGrid, IonRow, IonCol, IonMenu).
   - Use a clean, modern color scheme appropriate for agriculture (e.g., Leaf Green, Tomato Red, Alert Yellow, and Dark Gray).
   - Ensure the package.json includes the standard Ionic Vite scripts. fo first the UI and UX

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0cd8f580-dd6c-42ae-9cbc-71ba2a9b0d7f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
