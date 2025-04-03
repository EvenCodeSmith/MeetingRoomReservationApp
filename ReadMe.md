# 📌 Projekt-Dokumentation: MeetingPoint

## 🗃️ Projektübersicht

MeetingPoint ist eine Webanwendung zur Verwaltung und Reservierung von Besprechungsräumen. Das System bietet eine übersichtliche Benutzeroberfläche und einfache Verwaltungsmöglichkeiten sowohl für Endbenutzer als auch für Administratoren.

Die Architektur besteht aus einem Frontend, das mit **React** entwickelt wurde, und einem Backend, das auf **ASP.NET Core WebAPI** basiert. Als Datenbank wird **MongoDB** verwendet.

---

## 📂 Projektstruktur

```
MeetingRoomReservationApp/
├── Frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   └── src/
│       ├── api/
│       │   ├── meetingRooms.js
│       │   └── reservations.js
│       ├── components/
│       │   ├── ReservationCalendar.jsx
│       │   └── ReservationForm.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   └── Reservations.jsx
│       ├── App.css
│       ├── App.jsx
│       └── main.jsx
│
└── Backend (MeetingRoomReservationAPI)/
    ├── Controllers/
    │   ├── MeetingRoomsController.cs
    │   └── ReservationsController.cs
    ├── Models/
    │   ├── MeetingRoom.cs
    │   └── Reservation.cs
    ├── Services/
    │   ├── MeetingRoomService.cs
    │   └── ReservationService.cs
    ├── Program.cs
    └── Startup.cs
```

---

## 🌐 Frontend

### Technologien
- **React** mit **Vite**
- **Material UI (MUI)**
- **React Big Calendar** (für Kalendereinträge)
- **Notistack** (Snackbar-Benachrichtigungen)

### Aufbau
- **`public/index.html`**: Enthält die Basisseite, Titel und Icons.
- **`src/api`**: Enthält alle API-Aufrufe zu MeetingRooms und Reservations.
- **`src/components`**: Enthält wiederverwendbare UI-Komponenten:
  - `ReservationCalendar.jsx`: Zeigt Reservierungen übersichtlich im Kalender an.
  - `ReservationForm.jsx`: Erlaubt das Erstellen/Bearbeiten von Reservierungen mit Kalenderauswahl (ohne manuelle Eingabe).
- **`src/pages`**: Seitenkomponenten zur Navigation:
  - `Dashboard.jsx`: Zeigt Statistik und Raumstatus mit klarer Übersicht über aktuelle und zukünftige Belegungen.
  - `Reservations.jsx`: Ermöglicht die Verwaltung von Reservierungen (Liste und Kalender).

### Features
- Dynamische Kalenderansicht mit Filtern nach Räumen.
- Live-Benachrichtigungen bei Fehlern und Erfolgsmeldungen.
- Validierung der Eingabedaten zur Vermeidung von Überschneidungen.

---

## ⚙️ Backend

### Technologien
- **ASP.NET Core WebAPI**
- **MongoDB** als NoSQL-Datenbank
- **Swagger** zur API-Dokumentation

### Aufbau
- **`Controllers`**: Bearbeiten eingehende HTTP-Anfragen und kommunizieren mit den Services.
  - `MeetingRoomsController`: CRUD-Operationen für Räume.
  - `ReservationsController`: CRUD-Operationen für Reservierungen, inkl. Validierung.
- **`Models`**: Beschreiben die Struktur der Daten:
  - `MeetingRoom.cs`: Definition eines Raumes.
  - `Reservation.cs`: Definition einer Reservierung.
- **`Services`**: Enthalten die Geschäftslogik:
  - Überprüfung auf Überschneidungen bei Reservierungen.
  - Speicherung und Abfrage von Daten in MongoDB.
- **`Startup.cs`**: Registrierung von Middleware und Services.

### Features
- REST-API mit eindeutiger HTTP-Statuscodierung.
- Validierung von Reservierungen auf Zeitkonflikte (409-Conflict).
- Persistente Speicherung in MongoDB.

---

## 💾 Datenbank (MongoDB)

Daten werden in zwei primären Collections gespeichert:
- `MeetingRooms`: Enthält Daten zu den verfügbaren Räumen.
- `Reservations`: Enthält alle Reservierungsdaten mit Zeiträumen und Nutzerinformationen.

---

## 🎨 UI/UX und Anpassungen

- Das Frontend bietet eine klare, benutzerfreundliche Oberfläche auf Basis von Material UI.
- Kalenderansicht wurde optimiert, um Benutzerfehler bei der Datumseingabe zu minimieren.
- Schnelle Statusübersicht der Räume im Dashboard, inklusive Countdown bis zur nächsten Reservierung.

---

## 🔧 Änderungen und Personalisierung

- **Projektname:** Umbenennung von "MeetingRoom App" zu **"MeetingPoint"**.
- **Browser-Tab:** Umbenannt zu **"AG-Service"** und mit neuem Favicon versehen.

---

## 🚀 Fazit

MeetingPoint bietet eine modulare, klar strukturierte und einfach erweiterbare Lösung für Besprechungsraumverwaltung. Frontend und Backend sind sauber voneinander getrennt und interagieren ausschließlich über eine REST-API. Diese Architektur ermöglicht eine einfache Wartung und Erweiterbarkeit des Systems.

