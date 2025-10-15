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
