# Paws Without Borders – sito web

Il sito è pubblicato con **Vercel**, i file stanno su **GitHub** e i contenuti si aggiornano dal pannello **Pages CMS** (gratuito, accesso con l'account GitHub).

## Cosa c'è nella cartella

| File / cartella | A cosa serve |
|---|---|
| `index.html` | Il sito (5 lingue, animazioni, calcolatore donazioni) |
| `content/missioni/` | Un file per ogni gatto in attesa, con il suo GoFundMe |
| `content/viaggi/` | Un file per ogni viaggio completato |
| `content/costi.json` | Prezzi delle spese |
| `content/sito.json` | Nome dell'account Instagram |
| `public/images/` | Le foto caricate dal pannello |
| `.pages.yml` | Configurazione del pannello di gestione |
| `build.mjs`, `vercel.json` | Istruzioni per Vercel (non serve toccarli) |

## Messa online (una volta sola)

1. **GitHub**: crea un nuovo repository (es. `paws-without-borders`), poi "Add file → Upload files" e trascina **tutto il contenuto** di questa cartella, compresi i file che iniziano con il punto (`.pages.yml`, `.gitignore`). Premi "Commit changes".
   - Su Mac i file con il punto sono nascosti: nel Finder premi `Cmd + Shift + .` per vederli.
2. **Vercel**: "Add New → Project", scegli il repository e premi "Deploy". Le impostazioni vengono lette da `vercel.json`.
3. **Dominio**: in Vercel apri il progetto → Settings → Domains → aggiungi il tuo dominio e copia nel pannello del registrar i valori DNS che Vercel ti mostra. L'https si attiva da solo.
4. **Pannello**: vai su https://app.pagescms.org, accedi con GitHub, autorizza l'accesso al repository e aprilo.

## Uso quotidiano del pannello

- **Gatti in attesa** → "Add entry": nome, stato, foto, storia, link GoFundMe, obiettivo, raccolti. Salva.
- Quando un gatto arriva: cambia lo stato in "Arrivato a casa" e aggiungi il viaggio in **Viaggi completati** con data e fino a 4 foto.
- **Prezzi delle spese**: inserisci i costi; il totale e il calcolatore donazioni si aggiornano da soli.
- **Impostazioni del sito**: il nome dell'account Instagram (collega i pulsanti al profilo).
- Per nascondere una scheda senza cancellarla, togli la spunta "Mostra sul sito".

Ogni salvataggio aggiorna GitHub e Vercel ripubblica il sito in circa 30–60 secondi.
