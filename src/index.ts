class Birra {
    id: number;
    nome: string;
    prezzo: number;
    tot: number;

    constructor(id: number, nome: string, prezzo: number, tot: number = 0) {
        this.id = id;
        this.nome = nome;
        this.prezzo = prezzo;
        this.tot = tot;
    }
}

class Ordine {
    id: number;
    birraId: number;
    stato: "ordinata" | "servita";

    constructor(id: number, birraId: number, stato: "ordinata" | "servita") {
        this.id = id;
        this.birraId = birraId;
        this.stato = stato;
    }
}

let Ordini: Ordine[] = [];
let nuovoIdOrdine: number = 0;
let cassa: number = 100.00;

let menu: Birra[] = [
    new Birra(0, "Peroni", 4.00),
    new Birra(1, "Ceres", 4.00),
    new Birra(2, "Heineken", 3.50),
    new Birra(3, "Corona", 4.00),
    new Birra(4, "Ichnusa", 4.50)
];

mostraMenu(menu);
aggiornaCassa();

function mostraMenu(menu: Birra[]) {
    const elenco = document.getElementById("listaBirre");

    if (elenco) {
        elenco.innerHTML = "";

        for (const birra of menu) {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-start";
            li.innerHTML = `
                <div class="ms-2 me-auto">
                    <div class="fw-bold">
                        ${birra.nome}
                        <span class="badge text-bg-primary rounded-pill mx-3">${birra.tot}</span>
                    </div>
                    Birra alla spina
                </div>`;

            
            const btnAggiungi = document.createElement("button");
            btnAggiungi.type = "button";
            btnAggiungi.className = "btn";
            btnAggiungi.innerHTML = '<i class="bi bi-plus-circle h3"></i>';
            btnAggiungi.onclick = () => nuovoOrdineBirra(birra);

            
            const btnServita = document.createElement("button");
            btnServita.type = "button";
            btnServita.className = "btn";
            btnServita.innerHTML = '<i class="bi bi-x-circle h3"></i>';
            btnServita.onclick = () => ordineCompletato(birra);

            li.appendChild(btnAggiungi);
            li.appendChild(btnServita);
            elenco.appendChild(li);
        }
    }
}

function nuovoOrdineBirra(birra: Birra) {
    if (birra) {
        const nuovoOrdine: Ordine = {
            id: nuovoIdOrdine++,
            birraId: birra.id,
            stato: "ordinata",
        };

        Ordini.push(nuovoOrdine);
        cassa += birra.prezzo; 
        birra.tot += 1; 

        mostraMenu(menu);
        aggiornaCassa(); 
    }
}

function ordineCompletato(birra: Birra) {
    const ordineServito = Ordini.find(ordine => ordine.birraId === birra.id && ordine.stato === "ordinata");

    if (ordineServito) {
        ordineServito.stato = "servita"; 
        cassa -= birra.prezzo; 
        birra.tot -= 1; 
        mostraMenu(menu);
        aggiornaCassa(); 
    } else {
        console.log(`Nessun ordine trovato per la birra ${birra.nome} da servire.`);
    }
}

function aggiornaCassa() {
    const importoCassa = document.getElementById("importoCassa");
    if (importoCassa) {
        importoCassa.innerText = `$${cassa.toFixed(2)}`; 
    }
}
