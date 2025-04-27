const reasons = [
	"Mi hai dato la forza di credere di nuovo nelle relazioni vere",
	"La luce nei tuoi occhi è stata qualcosa di travolgente, un fulmine a ciel sereno",
	"Il tuo sorriso riesce a scaldarmi il cuore",
	"Sei imbranata",
	"Sei la persona più premurosa che abbia nella mia vita",
	"Sei in grado di ascoltare",
	"Sai capirmi",
	"Hai il coraggio di provare cose nuove",
	"Hai la mia stessa passione per i viaggi",
	"Con te non ho paura ad aprirmi",
	"Crei dei pensierini pazzeschi",
	"Ogni giorno, nel bene o nel male, è una novità",
	"Il tuo entusiasmo è contagioso",
	"Non hai paura a mostrare la bambina che hai dentro",
	"Sei sempre in grado di stupirmi",
	"Ti lascia andare con me",
	"Mi hai aiutato a dare un valore estremo alle piccole cose",
	"Sono tornato ad apprezzare il Natale",
	"Mi riesco ad immaginare un futuro con te",
	"Sei riuscita a farmi voler bene ad un gatto",
	"Mi sproni a dare il meglio di me",
	
  ];
  

  function showReason() {
	const reasonDiv = document.getElementById('reason');
	const image = document.getElementById('image');
  
	// Scegli frase casuale
	const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
  
	// Scegli immagine casuale (da 1 a 40)
	const randomImageNumber = Math.floor(Math.random() * 26) + 1;
	const randomImagePath = `images/img${randomImageNumber}.jpg`;
  
	// Aggiorna testo
	reasonDiv.style.animation = 'none';
	void reasonDiv.offsetWidth;
	reasonDiv.style.animation = 'typing 2s steps(30, end) forwards';
	reasonDiv.style.opacity = 1;
	reasonDiv.textContent = randomReason;
  
	// Aggiorna immagine
	image.style.opacity = 0;
	setTimeout(() => {
	  image.src = randomImagePath;
	  image.style.display = 'block';
	  image.style.opacity = 1;
	}, 500);
  
	createHeart();
  }
  
  function createHeart() {
	const heart = document.createElement('div');
	heart.className = 'heart';
	heart.style.left = Math.random() * 100 + 'vw';
	heart.style.top = '90%';
	heart.textContent = '❤️';
	document.getElementById('hearts-container').appendChild(heart);
  
	setTimeout(() => {
	  heart.remove();
	}, 4000); // Rimuove il cuore dopo l'animazione
  }
  