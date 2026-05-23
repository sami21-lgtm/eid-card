// আপনার বর্তমান ডাউনলোডের নাম অনুযায়ী অবজেক্ট সেট করা হলো
const animalData = {
    sheep: {
        audioFile: "voice_preview_sheep.mp3 (1).mp3"
    },
    camel: {
        audioFile: "voice_preview_camel.mp3 (3).mp3"
    },
    cow: {
        audioFile: "voice_preview_cow.mp3 (2).mp3"
    }
};

let currentAnimalAudio = null;
const bgMusic = document.getElementById('bgMusic');

function startExperience() {
    const overlay = document.getElementById('welcomeOverlay');
    overlay.style.opacity = 0;
    setTimeout(() => { overlay.style.display = 'none'; }, 500);

    const card = document.getElementById('mainCard');
    card.classList.add('reveal');

    bgMusic.muted = false;
    bgMusic.volume = 0.3;
    bgMusic.play().catch(error => { console.log("Audio play blocked: ", error); });
}

function interact(animalType, elementClass, event) {
    event.stopPropagation();

    const element = document.querySelector('.' + elementClass);
    if (!element) return;

    // এনিমেশন রিসেট এবং স্টার্ট
    element.classList.remove('jump-anim', 'sway-anim', 'shake-anim');
    void element.offsetWidth; 

    if (animalType === 'sheep') {
        element.classList.add('jump-anim');
    } else if (animalType === 'camel') {
        element.classList.add('sway-anim');
    } else if (animalType === 'cow') {
        element.classList.add('shake-anim');
    }

    // আগের কোনো পশুর ভয়েস বন্ধ করা
    if (currentAnimalAudio) {
        currentAnimalAudio.pause();
        currentAnimalAudio.currentTime = 0;
    }

    bgMusic.volume = 0.08;

    // অডিও প্লে
    currentAnimalAudio = new Audio(animalData[animalType].audioFile);
    currentAnimalAudio.volume = 1.0;
    
    currentAnimalAudio.play().catch(error => { 
        console.log("Audio play blocked or failed: ", error); 
    });

    currentAnimalAudio.onended = () => { 
        bgMusic.volume = 0.3; 
    };
}
