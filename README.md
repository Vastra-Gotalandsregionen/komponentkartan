# Komponentkartan
<!-- Badges section here. -->
![npm](https://img.shields.io/npm/v/vgr-komponentkartan.svg)
![npm](https://img.shields.io/npm/v/vgr-komponentkartan/demo.svg)
![npm](https://img.shields.io/npm/v/vgr-komponentkartan/dev.svg)

Grafiska komponenter för ersättningssystem inom VGR, implementerade i Angular. 
Supportade webbläsare är IE, Chrome och Edge.

## Komma igång

### 0. Förutsättningar
Se [Demoprojektet](https://github.com/Vastra-Gotalandsregionen/komponentkartan-demo) för en exempeluppsättning.

### 1. Installera vgr-komponentkartan via **npm**
```npm
npm install vgr-komponentkartan
```

### 2. Uppsättning av vgr-komponentkartan
Importera komponentkartanmodule i användande module.
```
import { KomponentkartanModule } from 'vgr-komponentkartan';
@NgModule({
    imports: [
        KomponentkartanModule
    ],
    ...
})
```

Lägg till sökvägar till scss filen i angular.json filen, som är beroenden för komponentkartan
```
"styles": [
    "../node_modules/vgr-komponentkartan/assets/komponentkartan.scss",
    "styles.css"
],
```

Ange dependency för ngx-scrollbar i package.json.
Om du använder npm v3 - v6 så måste detta göras manuellt.
Mer förklaring:https://github.com/npm/npm/releases/tag/v3.0.0

Följande behöver installeras för att använda komponentkartan (version angular 12):
```
npm uninstall @fortawesome/angular-fontawesome && npm install @fortawesome/angular-fontawesom@latest
npm uninstall ngx-scrollbar && npm install ngx-scrollbar@8.0.0
npm uninstall @fortawesome/fontawesome-svg-core && npm install @fortawesome/fontawesome-svg-core@latest
npm uninstall @fortawesome/free-regular-svg-icons && npm install @fortawesome/free-regular-svg-icons@latest
npm uninstall @fortawesome/free-solid-svg-icons && npm install @fortawesome/free-solid-svg-icons@latest
npm uninstall @angular/cdk && npm install @angular/cdk@v12-lts
```

Börja använda komponenterna t.ex.
```
<vgr-header></vgr-header>
```

## Kod
Skriven i html, typescript och Sass.

### Namngivning av komponenter och dess egenskaper
...

### Tester
Samtliga komponenter är och ska vara täckta av tester via Jasmine.

Testerna är uppdelade i två typer, tester med Angular och tester utan Angular. Tester **med** Angular benämns *komponent*.**angular**.spec.ts. Tester **utan** Angular namnges endast med *komponent*.spec.ts

## Byggt med

* [Angular 12](https://angular.io/) - Web framework
* [Typescript](https://www.typescriptlang.org/) - Javascript that scales
* [SASS](sass-lang.com) - SASS - Syntactically Awesome Style Sheets
* [NPM](https://www.npmjs.com/) - Dependency Management
* CSS struktureras enligt ITCSS. Se [ITCSS: SCALABLE AND MAINTAINABLE CSS ARCHITECTURE](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) för mer information.


## Versioner

Vi använder [SemVer](http://semver.org/) för versionering. Ändringar mellan versioner noteras i vår [Changelog](CHANGELOG.md), som följer riktlinjer från [keepachangelog.com](http://keepachangelog.com). Changelog för stabil version (se nedan) innehåller alltid ändringar utifrån **föregående stabila version**.

### Senaste stabila version
Efter godkännande av demo från produktägare skapas en ny stabil version.

Den senaste stabila versionen hämtas automatiskt via.
```npm
npm install vgr-komponentkartan
```

Samtliga versioner som släppts kan ses på [NPM](https://www.npmjs.com/package/vgr-komponentkartan)

### Senaste demoversion
Under utveckling av nya features publiceras en demoversion. Den används internt av teamet och används vid demo för produktägare. Den namnges som releasekandidat med *kommande-version*-*rc*.*nummer*. T.ex
- 1.2.0-rc1
- 1.2.0-rc2
- osv..

En demoversion publiceras av teamet med hjälp av
```npm
npm publish --tag demo
```

För att hämta ner den senaste demoversionen **OBS! Ej för produktion**
```npm
npm install vgr-komponentkartan@demo
```

## Författare
VGR IT

## Licens

TODO

