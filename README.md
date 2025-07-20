# 🚗 Cannabis & Fahren - Sichere Wartezeit berechnen

Eine datenschutzfreundliche Webanwendung zur Berechnung der sicheren Wartezeit nach Cannabiskonsum basierend auf deutschen Gesetzen (§24a StVG) und wissenschaftlichen Erkenntnissen zur THC-Elimination.

## 🎯 Ziel

Diese Anwendung hilft Cannabisnutzern in Deutschland dabei, die sichere Wartezeit nach dem Konsum zu berechnen, um Verstöße gegen §24a StVG (Grenzwert von 3,5 ng/mL THC im Serum) zu vermeiden. Die Berechnung ist konservativ ausgelegt und zielt auf einen Sicherheitswert von unter 1,0 ng/mL.

## ✨ Features

### 🔒 Datenschutz & Sicherheit
- **Lokale Datenspeicherung**: Alle Daten bleiben auf Ihrem Gerät
- **DSGVO-konform**: Keine Datenübertragung an Dritte
- **Keine Tracking-Cookies**: Maximale Privatsphäre
- **Keine Cloud-Speicherung**: Volle Kontrolle über Ihre Daten

### 📊 Wissenschaftliche Berechnung
- **Konservative Schätzung**: Zielwert unter 1,0 ng/mL (statt 3,5 ng/mL)
- **Individuelle Faktoren**: Alter, Gewicht, Nutzungsfrequenz
- **Konsumart**: Unterschiedliche Berechnung für geraucht vs. oral
- **Dosierung**: Berücksichtigung der konsumierten Menge

### 🎨 Benutzerfreundlichkeit
- **Deutsche Sprache**: Vollständig auf Deutsch
- **Mobile-first Design**: Optimiert für Smartphones
- **Einfache Bedienung**: Klare, intuitive Oberfläche
- **Sofortige Berechnung**: Ergebnisse in Echtzeit

## 🧮 Berechnungsmodell

### Nutzungsfrequenz
- **Gelegentlich** (< 1x/Woche): 12-24 Stunden Wartezeit
- **Regelmäßig** (2-4x/Woche): 3-5 Tage Wartezeit  
- **Chronisch** (täglich): 7-28 Tage Wartezeit

### Anpassungsfaktoren
- **Dosierung**: Hohe Dosen (>0.5g) verdoppeln Wartezeit
- **Konsumart**: Oral = 50% längere Wartezeit
- **Alter**: Ältere Nutzer (+20% ab 60 Jahren)
- **Gewicht**: Höheres Gewicht = längere Retention

### Wissenschaftliche Grundlagen
- **THC-Halbwertszeit**: 1,3-13 Tage je nach Nutzungsfrequenz
- **Fettlöslichkeit**: THC reichert sich im Fettgewebe an
- **Metabolismus**: Individuelle Unterschiede berücksichtigt
- **Bioverfügbarkeit**: Orale vs. inhalative Aufnahme

## 🚀 Installation & Entwicklung

### Voraussetzungen
- Node.js 18+ 
- npm oder yarn

### Installation
```bash
# Repository klonen
git clone [repository-url]
cd canacalculate

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

### Build für Produktion
```bash
# Produktionsbuild erstellen
npm run build

# Produktionsserver starten
npm start
```

## 🛠️ Technologie-Stack

- **Frontend**: Next.js 15 mit TypeScript
- **Styling**: Tailwind CSS
- **Formulare**: React Hook Form + Zod
- **Datum/Zeit**: date-fns
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📱 Verwendung

1. **Profil erstellen**: Alter, Gewicht, Nutzungsfrequenz eingeben
2. **Konsum eintragen**: Menge, Art und Zeitpunkt des Konsums
3. **Ergebnis ablesen**: Sichere Fahrzeit wird berechnet
4. **Hinweise beachten**: Rechtliche und wissenschaftliche Informationen

## ⚖️ Rechtliche Hinweise

### Wichtiger Disclaimer
Diese Anwendung dient nur zu Informationszwecken und bietet keine rechtliche Beratung. Die Berechnung ist konservativ ausgelegt, garantiert aber keine rechtliche Immunität.

### Deutsche Gesetze
- **§24a StVG**: Grenzwert von 3,5 ng/mL THC im Serum
- **Empfohlener Sicherheitswert**: Unter 1,0 ng/mL
- **Konservative Berechnung**: Berücksichtigt individuelle Faktoren

### Datenschutz
- **DSGVO-konform**: Alle Daten bleiben lokal
- **Keine Weitergabe**: Keine Datenübertragung an Dritte
- **Volle Kontrolle**: Nutzer behalten volle Datenhoheit

## 🔬 Wissenschaftliche Quellen

Die Berechnungen basieren auf:
- Pharmakokinetische Studien zu THC-Elimination
- Deutsche Rechtsgrundlagen (§24a StVG)
- Konservative Schätzungen für maximale Sicherheit
- Individuelle Faktoren (Alter, Gewicht, Nutzungsfrequenz)

## 🤝 Beitragen

Beiträge sind willkommen! Bitte beachten Sie:
- Code-Style beibehalten
- Tests für neue Features
- Dokumentation aktualisieren
- Datenschutz beachten

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 🆘 Support

Bei Fragen oder Problemen:
- GitHub Issues verwenden
- Datenschutz steht an erster Stelle
- Keine persönlichen Daten in Issues

---

**⚠️ Wichtiger Hinweis**: Diese Anwendung ersetzt keine rechtliche Beratung. Bei Unsicherheit warten Sie länger oder nutzen Sie öffentliche Verkehrsmittel.
