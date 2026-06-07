// ==========================
// ELEMENTS
// ==========================

const passwordScreen =
document.getElementById("password-screen");

const loadingScreen =
document.getElementById("loading-screen");

const birthdayCardScreen =
document.getElementById("birthday-card-screen");

const letterSection =
document.getElementById("letter-section");

const gallerySection =
document.getElementById("gallery-section");

const cakeSection =
document.getElementById("cake-section");

const finalSection =
document.getElementById("final-section");

const display =
document.getElementById("password-display");

const music =
document.getElementById("birthday-music");

const flame =
document.getElementById("flame");

const typedMessage =
document.getElementById("typed-message");

const openLetterBtn =
document.getElementById("open-letter-btn");

const nextGalleryBtn =
document.getElementById("next-gallery");

const toCakeBtn =
document.getElementById("to-cake");

const blowBtn =
document.getElementById("blow-btn");

const celebrateBtn =
document.getElementById("celebrate-btn");

const submitBtn =
document.getElementById("submit-btn");

const clearBtn =
document.getElementById("clear-btn");

const numBtns =
document.querySelectorAll(".num-btn");

let enteredPassword = "";

const CORRECT_PASSWORD = "2009";


// ==========================
// PASSWORD INPUT
// ==========================

numBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        if(enteredPassword.length >= 4)
        return;

        enteredPassword +=
        btn.innerText;

        display.innerText =
        "*".repeat(
            enteredPassword.length
        );

    });

});


// ==========================
// CLEAR
// ==========================

clearBtn.addEventListener("click",()=>{

    enteredPassword="";

    display.innerText="----";

});


// ==========================
// SUBMIT
// ==========================

submitBtn.addEventListener("click",()=>{

    if(
        enteredPassword ===
        CORRECT_PASSWORD
    ){

        startLoading();

    }else{

        wrongPassword();

    }

});


// ==========================
// WRONG PASSWORD
// ==========================

function wrongPassword(){

    gsap.fromTo(
        ".password-box",
        {x:-10},
        {
            x:10,
            duration:.08,
            repeat:5,
            yoyo:true
        }
    );

    display.innerText="Wrong";

    enteredPassword="";

    setTimeout(()=>{

        display.innerText="----";

    },1000);

}


// ==========================
// LOADING
// ==========================

function startLoading(){

    passwordScreen.style.display =
    "none";

    loadingScreen.style.display =
    "flex";

    gsap.to(
        ".loader-fill",
        {
            width:"100%",
            duration:2.5,

            onComplete:()=>{

                loadingScreen.style.display =
                "none";

                birthdayCardScreen.style.display =
                "flex";

                showCard();

            }
        }
    );

}


// ==========================
// SHOW CARD
// ==========================

function showCard(){

    gsap.from(
        ".birthday-card",
        {
            y:80,
            opacity:0,
            duration:1
        }
    );

}


// ==========================
// OPEN LETTER
// ==========================

openLetterBtn.addEventListener(
"click",
()=>{

    const tl =
    gsap.timeline();

    tl.to(
        ".seal",
        {
            scale:0,
            opacity:0,
            duration:.3
        }
    )

    .to(
        ".envelope-flap",
        {
            rotateX:180,
            duration:.8
        }
    )

    .to(
        ".letter-paper",
        {
            y:-100,
            duration:.8
        },
        "-=.5"
    );

    setTimeout(()=>{

        birthdayCardScreen.style.display =
        "none";

        letterSection.style.display =
        "flex";

        showLetter();

    },1400);

});


// ==========================
// LETTER ANIMATION
// ==========================

function showLetter(){

    gsap.from(
        ".letter-box",
        {
            x:-100,
            opacity:0,
            duration:1
        }
    );

    gsap.from(
        ".photo-stack",
        {
            x:100,
            opacity:0,
            duration:1
        }
    );

    startMusic();

    startTyping();

}


// ==========================
// TYPEWRITER
// ==========================

const fullText = `

Happy Birthday ❤️

Thank you for all the
beautiful memories.

You make life brighter,
happier and more special.

May all your dreams come true.

Stay happy.
Stay blessed.

🎂✨🎉

`;

function startTyping(){

    let i = 0;

    typedMessage.innerHTML = "";

    const interval =
    setInterval(()=>{

        typedMessage.innerHTML +=
        fullText.charAt(i);

        i++;

        if(i >= fullText.length){

            clearInterval(interval);

        }

    },35);

}


// ==========================
// LETTER -> GALLERY
// ==========================

nextGalleryBtn.addEventListener(
"click",
()=>{

    letterSection.style.display =
    "none";

    gallerySection.style.display =
    "flex";

    gsap.from(
        ".gallery-item",
        {
            opacity:0,
            y:80,
            stagger:.15,
            duration:.8
        }
    );

});


// ==========================
// GALLERY -> CAKE
// ==========================

toCakeBtn.addEventListener(
"click",
()=>{

    gallerySection.style.display =
    "none";

    cakeSection.style.display =
    "flex";

    gsap.from(
        ".cake",
        {
            scale:0,
            duration:1,
            ease:"back.out(1.8)"
        }
    );

});


// ==========================
// BLOW CANDLE
// ==========================

function launchConfetti(){

    confetti({
        particleCount:250,
        spread:120,
        origin:{ y:0.6 }
    });

}

blowBtn.addEventListener(
"click",
()=>{

    gsap.to(
        "#flame",
        {
            opacity:0,
            scale:0,
            duration:.5
        }
    );

        launchConfetti();

    confetti({
        particleCount:200,
        spread:120
    });

    setTimeout(()=>{

        cakeSection.style.display =
        "none";

        finalSection.style.display =
        "flex";

        gsap.from(
            ".final-box",
            {
                scale:.7,
                opacity:0,
                duration:1
            }
        );

    },1200);

});


// ==========================
// CELEBRATE
// ==========================

celebrateBtn.addEventListener(
"click",
()=>{

    launchBigConfetti();

});


// ==========================
// CONFETTI
// ==========================

function launchBigConfetti(){

    const duration=5000;
    const end=Date.now()+duration;

    const interval=setInterval(()=>{

        if(Date.now()>end){
            clearInterval(interval);
            return;
        }

        confetti({
            particleCount:80,
            spread:150,
            startVelocity:40,
            origin:{
                x:Math.random(),
                y:Math.random()-0.2
            }
        });

    },200);

}


// ==========================
// MUSIC
// ==========================

function startMusic(){

    if(!music) return;

    music.volume = .4;

    music.play()
    .catch(()=>{});

}


// ==========================
// FLOATING ENVELOPE
// ==========================

gsap.to(
    ".envelope-wrapper",
    {
        y:-12,
        repeat:-1,
        yoyo:true,
        duration:2,
        ease:"sine.inOut"
    }
);


// ==========================
// KEYBOARD SUPPORT
// ==========================

document.addEventListener(
"keydown",
(e)=>{

    if(
        /^[0-9]$/.test(e.key)
    ){

        if(
            enteredPassword.length
            >= 4
        ) return;

        enteredPassword += e.key;

        display.innerText =
        "*".repeat(
            enteredPassword.length
        );

    }

    if(
        e.key === "Enter"
    ){

        submitBtn.click();

    }

});