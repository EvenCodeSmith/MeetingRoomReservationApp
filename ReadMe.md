# 📌 Projekt-Dokumentation: MeetingPoint

## 🗃️ Projektübersicht

**MeetingPoint** ist eine moderne Webanwendung zur Verwaltung und Reservierung von Besprechungsräumen. Sie bietet eine intuitive Kalenderansicht, einfache Verwaltung von Räumen und Reservierungen sowie eine Echtzeit-Dashboard-Übersicht.

Die Anwendung besteht aus:
- einem **Frontend mit React (Vite, Material UI, Big Calendar)**,
- einem **Backend mit ASP.NET Core WebAPI**,
- einer **MongoDB-Datenbank** für die persistente Speicherung.

---

## 📁 Projektstruktur

### 🔹 Frontend (React)

```plaintext
Frontend/
├── public/                         # Statische Dateien wie Logos
│   ├── MeetingPoint-Logo.png
│   └── ...
├── src/
│   ├── api/                        # API-Requests zu Backend
│   │   ├── apiConfig.js
│   │   ├── meetingRooms.js
│   │   └── reservations.js
│   ├── components/                 # Wiederverwendbare UI-Komponenten
│   │   ├── ReservationCalendar.jsx
│   │   ├── ReservationForm.jsx
│   │   ├── RoomCard.jsx
│   │   └── RoomForm.jsx
│   ├── layouts/                   # Layout-Komponenten wie Navigation
│   │   └── MainLayout.jsx
│   ├── pages/                     # Seiten: Dashboard, Räume, Reservierungen
│   │   ├── Dashboard.jsx
│   │   ├── Reservations.jsx
│   │   └── Rooms.jsx
│   ├── styles/
│   │   └── global.css             # Globale Styles & Kalenderanpassungen
│   ├── utils/
│   │   └── validation.js          # Validierungslogik für Reservierungen
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── theme.js                   # MUI-Theme-Konfiguration
├── eslint.config.js               # ESLint Setup für Codequalität
├── index.html
├── vite.config.js
└── package.json
```

### 🔸 Backend (ASP.NET Core WebAPI)

```plaintext
MeetingRoomReservationAPI/
├── Controllers/
│   ├── MeetingRoomsController.cs
│   └── ReservationsController.cs
├── Models/
│   ├── MeetingRoom.cs
│   └── Reservation.cs
├── Services/
│   ├── MeetingRoomService.cs
│   └── ReservationService.cs
├── Settings/
│   └── MongoDBSettings.cs
├── Program.cs
├── appsettings.json
├── appsettings.Development.json
├── launchSettings.json
├── MeetingRoomReservationAPI.csproj
└── MeetingRoomReservationAPI.http
```

### 🧪 Tests (xUnit)

```plaintext
MeetingRoomReservationTests/
├── ReservationServiceTest.cs
└── MeetingRoomReservationTests.csproj
```

---

## 🌐 Frontend – Features

- 📅 **Kalenderansicht mit Ressourcen-Spalten**:
  - Darstellung nach Raum (resourceId)
  - Wochen-, Tages- und Agendaansicht
  - Längere Termine werden korrekt auf mehrere Tage verteilt

- 🏷️ **Raumfilterung & Auswahl**:
  - Alle Räume oder einzelne Räume anzeigen
  - Tabs zur schnellen Navigation

- ⚠️ **Eingabeschutz bei Datum/Zeit**:
  - Kein manuelles Eintippen des Datums möglich
  - Nur Auswahl über Date-Picker erlaubt

- 🔔 **Snackbar-Benachrichtigungen**:
  - Erfolgreiche Aktionen, Warnungen und Fehler

- ✏️ **Bearbeiten & Löschen direkt aus der Liste**

---

## ⚙️ Backend – Features

- ✅ REST-API mit sauberem Routing (`/api/meetingrooms`, `/api/reservations`)
- 🔁 Validierung gegen Überschneidungen bei Reservierungen
- 🕒 Zeitlogik mit Start-/Endzeitprüfung
- 📃 Swagger kann für API-Testzwecke eingebunden werden
- 💾 MongoDB-Anbindung mit Konfigurationsdatei

---

## 📊 Dashboard-Funktionen

- Gesamtanzahl der Räume und Reservierungen
- Anzeige: **aktive Reservierungen** am aktuellen Tag
- Status je Raum:
  - 🔴 Belegt – noch *Xh Ymin*
  - 🟡 Reserviert in *Xh*
  - 🟢 Frei – keine Reservierung offen

---

## 🚀 Startanleitung

### 📦 Frontend starten

```bash
cd Frontend
npm install
npm run dev
```

### 🖥 Backend starten

```bash
cd MeetingRoomReservationAPI
dotnet run
```

### 🔍 Backend Tests ausführen

```bash
cd MeetingRoomReservationTests
dotnet test
```

---

## 🧪 Validierung & Fehlerbehandlung

- Automatische Zeitprüfung (Start vor Ende)
- Keine Überschneidungen erlaubt
- Gültige Jahreswerte nur über Picker (kein manuelles Eingeben möglich)
- Einheitliches Snackbar-System für User-Feedback

---

## 🧭 Navigation & Layout

- **Hauptnavigation oben** (MUI AppBar)
- Aktive Seite wird visuell hervorgehoben
- Navigation zwischen:
  - Dashboard
  - Räume
  - Reservierungen

---

## ✨ Personalisierungen

- ✅ Projektname geändert zu **MeetingPoint**
- ✅ Tab-Titel angepasst zu **AG-Service**
- ✅ Neues Logo & Favicon eingebunden
- ✅ Kalender visuell verbessert (Raumabgrenzungen)
- ✅ Eingabeschutz für Datum & Zeit aktiviert
- ✅ Snackbar-Meldungen überall integriert
- ✅ Statusübersicht für jeden Raum im Dashboard

---

## 👨‍💻 Entwickler

**Even Stuck, Yannick Frei, Tunahan Keser**   
> Projektwoche IBZ | 2025

---

## 📃 Lizenz

MIT License – Nutzung & Anpassung erlaubt.