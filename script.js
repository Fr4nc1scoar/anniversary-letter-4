document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica de Vistas (SPA) e HTML5 Audio ---
    const envelopeBtn = document.getElementById('open-envelope-btn');
    const views = document.querySelectorAll('.view');
    const navButtons = document.querySelectorAll('.nav-btn, .back-btn');
    const startOverlay = document.getElementById('click-to-start');
    
    // Seleccionar todos los audios
    const allAudios = {
        'audio-interstellar': document.getElementById('audio-interstellar'),
        'audio-letter': document.getElementById('audio-letter'),
        'audio-story': document.getElementById('audio-story'),
        'audio-reasons': document.getElementById('audio-reasons'),
        'audio-gallery': document.getElementById('audio-gallery')
    };

    // Configurar el segundo exacto donde debe empezar cada canción para saltar las introducciones largas
    const audioStartTimes = {
        'audio-interstellar': 0,    // Desde el inicio
        'audio-letter': 5,          // Río Roma (salta 5 seg)
        'audio-story': 25,          // Humbe (salta 25 seg de intro)
        'audio-reasons': 15,        // Kevin Kaarl (salta 15 seg)
        'audio-gallery': 5          // Río Roma
    };

    let currentAudioId = '';

    function playAudio(audioId) {
        if (currentAudioId === audioId) return;

        // Pausar y reiniciar todos los demás audios
        Object.values(allAudios).forEach(audio => {
            if (audio) {
                audio.pause();
                // No lo reiniciamos a 0 aquí, porque lo ajustamos al reproducir
            }
        });

        // Reproducir el nuevo
        const newAudio = allAudios[audioId];
        if (newAudio) {
            // Adelantar la canción al segundo configurado
            newAudio.currentTime = audioStartTimes[audioId] || 0;
            
            newAudio.play().catch(e => console.log("Error al reproducir audio local:", e));
            currentAudioId = audioId;
        }
    }

    // Click to start overlay logic (Bypasses autoplay)
    if (startOverlay) {
        startOverlay.addEventListener('click', () => {
            startOverlay.classList.add('fade-out');
            playAudio('audio-interstellar');
            
            // Iniciar el efecto de máquina de escribir después de que desaparezca la pantalla
            setTimeout(() => {
                startOverlay.style.display = 'none';
                if (window.typeWriter) {
                    window.typeWriter();
                }
            }, 1000);
        });
    }

    // Al abrir el sobre inicial
    envelopeBtn.addEventListener('click', () => {
        envelopeBtn.classList.add('opening');
        
        // Iniciar la música de Rio Roma (audio-letter)
        playAudio('audio-letter');

        setTimeout(() => {
            switchView('view-letter');
        }, 1500);
    });

    // Navegación entre secciones
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetViewId = e.target.getAttribute('data-target');
            const targetAudioId = e.target.getAttribute('data-audio');
            
            // Cambiar la música
            if (targetAudioId) {
                playAudio(targetAudioId);
            }

            // Cambiar la vista
            switchView(targetViewId);
        });
    });

    function switchView(viewId) {
        // Ocultar todas
        views.forEach(view => {
            view.classList.remove('active-view');
            view.classList.add('hidden-view');
        });

        // Mostrar la deseada
        const targetView = document.getElementById(viewId);
        targetView.classList.remove('hidden-view');
        targetView.classList.add('active-view');
        
        // Scroll top
        targetView.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- Corazones Flotantes Visibles ---
    // Iniciamos la animación inmediatamente para que se vea en el sobre
    createHearts();

    function createHearts() {
        const container = document.getElementById('hearts-container');
        
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            // Aleatoriamente escogemos entre corazones rojos y dorados
            heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💖';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
            heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            
            container.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 20000);
        }, 600); // Frecuencia de corazones más alta para que se vea más lleno y decorado
    }

    // --- Llenar las 40 Razones Dinámicamente ---
    const reasons = [
        "Porque tienes la sonrisa más hermosa del universo.",
        "Por la forma en la que me miras y me haces sentir.",
        "Por ser mi apoyo incondicional en todo momento.",
        "Porque haces que cada día sea una aventura maravillosa.",
        "Por nuestro primer beso mágico en el Fortín de La Caranta.",
        "Por esa primera cita comiendo tetas donde se te cayó el helado asjas.",
        "Porque desde el primer mensaje en Facebook supe que eras especial.",
        "Por tu risa, que me encantaría ver en tu cara todos los días.",
        "Por tu pelo, que me encanta acariciar y oler.",
        "Por tu olor tan único que me da paz.",
        "Por tus ojos, donde veo reflejado nuestro futuro.",
        "Por tu calor, que me abriga en los días fríos.",
        "Por lo mucho que amo abrazarte fuerte.",
        "Porque dormir contigo es mi momento favorito del día.",
        "Porque despertar a tu lado es un sueño hecho realidad.",
        "Por lo mucho que has madurado y crecido en estos 4 años.",
        "Porque me siento sumamente orgulloso de la mujer que eres.",
        "Por la increíble mujer en la que sé que te convertirás.",
        "Porque a pesar de ser distintos, encajamos a la perfección.",
        "Por todas las risas que compartimos desde el primer día.",
        "Por lo tierna que te viste escondiéndote en mi pecho tras nuestro primer beso.",
        "Porque superamos juntos los días duros y eso nos fortaleció aún más.",
        "Porque me motivas a intentarlo todos los días.",
        "Porque si algo no funciona, por ti hago que funcione.",
        "Porque eres definitivamente el amor de mi vida.",
        "Por lo cómodo que me siento hablando de cualquier cosa contigo.",
        "Porque la conexión que tuvimos fue inmediata y real.",
        "Por aguantarme a pesar de ser fastidioso mi amor jasjhda.",
        "Porque valoro todo el cariño que me das, a tu manera hermosa.",
        "Porque sé perfectamente que me amas tanto como yo a ti.",
        "Porque quiero que seamos felices juntos por el resto de la vida.",
        "Por la paciencia que nos tenemos para mejorar donde fallamos.",
        "Porque a tu lado puedo ser yo mismo sin miedo a nada.",
        "Porque cada momento a tu lado es único e irrepetible.",
        "Por hacerme el hombre más feliz del mundo en estos 4 años.",
        "Por enseñarme el verdadero significado de amar inmensamente.",
        "Porque agradezco a Dios todos los días por habernos cruzado.",
        "Porque eres mi lugar seguro y mi refugio favorito.",
        "Porque no imagino una vida si no es caminando de tu mano.",
        "Porque quiero que celebremos 1000 aniversarios más juntos."
    ];

    const reasonsContainer = document.getElementById('reasons-list-container');
    if (reasonsContainer) {
        reasons.forEach((text, index) => {
            const item = document.createElement('div');
            item.className = 'reason-item';
            
            const numSpan = document.createElement('span');
            numSpan.className = 'reason-number dancing-title gold-text';
            numSpan.innerText = index + 1;
            
            const p = document.createElement('p');
            p.innerText = text;
            
            item.appendChild(numSpan);
            item.appendChild(p);
            reasonsContainer.appendChild(item);
        });
    }

    // --- Efecto de máquina de escribir para el texto introductorio ---
    const introElement = document.getElementById('intro-text-element');
    if (introElement) {
        const fullText = introElement.innerText;
        introElement.innerText = ''; // Limpiar inicialmente
        let indexText = 0;
        
        function typeWriter() {
            if (indexText < fullText.length) {
                introElement.innerHTML += fullText.charAt(indexText);
                indexText++;
                setTimeout(typeWriter, 40); // Velocidad de escritura
            }
        }
        
        // Lo exponemos al window para llamarlo desde el overlay
        window.typeWriter = typeWriter;
    }

    // --- Llenar la Galería Dinámicamente ---
    const galleryItems = [
        { type: 'image', src: 'gal_1.jpeg', caption: 'Tú, yo y esta magia innegable ✨' },
        { type: 'image', src: 'gal_2.jpeg', caption: 'La mejor parte de mi día eres tú 🥰' },
        { type: 'image', src: 'gal_3.jpeg', caption: 'Ese instante donde el ruido desaparece 🤍' },
        { type: 'image', src: 'gal_4.jpeg', caption: 'Mi lugar seguro y mi mayor aventura 🚀' },
        { type: 'image', src: 'gal_5.jpeg', caption: 'Tus ojitos que me vuelven loco 😍' },
        { type: 'image', src: 'gal_6.jpeg', caption: 'Cada risa contigo me da mil años de vida 🦋' },
        { type: 'image', src: 'gal_7.jpeg', caption: 'Un equipo a prueba de todo 💪🏼' },
        { type: 'image', src: 'gal_8.jpeg', caption: 'La casualidad más hermosa de mi vida 💫' },
        { type: 'image', src: 'gal_9.jpeg', caption: 'Haces que mi mundo se vea más bonito 🌎' },
        { type: 'image', src: 'gal_10.jpeg', caption: 'Amo cada versión de ti ❤️' },
        { type: 'image', src: 'gal_11.jpeg', caption: 'Mis días son mejores desde que llegaste 🌅' },
        { type: 'image', src: 'gal_12.jpeg', caption: 'Contigo todo es tan fácil y lindo 🍷' },
        { type: 'image', src: 'gal_13.jpeg', caption: 'Tu calor es mi hogar 🫂' },
        { type: 'image', src: 'gal_14.jpeg', caption: 'Mi princesa, hoy y siempre 👑' },
        { type: 'image', src: 'gal_15.jpeg', caption: 'Guardando recuerdos para toda la vida 📸' },
        { type: 'image', src: 'gal_16.jpeg', caption: 'Me haces sentir el hombre más afortunado 🍀' },
        { type: 'video', src: 'gal_video.mp4', caption: 'Tus gestos que me enamoran cada día más 🎥' }
    ];

    const galleryContainer = document.getElementById('gallery-grid-container');
    if (galleryContainer) {
        galleryItems.forEach(item => {
            const frame = document.createElement('div');
            frame.className = 'photo-frame';
            
            if (item.type === 'image') {
                const img = document.createElement('img');
                img.src = `assets/gallery/${item.src}`;
                img.alt = item.caption;
                frame.appendChild(img);
            } else if (item.type === 'video') {
                const video = document.createElement('video');
                video.src = `assets/gallery/${item.src}`;
                video.controls = true;
                video.muted = false;
                video.style.width = "100%";
                video.style.height = "auto";
                video.style.borderRadius = "5px";
                video.style.border = "1px solid var(--gold)";
                frame.appendChild(video);
            }

            const caption = document.createElement('p');
            caption.className = 'photo-caption dancing-title';
            caption.innerText = item.caption;
            
            frame.appendChild(caption);
            galleryContainer.appendChild(frame);
        });
    }

});
