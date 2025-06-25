function handleImageErrors() {
    const images = document.querySelectorAll('.img_floor');
    images.forEach(img => {
        img.onerror = function() {
            console.warn(`Failed to load image: ${this.src}`);
            this.src = 'https://via.placeholder.com/759x327'; // Fallback image
        };
    });
}

function hideAllFloors(floors, transitionDuration = 400) {
    floors.forEach((floor, index) => {
        const description = floor.querySelector('.discription_floor_container');
        const image = floor.querySelector('.floor_image_container');
        if (description && image) {
            description.classList.remove('fade-in');
            image.classList.remove('fade-in');
            description.classList.add('fade-out');
            image.classList.add('fade-out');
        }
    });
}

function initFloorSwitching() {
    const buttons = document.querySelectorAll('.third_button');
    const floors = document.querySelectorAll('.floor[data-floor-id]');
    const transitionDuration = 400; // Transition duration in milliseconds

    console.log('Buttons found:', buttons.length);
    console.log('Floors found:', floors.length);

    if (!buttons.length || !floors.length) {
        console.error('Error: Buttons or floors not found in the DOM');
        return;
    }

    // Validate data-floor attributes
    buttons.forEach((button, index) => {
        const floorValue = button.getAttribute('data-floor');
        if (!floorValue || isNaN(parseInt(floorValue))) {
            console.warn(`Invalid data-floor value on button ${index + 1}: ${floorValue}`);
        }
    });

    // Validate floors
    floors.forEach((floor, index) => {
        const floorId = floor.getAttribute('data-floor-id');
        const description = floor.querySelector('.discription_floor_container');
        const image = floor.querySelector('.floor_image_container');
        if (!description) {
            console.warn(`Floor ${index + 1} (ID: ${floorId}) missing discription_floor_container`);
        }
        if (!image) {
            console.warn(`Floor ${index + 1} (ID: ${floorId}) missing floor_image_container`);
        }
    });

    // Set initial state
    hideAllFloors(floors, transitionDuration); // Hide all floors initially
    buttons[0].classList.add('third_button_green');
    floors[0].classList.remove('hidden');
    const initialDescription = floors[0].querySelector('.discription_floor_container');
    const initialImage = floors[0].querySelector('.floor_image_container');
    if (initialDescription && initialImage) {
        initialDescription.classList.remove('fade-out');
        initialImage.classList.remove('fade-out');
        initialDescription.classList.add('fade-in');
        initialImage.classList.add('fade-in');
        console.log('Showing initial floor: 1');
    } else {
        console.warn('Initial floor missing description or image container');
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const floorValue = button.getAttribute('data-floor');
            const floorIndex = parseInt(floorValue) - 1;

            if (isNaN(floorIndex) || floorIndex < 0 || floorIndex >= floors.length) {
                console.error(`Invalid floor index: ${floorIndex} (data-floor: ${floorValue})`);
                return;
            }

            console.log('Button clicked, floor index:', floorIndex);

            if (button.classList.contains('third_button_green')) {
                console.log('Button already active, ignoring click');
                return;
            }

            // Hide all floors first
            hideAllFloors(floors, transitionDuration);
            // Update button states
            buttons.forEach(btn => btn.classList.remove('third_button_green'));
            button.classList.add('third_button_green');

            // Fade in selected floor
            setTimeout(() => {
                const selectedFloor = floors[floorIndex];
                if (!selectedFloor) {
                    console.error('Selected floor not found for index:', floorIndex);
                    return;
                }
                selectedFloor.classList.remove('hidden');
                const description = selectedFloor.querySelector('.discription_floor_container');
                const image = selectedFloor.querySelector('.floor_image_container');
                if (description && image) {
                    description.classList.remove('fade-out');
                    image.classList.remove('fade-out');
                    description.classList.add('fade-in');
                    image.classList.add('fade-in');
                    console.log('Showing floor:', floorIndex + 1);
                } else {
                    console.error(`Selected floor ${floorIndex + 1} missing description or image container`);
                    if (!description) console.error(`Missing discription_floor_container in floor ${floorIndex + 1}`);
                    if (!image) console.error(`Missing floor_image_container in floor ${floorIndex + 1}`);
                }
            }, transitionDuration);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing');
        handleImageErrors();
        initFloorSwitching();
    });
} else {
    console.log('DOM already loaded, initializing');
    handleImageErrors();
    initFloorSwitching();
}