---
title: Pierwszy prototyp kontrolera ESP32 i płytki warsztatowej
slug: pierwszy-prototyp-esp32
excerpt: Dokumentacja budowy prototypu kontrolera opartego na mikrokontrolerze ESP32-S3, zintegrowanego z wyświetlaczem SPI i obudową drukowaną w 3D.
date: 2026-10-18T14:30:00
draft: false
featured: true
tags:
  - elektronika-esp32
  - diy-maker
  - cad-freecad
  - druk-3d
cover: /images/fixture-cover.png
coverAlt: Płytka prototypowa ESP32 z podłączonymi czujnikami na macie warsztatowej
seed: esp32-proto-01
blocks:
  - type: text
    body: |
      ## Architektura sprzętowa

      Głównym celem tego projektu było zaprojektowanie niezawodnego kontrolera warsztatowego, który łączy w sobie komunikację Wi-Fi, magistralę I2C do podłączania modułów telemetrycznych oraz szybki interfejs SPI do sterowania matrycą.

      Wybór padł na układ **ESP32-S3-WROOM-1** ze względu na wbudowaną pamięć PSRAM oraz sprzętowe wsparcie dla instrukcji wektorowych.
  - type: image
    image: /images/fixture-cover.png
    alt: Schemat wyprowadzeń GPIO kontrolera
    caption: Schemat połączeń magistrali I2C oraz zasilania 3.3V LDO
    width: szeroki
  - type: code
    language: cpp
    filename: esp32_firmware.cpp
    code: |
      #include <Arduino.h>
      #include <Wire.h>

      #define I2C_SDA 8
      #define I2C_SCL 9

      void setup() {
        Serial.begin(115200);
        Wire.begin(I2C_SDA, I2C_SCL);
        Serial.println(F("[SYS] Kontroler ESP32 gotowy."));
      }

      void loop() {
        // Pomiar telemetrii
        delay(1000);
      }
  - type: gallery
    caption: Zdjęcia z procesu prototypowania i montażu obudowy
    images:
      - image: /images/fixture-gallery-1.png
        alt: Detal obudowy wydrukowanej z PETG
        caption: Wydruk testowy z PETG (warstwa 0.2mm)
      - image: /images/fixture-gallery-2.png
        alt: Pasowanie płytki PCB w gnieździe obudowy
        caption: Tolerancja pasowania 0.35mm
  - type: video
    title: Test działania magistrali i pierwszego uruchomienia
    youtube: https://www.youtube.com/watch?v=dQw4w9WgXcQ
    caption: Rejestracja sygnałów oscyloskopem podczas inicjalizacji magistrali SPI
  - type: model
    file: /files/sample-model.glb
    alt: Model CAD obudowy zaprojektowany w FreeCAD
    caption: Interaktywny model 3D obudowy (obróć i przybliż)
---

Wstępna faza testów laboratoryjnych potwierdziła stabilność zasilania oraz brak zakłóceń na liniach zegarowych. Poniżej znajduje się pełny zapis eksperymentu oraz instrukcja krok po kroku.
