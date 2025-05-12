# 📝 Multi-User Notes Taking App

A collaborative note-taking web application where users can create, manage, and share notes with specific user groups. This app supports secure PDF uploads, group access control, and robust user authentication.

## 🚀 Features

- 🔐 Secure user authentication and authorization
- 🧠 Create, edit, and delete notes
- 👥 Group-based access control
- 📁 Upload and view PDFs

## 🛠️ Tech Stack

**Frontend:**
- React
- Tailwind CSS

**Backend:**
- Express.js 
- MySQL
- JWT-based authentication

**DevOps & Infra:**
- Docker (optional)
- AWS S3 (for file storage)

---

## 📦 Installation & Setup

> Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/multiuser-notes-app.git
cd multiuser-notes-app

Inside MySQL CLI 
source 'path to Db.sql'

cd Frontend/
npm install

cd ../Backend/
npm install


create a .env file in the Backend/ folder and configure your database credentials:

HOST=localhost
USER=youruser
PASSWORD=yourpassword
DATABASE=notes_app
APP_PORT=9000


Create a keys/ directory inside Backend/src/ and add the following:

Backend/
├── src/
│   └── keys/
│       ├── PublicKey.pem
│       └── PrivateKey.pem


Inside Backend/
nodemon index.js / node inde.js

Inside Frontend/
npm run dev