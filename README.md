# Šachy Polabí

Web spolku pro **sachypolabi.cz** používá Astro 5.16.11. Ze zdrojových stránek, fotografií a článků sestavuje samostatné HTML do složky [docs](docs/). Hotovou verzi lze otevřít přímo z disku dvojklikem na [docs/index.html](docs/index.html), včetně navigace, fotogalerií a školních plakátů.

## Místní úpravy

Pro vývoj použij Node.js 22 a npm. Příkazy spusť v kořeni repozitáře.

```sh
npm ci
npm run dev
```

V prohlížeči otevři adresu, kterou vypíše Astro. Změny se během úprav promítnou do náhledu. Příkaz `npm run build` znovu vytvoří složku [docs](docs/) pro otevření z disku nebo nahrání na statický hosting. Sestavenou verzi můžeš ověřit také přes `npm run preview`.

| Co chceš upravit | Kde |
| --- | --- |
| Telefon, e-mail, EOS, sociální sítě, navigace a adresa kontaktní mapy | [src/data/club.ts](src/data/club.ts) |
| Články v Aktualitách | [src/content/aktuality](src/content/aktuality/) |
| Pořadí fotografií, popisky, náhledy a výběr na titulní stranu | [src/data/galleries.json](src/data/galleries.json) |
| Školy, plakáty a rozvrhy kroužků | [src/data/schools.json](src/data/schools.json) |
| Klubové aktivity a seznam sponzorů | [src/data/activities.json](src/data/activities.json) a [src/data/sponsors.json](src/data/sponsors.json) |
| Ostatní texty a rozpis skupinových tréninků | [src/pages](src/pages/) |
| Fotografie, plakáty, vzhled a chování galerie | [public/media](public/media/), [public/assets](public/assets/) a [údaje k responzivním obrázkům](src/data/pictures.json) |

Novou aktualitu přidej jako soubor `.md` podle [stávajícího článku](src/content/aktuality/byli-jsme-na-mistrovstvi-republiky.md). Název souboru určuje adresu `/l/nazev-clanku/`. Sestavení automaticky přidá článek do přehledu podle data i do [mapy webu](docs/sitemap.xml). Pole `gallery` je volitelné. Při přidání fotografie vlož originál a náhled do `public/media/` a přidej položku s popiskem a rozměry náhledu do příslušné galerie. Příznak `onHomePage` zobrazí vybranou klubovou fotografii také na úvodu.

Šablona [Site.astro](src/layouts/Site.astro) spojuje každou obsahovou stránku s hlavní nabídkou a společnými styly. Při změně zdrojů spusť `npm run build` a ulož i aktualizovaný místní náhled v `docs/`.

## Průběžné nasazení na GitHub Pages

Po prvním nasazení statické verze vyber při přechodu na Astro v **Settings → Pages → Build and deployment → Source** možnost **GitHub Actions**. [Workflow Pages](.github/workflows/pages.yml) sestaví návrhy změn, po zápisu do větve `main` sestaví aktuální zdroje a publikuje jejich výstup. Pro opakované nasazení z `main` je v Actions dostupné **Run workflow**. Zveřejněná verze tak vychází ze zdrojů i při úpravách článku přímo na GitHubu. [Postup GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## Převod z Webnode

Místní kopie z 26. 11. 2026 obsahuje všech deset adres z veřejné mapy webu včetně článku z mistrovství republiky. Fotografie v galeriích a školní plakáty se po kliknutí otevřou v plném rozlišení. Úvod a Kontakt nabízejí telefon, e-mail a vstup na členskou platformu EOS. [Původní mapa webu](https://sachypolabi-cz.webnode.cz/sitemap.xml) · [EOS](https://klub.sachypolabi.cz/)

Původní odkaz na tým vracel chybu 404. Adresa [docs/tym/index.html](docs/tym/index.html) proto odkazuje přímo na trenéry uvedené u skupinových tréninků. Původní kontaktní mapa označuje **Jaromírovy sady 1526/7**. Rozpis na stránce Školy uvádí pro skupinové tréninky **Jaromírovy sady 1726/5**. Obě adresy jsou v Lysé nad Labem a každá je uvedena na příslušné stránce.

Místní složka .webnode-archive obsahuje původní veřejné HTML, sitemapu, stažená média včetně variant, mapování původních adres a kontrolní součty. Je uložena mimo publikační složku a Git ji při přidávání souborů vynechá.

## Vlastní doména a DNS

Web patří klubové organizaci na GitHubu a její veřejný repozitář používá tarif Free. [Repozitář spolku](https://github.com/sachypolabi/sachypolabi.github.io)

1. V nastavení organizace **Settings → Pages** vydává GitHub ověřovací hodnotu pro TXT se jménem **_github-pages-challenge-sachypolabi**. Po přidání hodnoty do Azure DNS se ověření dokončí tlačítkem **Verify**. TXT patří do zóny i po ověření. [Ověření domény](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
2. Před přesměrováním DNS nastav v repozitáři **Settings → Pages → Custom domain** na **sachypolabi.cz**. Pak v Azure DNS nastav záznamy pro kořen a www podle tabulky. Před odstraněním původního zástupného CNAME zkontroluj explicitní záznam klub pro EOS. MX a dosavadní TXT ponech v zóně. [Nastavení vlastní domény](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
3. Po vydání certifikátu zapni **Enforce HTTPS**. Ověř úvod, starý odkaz na článek, přesměrování www a členskou platformu. GitHub pro propagaci DNS i zpřístupnění volby HTTPS uvádí až 24 hodin. [HTTPS na GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

| Jméno v zóně sachypolabi.cz | Typ | Cílová hodnota |
| --- | --- | --- |
| @ | A | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 |
| www | CNAME | sachypolabi.github.io. |
| klub | CNAME | gw.eosclub.zone. (současný cíl členské platformy) |

Tarif Webnode již vypršel. Registrace domény má vlastní datum obnovy. Podle CZ.NIC je k 26. 11. 2026 doména u registrátora Gransy registrovaná do 12. 10. 2027. [Registr CZ.NIC](https://rdap.nic.cz/domain/sachypolabi.cz)
