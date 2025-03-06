f1="questionario.csv"
f2="risfin.csv"
def calcola(f1,f2):
	dizvoti={}
	with open(f1) as f:
		valori = f.readlines()
		for linea in valori[1:]:
			linea=linea.strip().split(",")
			matricola = linea[-1]
			rispcorr = int(linea[-4])
			risperr = int(linea[-3])
			punteggio = rispcorr - (risperr/2)
			if punteggio >= 6:
				dizvoti[matricola] = punteggio
	print((list(dizvoti.keys())))

		

calcola(f1,f2)