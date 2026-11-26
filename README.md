# Šachy Polabí

Statický web spolku pro doménu **sachypolabi.cz**. Složka [docs](docs/) obsahuje hotové stránky, fotografie, plakáty, písmo a styly. Úpravy se dělají přímo v HTML.

## Místní náhled a úpravy

Úvodní stránku lze otevřít přímo z disku přes [docs/index.html](docs/index.html). Pro ověření adres ve stejném tvaru jako na hostingu spusť v kořeni projektu následující příkaz a otevři místní náhled. [Náhled na portu 8000](http://127.0.0.1:8000/)

    python3 -m http.server 8000 --bind 127.0.0.1 --directory docs

Každá stránka má vlastní složku podle původní adresy. Kontakt je v [docs/kontakt/index.html](docs/kontakt/index.html), rozpis tréninků v [docs/skoly/index.html](docs/skoly/index.html) a přehled článků v [docs/aktuality/index.html](docs/aktuality/index.html). Změnu telefonu či e-mailu promítni také na úvod. Fotografie jsou v [docs/media](docs/media/) a společný vzhled v [docs/assets/web.css](docs/assets/web.css).

## Převod z Webnode

Místní kopie z 26. 11. 2026 obsahuje všech deset adres z veřejné mapy webu včetně článku z mistrovství republiky. Fotografie v galeriích a školní plakáty se po kliknutí otevřou v plném rozlišení. Úvod a Kontakt nabízejí telefon, e-mail a vstup na členskou platformu EOS. [Původní mapa webu](https://sachypolabi-cz.webnode.cz/sitemap.xml) · [EOS](https://klub.sachypolabi.cz/)

Původní odkaz na tým vracel chybu 404. Adresa [docs/tym/index.html](docs/tym/index.html) proto odkazuje přímo na trenéry uvedené u skupinových tréninků. Původní kontaktní mapa označuje **Jaromírovy sady 1526/7**. Rozpis na stránce Školy uvádí pro skupinové tréninky **Jaromírovy sady 1726/5**. Obě adresy jsou v Lysé nad Labem a každá je uvedena na příslušné stránce.

Místní složka .webnode-archive obsahuje původní veřejné HTML, sitemapu, stažená média včetně variant, mapování původních adres a kontrolní součty. Je uložena mimo publikační složku a Git ji při přidávání souborů vynechá.

## První nasazení na GitHub Pages

1. Zvol vlastníka a vytvoř veřejný repozitář. Pro klubovou organizaci sachypolabi je obvyklé jméno **sachypolabi/sachypolabi.github.io**. Pro web v organizaci sponzora lze použít **technomaton/sachypolabi.cz**. Veřejný repozitář podporuje Pages i na tarifu GitHub Free. [Druhy webů na GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
2. Ještě před aktivací webu otevři ve vybrané organizaci **Settings → Pages → Add a domain**. Pro sachypolabi.cz nech vygenerovat ověřovací TXT. V zóně Azure DNS založ záznam se jménem a hodnotou z GitHubu, dokonči ověření tlačítkem **Verify** a záznam ponech v zóně. [Ověření domény](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
3. Po nahrání souborů vyber v repozitáři **Settings → Pages → Deploy from a branch**, větev **main** a složku **/docs**. Před změnou webových záznamů v DNS ověř v poli **Custom domain** hodnotu **sachypolabi.cz**. Soubor [docs/CNAME](docs/CNAME) obsahuje stejnou doménu. [Publikování ze složky docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
4. V Azure DNS nahraď sadu A na kořeni zóny a nastav explicitní www podle tabulky. Před odstraněním původního zástupného CNAME na Webnode zkontroluj v portálu explicitní záznam klub pro EOS. MX a dosavadní TXT ponech v zóně. [Nastavení vlastní domény](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
5. Po vystavení certifikátu zapni **Enforce HTTPS**. Ověř úvod, starý odkaz na článek, přesměrování www a otevření klubové platformy. GitHub uvádí, že propagace DNS a zpřístupnění volby HTTPS mohou trvat až 24 hodin. [HTTPS na GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

| Jméno v zóně sachypolabi.cz | Typ | Cílová hodnota |
| --- | --- | --- |
| @ | A | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 |
| www | CNAME | sachypolabi.github.io. pro klubovou organizaci, technomaton.github.io. pro Technomaton, případně jméno vybraného vlastníka následované .github.io. |
| klub | CNAME | gw.eosclub.zone. (současný cíl členské platformy) |

Tarif Webnode již vypršel. Registrace domény má vlastní datum obnovy. Podle CZ.NIC je k 26. 11. 2026 doména u registrátora Gransy registrovaná do 12. 10. 2027. [Registr CZ.NIC](https://rdap.nic.cz/domain/sachypolabi.cz)
