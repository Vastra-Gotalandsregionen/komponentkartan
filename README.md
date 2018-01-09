# Komponentkartan
<!-- Badges section here. -->
![npm](https://img.shields.io/npm/v/vgr-komponentkartan.svg)
![npm](https://img.shields.io/npm/v/vgr-komponentkartan/demo.svg)

Grafiska komponenter för ersättningssystem inom VGR, implementerade i Angular 5

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
import { KomponentkartanModule } from 'vgr-komponentkartan/component-package/komponentkartan.module';
@NgModule({
    imports: [
        KomponentkartanModule
    ],
    ...
})
```

Lägg till sökvägar till scss filen och jquery i angular-cli.json filen, som är beroenden för komponentkartan
```
"styles": [
    "../node_modules/vgr-komponentkartan/Content/komponentkartan.scss",
    "styles.css"
],
"scripts": ["../node_modules/jquery/dist/jquery.min.js"],
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

