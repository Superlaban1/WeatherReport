# Vejr lige nu

En lille, installérbar vejr-app bygget med vanilla JavaScript-moduler og Open-Meteo.

## Funktioner

- Viser dagens vejr for din nuværende lokation.
- Se en femdagesprognose og vælg en dag for at få vejret time for time.
- Viser temperatur, vindstyrke og -retning, vejrtype med ikon og nedbør.
- Fungerer offline med tidligere hentede vejrdata og cachede app-filer.

## Kør lokalt

Appen bruger JavaScript-moduler og service workers, så åbn den via en lokal webserver – ikke direkte som en `file://`-fil.

```sh
python -m http.server 8000
```

Åbn derefter `http://localhost:8000`, og giv browseren tilladelse til at bruge din lokation. Lokation kræver HTTPS eller localhost.

## GitHub Pages

Appen kan publiceres via **Settings → Pages** i repoet. Vælg en deployment-metode, der publicerer indholdet fra repoets rod.

## Struktur

- `assets/js/model/weatherModel.js` henter vejrdata fra Open-Meteo.
- `assets/js/view/weatherView.js` viser data og håndterer visningens knapper.
- `assets/js/site.js` monterer sidens skabelon og starter MVC-controlleren.
- `assets/js/components/atoms/` indeholder små dele som HTML-elementer, vejr-ikoner og formatering.
- `assets/js/components/molecules/` indeholder aktuelle vejrforhold samt individuelle dag- og timekort.
- `assets/js/components/organisms/` indeholder sidens sektioner, fx header og femdagesoversigt.
- `assets/js/components/templates/weatherApp.js` samler sektionerne til sidens layout.
- `assets/js/controller/weatherController.js` forbinder modellen og visningen.
- `sw.js` bruger network-first med cache-fallback til Open-Meteo og cache-first med netværks-fallback til statiske filer.
- `manifest.json` og `assets/img/weather-icon.svg` gør appen installérbar.

Visningen holder sig til en enkel MVC-opdeling. Komponenterne følger atomic design fra atoms og molecules til organisms og sidens template – uden ekstra framework.

Vejrudsigten bruger Open-Meteos gratis Forecast-API. Ingen API-nøgle er nødvendig.
