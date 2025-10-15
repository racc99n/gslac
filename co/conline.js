<!-- Google Fonts -->
<link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
<link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin>
<link href="[https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap](https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap)" rel="stylesheet">

<!-- Font Awesome (สำหรับไอคอน) -->
<link rel="stylesheet" href="[https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css)" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<!-- สไตล์ของ Counter -->
<style>
    /* CSS variables inspired by the user's provided styles */
    :root {
        /* คุณอาจจะต้องปรับค่าสีเหล่านี้ให้เข้ากับเว็บของคุณ */
        --capsule-bg: #0f1317;
        --text-color: #eef2f6;
        --orange-main: #ff6a00;
        --orange-glow: rgba(255, 106, 0, 0.6);
        --pill-radius: 9999px;
        --gap: 12px;
        --anim-duration: 0.5s;
    }

    /* The main container for the online counter */
    .capsule {
        display: inline-flex;
        align-items: center;
        gap: var(--gap);
        padding: 10px 24px;
        border-radius: var(--pill-radius);
        background-color: var(--capsule-bg);
        border: 2px solid var(--orange-main);
        box-shadow: 0 0 12px var(--orange-glow);
        overflow: hidden;
        font-family: 'Kanit', sans-serif; /* เพิ่ม font-family เพื่อให้แน่ใจว่าใช้ฟอนต์ที่ถูกต้อง */
        font-size: 1.1rem;
        font-weight: 500;
        margin: 20px auto; /* เพิ่ม margin เพื่อให้มีระยะห่างที่สวยงาม */
    }
    
    /* ... (คัดลอก CSS ที่เหลือทั้งหมดมาที่นี่) ... */

    .capsule .label {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-color);
    }
    
    .capsule .label i {
        color: var(--orange-main);
        font-size: 1.2rem;
        text-shadow: 0 0 8px var(--orange-glow);
        transform: scaleX(-1); /* Flips the icon horizontally */
    }

    .capsule .num {
        font-weight: 700;
        color: var(--orange-main);
        font-size: 1.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 80px; /* Prevents layout shift */
    }
    
    .char-container {
        position: relative;
        height: 1.4em;
        line-height: 1.4em;
        overflow: hidden;
        text-align: center;
        width: 0.6em;
    }
    
    .char-container.comma {
         width: 0.3em;
    }

    .char {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        transition: transform var(--anim-duration) ease-in-out, opacity var(--anim-duration) ease-in-out;
    }

    .char.enter-up { opacity: 0; transform: translateY(100%); }
    .char.enter-down { opacity: 0; transform: translateY(-100%); }
    .char.leave-up { opacity: 0; transform: translateY(-100%); }
    .char.leave-down { opacity: 0; transform: translateY(100%); }
    
    .capsule .unit {
        color: var(--text-color);
    }
</style>

วิธีนำไปวาง:
นำโค้ดทั้งหมดนี้ไปวางไว้ในส่วน <head> ของไฟล์ HTML ของเว็บคุณ หรือถ้าเว็บคุณมีไฟล์ .css แยกต่างหาก ให้นำเฉพาะโค้ดที่อยู่ภายในแท็ก <style> ไปใส่ในไฟล์ .css นั้น และนำแท็ก <link> ทั้ง 3 อันไปวางใน <head> ครับ

ขั้นตอนที่ 3: คัดลอกสคริปต์ (JavaScript)

ส่วนนี้คือหัวใจหลักที่ทำให้ตัวเลขเคลื่อนไหวได้ ให้คัดลอกโค้ดทั้งหมดที่อยู่ในแท็ก <script>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const onlineNumberContainer = document.getElementById('onlineNumber');
        let previousNumberString = '';

        // Function to create the initial number display
        function createNumberDisplay(numberStr) {
            onlineNumberContainer.innerHTML = ''; // Clear previous content
            for (const char of numberStr) {
                const charContainer = document.createElement('div');
                charContainer.className = 'char-container' + (char === ',' ? ' comma' : '');
                
                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.textContent = char;
                
                charContainer.appendChild(charSpan);
                onlineNumberContainer.appendChild(charContainer);
            }
            previousNumberString = numberStr;
        }
        
        // ... (คัดลอก JavaScript ที่เหลือทั้งหมดมาที่นี่) ...

        // Function to update the number with animations
        function updateNumberDisplay(newNumberStr) {
            if (newNumberStr.length !== previousNumberString.length) {
                createNumberDisplay(newNumberStr);
                return;
            }

            for (let i = 0; i < newNumberStr.length; i++) {
                const oldChar = previousNumberString[i];
                const newChar = newNumberStr[i];

                if (oldChar === newChar) {
                    continue;
                }

                const charContainer = onlineNumberContainer.children[i];
                const oldCharSpan = charContainer.querySelector('.char:not([class*="leave-"])');
                const isOldDigit = !isNaN(parseInt(oldChar));
                const isNewDigit = !isNaN(parseInt(newChar));
                const direction = (isOldDigit && isNewDigit && parseInt(newChar) > parseInt(oldChar)) ? 'up' : 'down';

                if(oldCharSpan) {
                   oldCharSpan.classList.add(`leave-${direction}`);
                   setTimeout(() => oldCharSpan.remove(), 500);
                }

                const newCharSpan = document.createElement('span');
                newCharSpan.className = 'char';
                newCharSpan.textContent = newChar;
                newCharSpan.classList.add(`enter-${direction}`);
                
                charContainer.appendChild(newCharSpan);
                
                requestAnimationFrame(() => {
                    newCharSpan.classList.remove(`enter-${direction}`);
                });
            }
             previousNumberString = newNumberStr;
        }

        function runUpdateCycle() {
            const centerValue = 75000;
            const amplitude = 15000;
            const time = Date.now();
            const wave1 = Math.sin(time * 0.000003);
            const wave2 = Math.sin(time * 0.000005);
            const wave3 = Math.sin(time * 0.000001);
            const combinedWave = (wave1 * 0.5) + (wave2 * 0.3) + (wave3 * 0.2);
            const fluctuation = combinedWave * amplitude;
            const currentOnlineUsers = Math.floor(centerValue + fluctuation);
            const newNumberString = currentOnlineUsers.toLocaleString('en-US');

            if (previousNumberString === '') {
                createNumberDisplay(newNumberString);
            } else {
                updateNumberDisplay(newNumberString);
            }
        }

        runUpdateCycle();
        setInterval(runUpdateCycle, 2500);
    });
</script>
