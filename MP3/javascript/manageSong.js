const mapDaySong = new Map([
	//[giorno, {titolo: titolo, frase:frase}]
	[27, new Map([
			["titolo","Un senso"],
			["autore", "Vasco Rossi"],
			["frase", "anche se questa vita, un senso non ce l'ha"],
			["foto", "../img/27.jpg"]
		 ])
	],
	["20", new Map([
			["titolo","Quel filo che ci unisce"],
			["autore", "Ultimo"],
			["frase", "Ma tu, tu sei diversa perché sei sbagliata <br> Ma non per me che credo in chi non vien creduta <br> Tu sei come un bicchiere fatto di cristallo <br> Al bordo di una tavola e temi l'impatto"],
			["foto", "../img/foto... .jpg"]
		])
	],

	["21", new Map([
			["titolo","Lieto fine"],
			["autore", "Carl Brave"],
			["frase", "Il rosso ti dona, la tua vita nuova <br> Cercavo una rogna e mi sei cascata sopra"],
			["foto", "../img/foto... .jpg"]
		 ])
	],
	["22", new Map([
			["titolo","Red Light"],
			["autore", "Tedua"],
			["frase", "Ritorno al tramonto, capisco che in fondo <br> Io e te siamo nella stessa direzione, ma lontani"],
			["foto", "../img/foto... .jpg"]
		])
	],
	["23", new Map([
		["titolo","Un Altro Mondo"],
		["autore", "Merk & Kremont, Tananai, Marracash"],
		["frase", "Baby, lascia chi ti lascia <br> Smetti di cercare un senso <br> Salpa assieme a me verso un altro universo"],
		["foto", "../img/foto... .jpg"]
	 ])
	],
	["24", new Map([
		["titolo","Bellissimissima <3"],
		["autore", "Alfa"],
		["frase", "Dimmi, dimmi cosa che importa, che diventiamo <br> Godiamoci il momento, anche se è un po' strano <br> Passiamo giorni a letto, poi lo sappiamo <br> Che poi finirà così "],
		["foto", "../img/foto... .jpg"]
	])
	],
	["25", new Map([
		["titolo","Cosa Resterà"],
		["autore", "Irama"],
		["frase", "Volevo nascere senza pensieri <br> Senza le crisi di panico quando penso troppo <br> Volevo correre più forte degli altri <br> Come per dimostrarmi che potrei farlo il doppio"],
		["foto", "../img/foto... .jpg"]
	])
	],
	["26", new Map([
		["titolo","Scudo"],
		["autore", "Gio Evan"],
		["frase", "Futuro non è leggere le mani <br> Il futuro è saperle stringere forte"],
		["foto", "../img/foto... .jpg"]
	])
	],
	["27", new Map([
			["titolo","Ci pensiamo domani"],
			["autore", "Angelina Mango"],
			["frase", "E quando ti sveglio e mi guardi così <br> A me basta tutto questo <br> Mi basta restare in silenzio <br> E non ho più voglia di andarmene via, mmh"],
			["foto", "../img/foto... .jpg"]
	])
	],
	["28", new Map([
			["titolo","Non Litighiamo Più"],
			["autore", "Rocco Hunt"],
			["frase", "Tu non ti accorgi quanto bene che mi fai <br> Ho cancellato il nome di quell'altro con lo spray <br> Stasera berrei nei posti più strani <br> Finché non compari sopra il mio display"],
			["foto", "../img/foto... .jpg"]
	])
	],
	["29", new Map([
			["titolo","5 MINUTI"],
			["autore", "Alfa"],
			["frase", "Parliamo nei sogni miei <br> Lasciatemi sognare in pace <br>	Ancora cinque minuti in più"],
			["foto", "../img/foto... .jpg"]
	])
	],
	["30", new Map([
			["titolo","Spazio Tempo"],
			["autore", "Francesco Gabbani"],
			["frase", "..."],
			["foto", "../img/foto... .jpg"]
	])
	],
	["31", new Map([
			["titolo","Sul finale"],
			["autore", "Ultimo"],
			["frase", "..."],
			["foto", "../img/foto... .jpg"]
	])
	],
	["1", new Map([
			["titolo","Vorrei proteggerti dal mondo"],
			["autore", "Michele Merlo"],
			["frase", "..."],
			["foto", "../img/foto... .jpg"]
	])
	],
	["2", new Map([
			["titolo","DOMANI TORNO"],
			["autore", "AIELLO"],
			["frase", "..."],
			["foto", "../img/foto... .jpg"]
	])
	]
]);

function loadSong(){
	//=================== SELEZIONO LA CANZONE DEL GIORNO CORRENTE =======================
	var currentDate = new Date();
	var day= currentDate.getDate();
	var audio = document.getElementById("daMod"); 
	audio.src = "../song/"+day+".mp3";
	audio.parentNode.load();

	//=================== INSERISCO IL TITOLO E L'AUTORE NELL'APPOSITO SPAZIO =======================
	const titoloCanzone = document.getElementById('titolo-canzone');
	titoloCanzone.innerHTML = mapDaySong.get(day).get("titolo");
	const autoreCanzone = document.getElementById('autore-canzone'); 
	autoreCanzone.innerHTML = mapDaySong.get(day).get("autore");

	//=================== SELEZIONO LA FOTO DEL GIORNO CORRENTE =======================
	var foto = document.getElementById("fotoDaMod"); 
	foto.src = "../img/"+day+".jpeg";

}

