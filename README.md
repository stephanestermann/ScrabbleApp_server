# ScrabbleApp_server
Der Node.js Server zur Scrabble-App

# Nötige Einrichtungsarbeiten damit das DB-Backup zu GDrive funktionert
GDrive-User: stephs.scrabble.app@gmail.com
Passwort: Gespeichert im Chrome

GoogleCloud-Adresse: https://console.cloud.google.com/apis/dashboard?project=quickstart-1611323338732 
- Google Drive API aktivieren
- Unter Anmeldedaten ein Dienstkonto erstellen und aktivieren
- Unter Schlüssel eine Schlüssel hinzufügen. Die Schlüsseldaten können nur beim Erstellen heruntergeladen werden.
- Die Schlüsseldaten unter credentials.json ins Projekt einfühen (Achtung ist im .gitignore damit es nicht ins GITHUB kommt)
- Diese Datei muss aber auf den GLITCH-Server gelangen

GDrive konfigurieren:
- Einen Ordner erstellen, wo dieses Dienstkonto deine Dateien hochladen darf
- Das Dienstkonto hat eine EMail, welche auf diesem Ordner berechtigt werden muss. Momentan ist das: scrabble-app@quickstart-1611323338732.iam.gserviceaccount.com 

