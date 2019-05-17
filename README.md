# Komponentkartan
<!-- Badges section here. -->
![npm](https://img.shields.io/npm/v/vgr-komponentkartan.svg)
![npm](https://img.shields.io/npm/v/vgr-komponentkartan/demo.svg)

Grafiska komponenter för ersättningssystem inom VGR, implementerade i Angular

# Releaser för Komponentkartan
Komponentkartan planeras släppas i major-version fyra gånger per år, förutsatt att det finns någon funktionalitet som leder till breaking changes att släppa. 

## Planerade släpp
Under 2019 har följande datum satt för release av major-versioner
* *Version 5: 20 mars 2019 OBS utgår då det inte finns någon funktionalitet som medför major-version*
* Version 5: 22 maj 2019

Det som kommer att ingå i de olika versionerna är ännu inte beslutat, men nedan finns en beskrivning av funktionalitet som troligtvis kan komma med i de släpp vi planerat under våren 2019. 

### Version 5
**OBS detta är en uppskattning**
* Ny sammanslagen datum- och månadsväljare, som det går att skriva in datum i för att välja. *Breaking changes* :white_check_mark:
* Byte av ikoner till FontAwesome *Breaking changes* :white_check_mark:
* Deklarativ header menu *Breaking changes* :white_check_mark:
* Möjlighet att förvälja items i dropdown select utan form control *Breaking changes* :white_check_mark:
* WCAG-anpassning av header menu och menu :white_check_mark:
* Möjlighet att förhindra att kort stängs :white_check_mark:
* Korrigering av inputfält och suffix :white_check_mark:
* Rättning av buggar :white_check_mark:

* Angular 8.0(Under utredning)

## Komma igång

### 0. Förutsättningar
Se [Demoprojektet]https://github.com/Vastra-Gotalandsregionen/komponentkartan-demo) för en exempeluppsättning.

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

Ange dependency för ngx-perfect-scrollbar i package.json.
Om du använder npm v3 så måste detta göras.
Mer förklaring:https://github.com/npm/npm/releases/tag/v3.0.0
```
"dependencies": {
    "ngx-perfect-scrollbar": "^5.3.5"
  },
```

Ifall du får ngx-perfect-scrollbar error med rxjs så lägg till rxjs-compat:
```
"dependencies": {
    "ngx-perfect-scrollbar": "^5.3.5",    
    "rxjs-compat": "^6.2.0",
  },
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

* [Angular 5](https://angular.io/) - Web framework
* [Typescript](https://www.typescriptlang.org/) - Javascript that scales
* [SASS](sass-lang.com) - SASS - Syntactically Awesome Style Sheets
* [NPM](https://www.npmjs.com/) - Dependency Management
* CSS struktureras enligt ITCSS. Se [ITCSS: SCALABLE AND MAINTAINABLE CSS ARCHITECTURE] (https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) för mer information.


## Versioner

Vi använder [SemVer](http://semver.org/) för versionering. Ändringar mellan versioner noteras i vår [Changelog](CHANGELOG.md), som följer riktlinjer från [keepachangelog.com](http://keepachangelog.com). Changelog för stabil version (se nedan) innehåller alltid ändringar utifrån **föregående stabila version**.

### Senaste stabila version
Efter godkännande av demo från produktägare skapas en ny stabil version.

Den senaste stabila versionen hämtas automatiskt via.
```npm
npm install vgr-komponentkartan
```

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

