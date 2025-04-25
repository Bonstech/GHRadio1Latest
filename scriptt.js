document.addEventListener('DOMContentLoaded', function() {
    const mediaPlayer = document.getElementById('media-player');
    const audioPlayer = document.getElementById('radio-player');
    const button = document.getElementById('show-player');
    
    // Initialize with play button visible and player hidden
    mediaPlayer.style.display = 'none';
    button.innerText = '▶';
    
    // Check localStorage for previous state
    const wasPlaying = localStorage.getItem('isPlaying') === 'true';
    
    // If was playing, start playing automatically
    if (wasPlaying) {
        mediaPlayer.style.display = 'block';
        audioPlayer.play().catch(e => {
            console.error("Autoplay was prevented:", e);
            // If autoplay fails, reset to default state
            mediaPlayer.style.display = 'none';
            button.innerText = '▶';
            localStorage.setItem('isPlaying', 'false');
        });
        button.innerText = '❚❚';
    }

    button.addEventListener('click', function() {
        // Toggle media player visibility
        if (mediaPlayer.style.display === 'block') {
            mediaPlayer.style.display = 'none';
            audioPlayer.pause();
            localStorage.setItem('isPlaying', 'false');
            button.innerText = '▶';
        } else {
            mediaPlayer.style.display = 'block';
            audioPlayer.play().catch(e => {
                console.error("Playback failed:", e);
                mediaPlayer.style.display = 'none';
                button.innerText = '▶';
                localStorage.setItem('isPlaying', 'false');
            });
            localStorage.setItem('isPlaying', 'true');
            button.innerText = '❚❚';
        }
    });

    // Display the current schedule
    displayCurrentSchedule();

    // Set up interval to update schedule every minute
    setInterval(displayCurrentSchedule, 60000);

    // Set up skip forward/backward buttons
    document.getElementById('skip-forward').addEventListener('click', function() {
        audioPlayer.currentTime += 15; 
    });

    document.getElementById('skip-backward').addEventListener('click', function() {
        audioPlayer.currentTime -= 15; 
    });

    // Set up share button
    document.getElementById('share-button').addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'GHRadio1',
                text: 'Listen to GHRadio1 live streaming',
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareUrl = window.location.href;
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert('Link copied to clipboard!');
            }).catch(() => {
                prompt('Copy this link:', shareUrl);
            });
        }
    });
});

function displayCurrentSchedule() {
    const currentTime = new Date();
    const currentDay = currentTime.getDay(); 
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Define the schedules with program details, host, and image
    const schedules = {
        1: [ // Monday
            { 
                start: { hour: 0, minute: 0 }, end: { hour: 2, minute: 0 }, 
                program: "WEEKEND PARTY MIX", 
                host: "GHRadio1",
                time: "9 PM to 2 AM",
                image: "ghlogo.png"
            },
            { 
                start: { hour: 2, minute: 0 }, end: { hour: 6, minute: 0 }, 
                program: "HIGH LIFE AGOOGO", 
                host: "GHRadio1",
                time: "2:00 AM to 6:00 AM",
                image: "GHRadiologo.png"
            },
            { 
                start: { hour: 6, minute: 0 }, end: { hour: 10, minute: 0 }, 
                program: "GYE ME TAATAA", 
                host: "PASTOR GIDEON",
                time: "6 AM to 10 AM",
                image: "GYE ME TAATAA.jpg"
            },
            { 
                start: { hour: 10, minute: 0 }, end: { hour: 14, minute: 0 }, 
                program: "WAKE UP GHANA", 
                host: "DJ WAS DOING",
                time: "10 AM to 2 PM",
                image: "WAKE UP GHANA.jpg"
            },
            { 
                start: { hour: 13, minute: 30 }, end: { hour: 15, minute: 0 }, 
                program: "GIRLS KASA", 
                host: "MAAME FOSUAH or MAAME AMA",
                time: "1:30 PM to 3 PM",
                image: "GIRLS KASA.jpg"
            },
            { 
                start: { hour: 15, minute: 0 }, end: { hour: 18, minute: 0 }, 
                program: "DONKOMI", 
                host: "DECENT DJ",
                time: "3 PM to 6 PM",
                image: "DONKOMI.jpg"
            },
            { 
                start: { hour: 18, minute: 0 }, end: { hour: 22, minute: 0 }, 
                program: "HAPPY HOUR", 
                host: "KINSOLO DJ",
                time: "6 PM to 10 PM",
                image: "HAPPY HOUR.jpg"
            },
            { 
                start: { hour: 22, minute: 0 }, end: { hour: 23, minute: 59 }, 
                program: "WO NIM NWOM[Request Show]", 
                host: "MR. POSSIBLE or QUOO FANTE",
                time: "10 PM to 2 AM",
                image: "WO NIM NWOM.jpg"
            },
        ],

        2: [ // Tuesday
            { 
                start: { hour: 0, minute: 0 }, end: { hour: 2, minute: 0 }, 
                program: "WO NIM NWOM[Request Show]", 
                host: "MR. POSSIBLE or QUOO FANTE",
                time: "10 PM to 2 AM",
                image: "WO NIM NWOM.jpg"
            },
            { 
                start: { hour: 2, minute: 0 }, end: { hour: 6, minute: 0 }, 
                program: "HIGH LIFE AGOOGO", 
                host: "GHRadio1",
                time: "2:00 AM to 6:00 AM",
                image: "ghlogo.png"
            },
            { 
                start: { hour: 6, minute: 0 }, end: { hour: 10, minute: 0 }, 
                program: "GYE ME TAATAA", 
                host: "PASTOR GIDEON",
                time: "6 AM to 10 AM",
                image: "GYE ME TAATAA.jpg"
            },
            { 
                start: { hour: 10, minute: 0 }, end: { hour: 14, minute: 0 }, 
                program: "WAKE UP GHANA", 
                host: "DJ WAS DOING",
                time: "10 AM to 2 PM",
                image: "WAKE UP GHANA.jpg"
            },
            { 
                start: { hour: 14, minute: 0 }, end: { hour: 18, minute: 0 }, 
                program: "DONKOMI", 
                host: "DECENT DJ",
                time: "2 PM to 6 PM",
                image: "DONKOMI.jpg"
            },
            { 
                start: { hour: 18, minute: 0 }, end: { hour: 22, minute: 0 }, 
                program: "HAPPY HOUR",
                host: "MR. POSSIBLE", 
                time: "6 PM to 10 PM",
                image: "HAPPY HOUR.jpg"
            },
            { 
                start: { hour: 22, minute: 0 }, end: { hour: 23, minute: 59 }, 
                program: "REAL MUSIC POWER", 
                host: "GHRadio1",
                time: "10 PM to 2 AM",
                image: "watermark.jpg"
            },
        ],

        3: [ // Wednesday
            { 
                start: { hour: 0, minute: 0 }, end: { hour: 2, minute: 0 }, 
                program: "REAL MUSIC POWER", 
                host: "GHRadio1",
                time: "10 PM to 2 AM",
                image: "watermark.jpg"
            },
            { 
                start: { hour: 2, minute: 0 }, end: { hour: 6, minute: 0 }, 
                program: "HIGH LIFE AGOOGO", 
                host: "GHRadio1",
                time: "2:00 AM to 6:00 AM",
                image: "ghlogo.png"
            },
            { 
                start: { hour: 6, minute: 0 }, end: { hour: 10, minute: 0 }, 
                program: "GYE ME TAATAA", 
                host: "PASTOR GIDEON",
                time: "6 AM to 10 AM",
                image: "GYE ME TAATAA.jpg"
            },
            { 
                start: { hour: 10, minute: 0 }, end: { hour: 14, minute: 0 }, 
                program: "WAKE UP GHANA", 
                host: "DJ WAS DOING",
                time: "10 AM to 2 PM",
                image: "WAKE UP GHANA.jpg"
            },
            { 
                start: { hour: 13, minute: 30 }, end: { hour: 15, minute: 0 }, 
                program: "GIRLS KASA", 
                host: "MAAME FOSUAH or MAAME AMA",
                time: "1:30 PM to 3 PM",
                image: "GIRLS KASA.jpg"
            },
            { 
                start: { hour: 15, minute: 0 }, end: { hour: 18, minute: 0 }, 
                program: "DONKOMI", 
                host: "DECENT DJ",
                time: "3 PM to 6 PM",
                image: "DONKOMI.jpg"
            },
            { 
                start: { hour: 18, minute: 0 }, end: { hour: 22, minute: 0 }, 
                program: "HAPPY HOUR", 
                host: "MR. POSSIBLE",
                time: "6 PM to 10 PM",
                image: "HAPPY HOUR.jpg"
            },
            { 
                start: { hour: 22, minute: 0 }, end: { hour: 23, minute: 59 }, 
                program: "REAL MUSIC POWER",
                host: "GHRadio1", 
                time: "10 PM to 2 AM",
                image: "watermark.jpg"
            },
        ],
        4: [ // Thursday
            { 
                start: { hour: 0, minute: 0 }, end: { hour: 2, minute: 0 }, 
                program: "REAL MUSIC POWER",
                host: "GHRadio1", 
                time: "10 PM to 2 AM",
                image: "watermark.jpg"
            },
            
            { 
                start: { hour: 2, minute: 0 }, end: { hour: 6, minute: 0 }, 
                program: "HIGH LIFE AGOOGO", 
                host: "GHRadio1",
                time: "2:00 AM to 6:00 AM",
                image: "ghlogo.png"
            },
            { 
                start: { hour: 6, minute: 0 }, end: { hour: 10, minute: 0 }, 
                program: "GYE ME TAATAA", 
                host: "PASTOR GIDEON",
                time: "6 AM to 10 AM",
                image: "GYE ME TAATAA.jpg"
            },
            { 
                start: { hour: 10, minute: 0 }, end: { hour: 14, minute: 0 }, 
                program: "WAKE UP GHANA", 
                host: "DJ WAS DOING",
                time: "10 AM to 2 PM",
                image: "WAKE UP GHANA.jpg"
            },
            { 
                start: { hour: 14, minute: 0 }, end: { hour: 18, minute: 0 }, 
                program: "DONKOMI", 
                host: "DECENT DJ",
                time: "2 PM to 6 PM",
                image: "DONKOMI.jpg"
            },
            { 
                start: { hour: 18, minute: 0 }, end: { hour: 22, minute: 0 }, 
                program: "HAPPY HOUR", 
                host: "KINSOLO DJ",
                time: "6 PM to 10 PM",
                image: "HAPPY HOUR.jpg"
            },
            { 
                start: { hour: 22, minute: 0 }, end: { hour: 23, minute: 59 }, 
                program: "WO NIM NWOM[Request Show]", 
                host: "MR. POSSIBLE or QUOO FANTE",
                time: "10 PM to 2 AM",
                image: "WO NIM NWOM.jpg"
            },
        ],

        5: [ // Friday
            { 
                start: { hour: 0, minute: 0 }, end: { hour: 2, minute: 0 }, 
                program: "WO NIM NWOM[Request Show]", 
                host: "MR. POSSIBLE or QUOO FANTE",
                time: "10 PM to 2 AM",
                image: "WO NIM NWOM.jpg"
            },
            { 
                start: { hour: 2, minute: 0 }, end: { hour: 6, minute: 0 }, 
                program: "HIGH LIFE AGOOGO", 
                host: "GHRadio1",
                time: "2:00 AM to 6:00 AM",
                image: "ghlogo.png"
            },
            { 
                start: { hour: 6, minute: 0 }, end: { hour: 10, minute: 0 }, 
                program: "GYE ME TAATAA", 
                host: "PASTOR GIDEON",
                time: "6 AM to 10 AM",
                image: "GYE ME TAATAA.jpg"
            },
            { 
                start: { hour: 10, minute: 0 }, end: { hour: 14, minute: 0 }, 
                program: "WAKE UP GHANA", 
                host: "DJ WAS DOING",
                time: "10 AM to 2 PM",
                image: "WAKE UP GHANA.jpg"
            },
            { 
                start: { hour: 13, minute: 0 }, end: { hour: 15, minute: 0 }, 
                program: "GIRLS KASA[18+]", 
                host: "MAAME FOSUAH or MAAME AMA",
                time: "1 PM to 3 PM",
                image: "GIRLS KASA.jpg"
            },
            { 
                start: { hour: 15, minute: 0 }, end: { hour: 18, minute: 0 }, 
                program: "DONKOMI", 
                host: "DJ WAS DOING & AKOSUA TASTY",
                time: "3 PM to 6 PM",
                image: "DONKOMI.jpg"
            },
            { 
                start: { hour: 18, minute: 0 }, end: { hour: 22, minute: 0 }, 
                program: "HAPPY HOUR", 
                host: "KINSOLO",
                time: "6 PM to 10 PM",
                image: "HAPPY HOUR.jpg"
            },
            { 
                start: { hour: 22, minute: 0 }, end: { hour: 23, minute: 59 }, 
                program: "REAL MUSIC POWER",
                host: "GHRadio1", 
                time: "10 PM to 12 AM",
                image: "watermark.jpg"
            },
        ],
        6: [ // Saturday
            { 
                start: { hour: 0, minute: 0 }, end: { hour: 6, minute: 59 }, 
                program: "REAL MUSIC POWER",
                host: "GHRadio1", 
                time: "12 AM to 6 AM",
                image: "watermark.jpg"
            },
            { 
                start: { hour: 6, minute: 0 }, end: { hour: 9, minute: 0 }, 
                program: "NSENKU NWOM", 
                host: "DJ SKY GEE",
                time: "6 AM to 9 AM",
                image: "NS3NKU NWOM.jpg"
            },
            { 
                start: { hour: 9, minute: 0 }, end: { hour: 12, minute: 0 }, 
                program: "AHOMA NSIA", 
                host: "GHRadio1",
                time: "9 AM to 12 PM",
                image: "AHOMA NSIA.jpg"
            },
            { 
                start: { hour: 12, minute: 0 }, end: { hour: 17, minute: 0 }, 
                program: "TE AHOMA NO[Request Show]", 
                host: "DJ SUNDAE or KINSOLO DJ",
                time: "12 PM to 5 PM",
                image: "TE AHOMA NO.jpg"
            },
            { 
                start: { hour: 17, minute: 0 }, end: { hour: 20, minute: 0 }, 
                program: "DI ASA", 
                host: "DJ SKY GEE",
                time: "5 PM to 8 PM",
                image: "ghlogo.png"
            },
            { 
                start: { hour: 20, minute: 0 }, end: { hour: 22, minute: 0 }, 
                program: "ABRABO YE NTOBOASIE", 
                host: "AGYENIM BOATENG",
                time: "8 PM to 10 PM",
                image: "ghlogo.png"
            },
            { 
                start: { hour: 22, minute: 0 }, end: { hour: 23, minute: 59 }, 
                program: "REAL MUSIC POWER", 
                host: "GHRadio1",
                time: "10 PM to 2 AM",
                image: "watermark.jpg"
            },
            
        ],
        0: [ // Sunday
            { 
                start: { hour: 0, minute: 0 }, end: { hour: 2, minute: 0 }, 
                program: "REAL MUSIC POWER", 
                host: "GHRadio1",
                time: "10 PM to 2 AM",
                image: "watermark.jpg"
            },
            { 
                start: { hour: 2, minute: 0 }, end: { hour: 6, minute: 0 }, 
                program: "HIGH LIFE AGOOGO", 
                host: "GHRadio1",
                time: "2:00 AM to 6:00 AM",
                image: "ghlogo.png"
            },
            { 
                start: { hour: 6, minute: 0 }, end: { hour: 9, minute: 0 }, 
                program: "HEAVENS GATE", 
                host: "DJ HUMBLE",
                time: "6 AM to 9 AM",
                image: "ghlogo.png"
            },
            { 
                start: { hour: 9, minute: 0 }, end: { hour: 12, minute: 0 }, 
                program: "TIE NWOM PAPA NO",
                host: "KINSOLO DJ", 
                time: "9 AM to 12 PM",
                image: "ghlogo.png"
            },
            { 
                start: { hour: 12, minute: 0 }, end: { hour: 17, minute: 0 }, 
                program: "BISA NWOM[Request Show]", 
                host: "KWEKU MASIMOL",
                time: "12 PM to 5 PM",
                image: "BISA NWOM.jpg"
            },
            
            { 
                start: { hour: 17, minute: 0 }, end: { hour: 20, minute: 0 }, 
                program: "GH ENTERTAINMENT REVIEW", 
                host: "DA BLOWSMAN & KWEKU MASIMOL",
                time: "5 PM to 8 PM",
                image: "GH ENTERTAINMENT REVIEW.jpg"
            },
            { 
                start: { hour: 20, minute: 0 }, end: { hour: 21, minute: 0 }, 
                program: "R.O.G.I.M.HOUR", 
                host: "BROTHER EDWARD",
                time: "8 PM to 9 PM",
                image: "ghlogo.png"
            },
            { 
                start: { hour: 21, minute: 0 }, end: { hour: 23, minute: 59 }, 
                program: "WEEKEND PARTY MIX", 
                host: "GHRadio1",
                time: "9 PM to 2 AM",
                image: "watermark.jpg"
            },
            
        ],
    };

    // Get HTML elements
    const programImageElement = document.getElementById('Program-image');
    const programNameElement = document.getElementById('current-schedule');
    const hostNameElement = document.getElementById('Host-Name');
    const dailyScheduleElement = document.getElementById('daily-schedule');

    // Default when no show is found
    let currentProgram = {
        program: "No live shows",
        host: "Check back later",
        time: "",
        image: "default.jpg"
    };
    let nextScheduleTime = null;

    // Find current show
    if (schedules[currentDay]) {
        for (const schedule of schedules[currentDay]) {
            const scheduleStartTime = new Date(currentTime);
            scheduleStartTime.setHours(schedule.start.hour, schedule.start.minute, 0, 0);

            const scheduleEndTime = new Date(currentTime);
            scheduleEndTime.setHours(schedule.end.hour, schedule.end.minute, 0, 0);

            if (schedule.end.hour < schedule.start.hour) {
                scheduleEndTime.setDate(scheduleEndTime.getDate() + 1);
            }

            if (currentTime >= scheduleStartTime && currentTime < scheduleEndTime) {
                currentProgram = schedule;
                
                // Check if within 10 minutes of end for up-next
                const minutesToEnd = (scheduleEndTime - currentTime) / (1000 * 60);
                if (minutesToEnd <= 10) {
                    const nextIndex = (schedules[currentDay].indexOf(schedule) + 1);
                    const nextSchedule = schedules[currentDay][nextIndex % schedules[currentDay].length];
                    currentProgram.upNext = nextSchedule;
                }

                nextScheduleTime = scheduleEndTime;
                break;
            }
        }
    }

    // Display current program
    if (programImageElement && programImageElement.querySelector('img')) {
        programImageElement.querySelector('img').src = `images/${currentProgram.image}`;
        programImageElement.querySelector('img').alt = currentProgram.program;
    }
    if (programNameElement) programNameElement.textContent = currentProgram.program;
    if (hostNameElement) hostNameElement.textContent = currentProgram.host;

    // Display up-next if available
    if (currentProgram.upNext && programNameElement) {
        let upNextElement = programNameElement.nextElementSibling;
        if (!upNextElement || !upNextElement.classList.contains('up-next')) {
            upNextElement = document.createElement('div');
            upNextElement.className = 'up-next text-sm mt-2';
            programNameElement.parentNode.appendChild(upNextElement);
        }
        upNextElement.innerHTML = `<span class="text-white">Up Next: </span>
                                  <span class="text-[#E79F04]">${currentProgram.upNext.program} (${currentProgram.upNext.time})</span>`;
    }

    // Display daily schedule
    if (dailyScheduleElement) {
        dailyScheduleElement.innerHTML = '';
        
        if (schedules[currentDay]) {
            schedules[currentDay].forEach(schedule => {
                const scheduleItem = document.createElement('div');
                scheduleItem.className = 'schedule-item mb-2';
                scheduleItem.innerHTML = `
                    <div class="flex items-center">
                        <span class="text-[#E79F04] w-24">${formatTime(schedule.start.hour, schedule.start.minute)} - ${formatTime(schedule.end.hour, schedule.end.minute)}</span>
                        <div class="ml-4">
                            <span class="font-medium">${schedule.program}</span>
                            <span class="text-sm text-gray-400 ml-2">(${schedule.host})</span>
                        </div>
                    </div>
                `;
                dailyScheduleElement.appendChild(scheduleItem);
            });
        }
    }

    // If nextScheduleTime is defined, set a timeout to refresh the page right after the current schedule ends
    if (nextScheduleTime) {
        const timeToRefresh = nextScheduleTime - currentTime;
        setTimeout(() => {
            // Before refreshing, store the play state
            const audioPlayer = document.getElementById('radio-player');
            const isPlaying = audioPlayer && !audioPlayer.paused;
            localStorage.setItem('isPlaying', isPlaying ? 'true' : 'false');
            // Refresh the page
            location.reload();
        }, timeToRefresh);
    }
}

// Helper function to format time
function formatTime(hours, minutes) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

