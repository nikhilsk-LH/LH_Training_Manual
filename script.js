document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const mainCardsContainer = document.querySelector('.cards-container');

    // Category View
    const categoryView = document.getElementById('categoryView');
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryCardsContainer = document.getElementById('categoryCardsContainer');
    const backButton = document.getElementById('backButton');

    // Carousel View
    const driverCancellationView = document.getElementById('driverCancellationView'); // Rename to general carousel view in future refactor if desired, keeping ID for now
    const carouselBackButton = document.getElementById('carouselBackButton');
    const carouselImage = document.getElementById('carouselImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const markCompleteBtn = document.getElementById('markCompleteBtn');

    // Quiz View
    const quizView = document.getElementById('quizView');
    const quizContainer = document.querySelector('.quiz-container');
    const quizQuestionEl = quizContainer.querySelector('.question');
    const quizOptionsContainer = quizContainer.querySelector('.options');
    const submitQuizBtn = document.getElementById('submitQuizBtn');
    const quizResult = document.getElementById('quizResult');
    const quizTopBackBtn = document.getElementById('quizTopBackBtn');

    // Modal
    const customAlertModal = document.getElementById('customAlertModal');
    const modalProceedBtn = document.getElementById('modalProceedBtn');
    const modalBackBtn = document.getElementById('modalBackBtn');
    const wrongAnswerModal = document.getElementById('wrongAnswerModal');
    const redoSessionBtn = document.getElementById('redoSessionBtn');
    const hintModal = document.getElementById('hintModal');
    const hintOkBtn = document.getElementById('hintOkBtn');
    const hintIconBtn = document.getElementById('hintIconBtn');

    // --- State Variables ---
    const logsSubCategories = [
        { title: 'Communication', icon: '🗣️', id: 'communication' },
        { title: 'Driver cancellation', icon: '🚫', id: 'driver_cancel' },
        { title: 'Driver Mapping', icon: '🗺️', id: 'driver_mapping' },
        { title: 'Feedbacks', icon: '💬', id: 'feedbacks' },
        { title: 'Fleet Dashboard', icon: '📊', id: 'fleet_dashboard' },
        { title: 'General Etiquette', icon: '🤝', id: 'general_etiquette' },
        { title: 'How Tags work', icon: '🏷️', id: 'how_tags_work' },
        { title: 'LH BackOffice', icon: '🏢', id: 'lh_backoffice' },
        { title: 'Payment Queries', icon: '💳', id: 'payment_query' },
        { title: 'Slack & Threads', icon: '#️⃣', id: 'slack_threads' },
        { title: 'Vehicle breakdown', icon: '🔧', id: 'vehicle_breakdown' },
        { title: 'When i Work', icon: '📅', id: 'when_i_work' }
    ];

    const popsSubCategories = [
        { title: 'Driver list', icon: '📋', id: 'driver_list' },
        { title: 'Facility Feedback', icon: '🏭', id: 'facility_feedback' }
    ];

    const copsSubCategories = [
        { title: 'Quries', icon: '❓', id: 'cops_queries' },
        { title: 'Swap orders', icon: '🔁', id: 'swap_orders' },
        { title: 'Time slots', icon: '⏱️', id: 'time_slots' }
    ];

    const subCategories = {
        'when_i_work': [
            { title: 'Swapping the blocks', icon: '🔄', id: 'swapping_blocks' },
            { title: 'Publishing slots', icon: '📅', id: 'publishing_slots' }
        ],
        'feedbacks': [
            { title: 'Driver FeedBack', icon: '💬', id: 'driver_feedback' },
            { title: 'First slot feedback', icon: '1️⃣', id: 'first_slot_feedback' },
            { title: 'Product feedbacks', icon: '📝', id: 'product_feedback' }
        ],
        'lh_backoffice': [
            { title: 'Start time confirmaion', icon: '✅', id: 'start_time_confirmation' },
            { title: 'Rescheduling tasks', icon: '📆', id: 'rescheduling_tasks' },
            { title: 'Facility Tasks', icon: '🏢', id: 'facility_tasks' },
            { title: 'Address Updates', icon: '📍', id: 'address_updates' },
            { title: 'Looker Studio', icon: '📊', id: 'looker_studio' },
            { title: 'Backoffice features', icon: '⚙️', id: 'backoffice_features' }
        ],
        'slack_threads': [
            { title: 'Driver cancellation', icon: '🚫', id: 'driver_cancellation_thread' },
            { title: 'Overtilisation', icon: '📈', id: 'overutilisation' },
            { title: 'Order missing', icon: '❓', id: 'order_missing' },
            { title: 'Start time checks', icon: '⏰', id: 'start_time_checks' }
        ]
    };

    // Workflow Data Structure
    const workflows = {
        'driver_cancel': {
            images: [
                'assets/images/driver_cancellation/1.png',
                'assets/images/driver_cancellation/2.png',
                'assets/images/driver_cancellation/3.png',
                'assets/images/driver_cancellation/4.png'
            ],
            quiz: {
                question: "What is the 1st step in driver cancellation?",
                options: [
                    "Cancel immediately",
                    "Call driver",
                    "Tell him to release the block and share an email",
                    "Charge him directly"
                ],
                correctAnswer: "Tell him to release the block and share an email"
            }
        },
        'vehicle_breakdown': {
            images: [
                'assets/images/Driver vehicle break down/1.png',
                'assets/images/Driver vehicle break down/2.png',
                'assets/images/Driver vehicle break down/3.png',
                'assets/images/Driver vehicle break down/4.png',
                'assets/images/Driver vehicle break down/5.png',
                'assets/images/Driver vehicle break down/6.png',
                'assets/images/Driver vehicle break down/7.png'
            ],
            quiz: {
                question: "How to do route reassignment?",
                options: [
                    "Check with another driver for delivery",
                    "Check if the break down can be fixed for delivery",
                    "Go to logistics tab and do route reassignment there while both drivers are having active task",
                    "Go to logistics tab and do route reassignment there"
                ],
                correctAnswer: "Go to logistics tab and do route reassignment there"
            }
        },
        'payment_query': {
            images: [
                'assets/images/Payment related query/1.png',
                'assets/images/Payment related query/2.png',
                'assets/images/Payment related query/3.png',
                'assets/images/Payment related query/4.png'
            ],
            quiz: {
                question: "What is the mail id for the driver to sent e-mail?",
                options: [
                    "scout@laundyheap.com",
                    "scout@laundryheap.uk",
                    "scout@laundryheap.com",
                    "Scout@laundryheap.com"
                ],
                correctAnswer: "scout@laundryheap.com"
            }
        },
        'publishing_slots': {
            images: [
                'assets/images/Block swap between driver /1.png',
                'assets/images/Block swap between driver /2.png',
                'assets/images/Block swap between driver /3.png',
                'assets/images/Block swap between driver /4.png',
                'assets/images/Block swap between driver /5.png',
                'assets/images/Block swap between driver /6.png',
                'assets/images/Block swap between driver /7.png'
            ],
            quiz: {
                question: "When is a block Published on When I Work",
                options: [
                    "When driver cancels",
                    "When a driver approches us for a block",
                    "When there is a requirement",
                    "To get more orders"
                ],
                correctAnswer: "When there is a requirement"
            }
        },
        'swapping_blocks': {
            images: [
                'assets/images/WIW/1.png',
                'assets/images/WIW/2.png',
                'assets/images/WIW/3.png',
                'assets/images/WIW/4.png',
                'assets/images/WIW/5.png',
                'assets/images/WIW/6.png'
            ],
            quiz: {
                question: "What if the second driver is already having a block?",
                options: [
                    "Inform the first driver that the swap is unsuccessfull",
                    "Delete the current block and assign the new block",
                    "Assign both the blocks",
                    "Leave it with second driver to choose"
                ],
                correctAnswer: "Inform the first driver that the swap is unsuccessfull"
            }
        },
        'general_etiquette': {
            images: [
                'assets/images/Etiquette/1.png',
                'assets/images/Etiquette/2.png',
                'assets/images/Etiquette/3.png',
                'assets/images/Etiquette/4.png'
            ],
            quiz: null
        },
        'driver_feedback': {
            images: [
                'assets/images/Feedbacks/Driver/1.png',
                'assets/images/Feedbacks/Driver/2.png',
                'assets/images/Feedbacks/Driver/3.png',
                'assets/images/Feedbacks/Driver/4.png',
                'assets/images/Feedbacks/Driver/5.png',
                'assets/images/Feedbacks/Driver/6.png',
                'assets/images/Feedbacks/Driver/7.png',
                'assets/images/Feedbacks/Driver/8.png',
                'assets/images/Feedbacks/Driver/9.png',
                'assets/images/Feedbacks/Driver/10.png',
                'assets/images/Feedbacks/Driver/11.png'
            ],
            quiz: {
                question: "If driver has a block from 5-9 and if he starts at 5:40, should be raise a feedback for lateness?",
                options: [
                    "YES",
                    "NO"
                ],
                correctAnswer: "YES"
            }
        },
        'first_slot_feedback': {
            images: [
                'assets/images/Feedbacks/Test/1.png',
                'assets/images/Feedbacks/Test/2.png',
                'assets/images/Feedbacks/Test/3.png',
                'assets/images/Feedbacks/Test/4.png',
                'assets/images/Feedbacks/Test/5.png'
            ],
            quiz: {
                question: "How to check if the test slot is a good fit for the platform?",
                options: [
                    "Monitoring Punctuality and Reviewing photos taken by driver",
                    "By calling driver",
                    "If he asks less money when compared to others",
                    "If he is slow on the route"
                ],
                correctAnswer: "Monitoring Punctuality and Reviewing photos taken by driver"
            }
        },
        'product_feedback': {
            images: [
                'assets/images/Feedbacks/Product/1.png',
                'assets/images/Feedbacks/Product/2.png',
                'assets/images/Feedbacks/Product/3.png',
                'assets/images/Feedbacks/Product/4.png',
                'assets/images/Feedbacks/Product/5.png'
            ],
            quiz: null
        },
        'driver_mapping': {
            images: [
                'assets/images/Driver mapping/1.png',
                'assets/images/Driver mapping/2.png',
                'assets/images/Driver mapping/3.png',
                'assets/images/Driver mapping/4.png',
                'assets/images/Driver mapping/5.png',
                'assets/images/Driver mapping/6.png',
                'assets/images/Driver mapping/7.png'
            ],
            quiz: {
                question: "How to check which Facility, is the driver operating for?",
                options: [
                    "Ask the driver",
                    "Check When I Work",
                    "Map the driver wherever needed",
                    "Check with POPS Team"
                ],
                correctAnswer: "Check When I Work"
            }
        },
        'communication': {
            images: [
                'assets/images/communication/1.png',
                'assets/images/communication/2.png',
                'assets/images/communication/3.png',
                'assets/images/communication/4.png'

            ],
            quiz: null
        },
        'fleet_dashboard': {
            images: [
                'assets/images/Fleet dashboard/1.png',
                'assets/images/Fleet dashboard/2.png',
                'assets/images/Fleet dashboard/3.png',
                'assets/images/Fleet dashboard/4.png',
                'assets/images/Fleet dashboard/5.png',
                'assets/images/Fleet dashboard/6.png'
            ],
            quiz: {
                question: "how will we identify delayed tasks.",
                options: [
                    "Shows a Grey icon next to driver name",
                    "Shows a Yellow icon next to driver name",
                    "Shows a  Red icon next to driver name",
                    "Shows the number and icon in yellow next to driver name"
                ],
                correctAnswer: "Shows the number and icon in yellow next to driver name"
            }
        },
        'start_time_confirmation': {
            images: [
                'assets/images/BO /Start time/1.png',
                'assets/images/BO /Start time/2.png',
                'assets/images/BO /Start time/3.png',
                'assets/images/BO /Start time/4.png',
                'assets/images/BO /Start time/5.png'
            ],
            quiz: {
                question: "What is the impotance of Start time confirmation",
                options: [
                    "To make sure Driver is operating the block for the booked time",
                    "To make sure driver start early",
                    "To make sure API plans a route for driver",
                    "To make sure Delays are reduced"
                ],
                correctAnswer: "To make sure Driver is operating the block for the booked time"
            }
        },
        'address_updates': {
            images: [
                'assets/images/BO /Address/1.png',
                'assets/images/BO /Address/2.png',
                'assets/images/BO /Address/3.png',
                'assets/images/BO /Address/4.png',
                'assets/images/BO /Address/5.png',
                'assets/images/BO /Address/6.png',
                'assets/images/BO /Address/7.png',
                'assets/images/BO /Address/8.png'
            ],
            quiz: {
                question: "What to do if the new address is served by Separate Facility",
                options: [
                    "Update the address and reply on Slack",
                    "Check if the new addrress falls for the assigned Facility",
                    "Convince the driver for a special driver for delivery",
                    "Check with customer for a different address"
                ],
                correctAnswer: "Check if the new addrress falls for the assigned Facility"
            }
        },
        'looker_studio': {
            images: [
                'assets/images/BO /Looker/1.png',
                'assets/images/BO /Looker/2.png',
                'assets/images/BO /Looker/3.png',
                'assets/images/BO /Looker/4.png'
            ],
            quiz: {
                question: "IF a facility has hit capacty , what needs to be done",
                options: [
                    "Inform leads to close the market",
                    "Check if tasks can be moved to other FAC",
                    "Take addtional driver",
                    "Inform POPS team to inform Facility"
                ],
                correctAnswer: "Check if tasks can be moved to other FAC"
            }
        },
        'backoffice_features': {
            images: [
                'assets/images/BO /BO feature/1.png',
                'assets/images/BO /BO feature/2.png',
                'assets/images/BO /BO feature/3.png',
                'assets/images/BO /BO feature/4.png',
                'assets/images/BO /BO feature/5.png',
                'assets/images/BO /BO feature/6.png',
                'assets/images/BO /BO feature/7.png',
                'assets/images/BO /BO feature/8.png',
                'assets/images/BO /BO feature/9.png',
                'assets/images/BO /BO feature/10.png',
                'assets/images/BO /BO feature/11.png',
                'assets/images/BO /BO feature/12.png',
                'assets/images/BO /BO feature/13.png',
                'assets/images/BO /BO feature/14.png',
                'assets/images/BO /BO feature/15.png'
            ],
            quiz: null
        },
        'rescheduling_tasks': {
            images: [
                'assets/images/BO /Reschedule/1.png',
                'assets/images/BO /Reschedule/2.png',
                'assets/images/BO /Reschedule/3.png',
                'assets/images/BO /Reschedule/4.png',
                'assets/images/BO /Reschedule/5.png'
            ],
            quiz: null
        },
        'facility_tasks': {
            images: [
                'assets/images/BO /FAC tasks/1.png',
                'assets/images/BO /FAC tasks/2.png',
                'assets/images/BO /FAC tasks/3.png',
                'assets/images/BO /FAC tasks/4.png',
                'assets/images/BO /FAC tasks/5.png'
            ],
            quiz: null
        },
        'driver_cancellation_thread': {
            images: [
                'assets/images/Slack/cancellation/1.png',
                'assets/images/Slack/cancellation/2.png',
                'assets/images/Slack/cancellation/3.png',
                'assets/images/Slack/cancellation/4.png',
                'assets/images/Slack/cancellation/5.png'
            ],
            quiz: null
        },
        'overutilisation': {
            images: [
                'assets/images/Slack/Over utilization thread/1.png',
                'assets/images/Slack/Over utilization thread/2.png',
                'assets/images/Slack/Over utilization thread/3.png',
                'assets/images/Slack/Over utilization thread/4.png',
                'assets/images/Slack/Over utilization thread/5.png'
            ],
            quiz: null
        },
        'start_time_checks': {
            images: [
                'assets/images/Slack/Start time checking/1.png',
                'assets/images/Slack/Start time checking/2.png',
                'assets/images/Slack/Start time checking/3.png',
                'assets/images/Slack/Start time checking/4.png',
                'assets/images/Slack/Start time checking/5.png'
            ],
            quiz: null
        },
        'order_missing': {
            images: [
                'assets/images/Slack/Order missing/1.png',
                'assets/images/Slack/Order missing/2.png',
                'assets/images/Slack/Order missing/3.png',
                'assets/images/Slack/Order missing/4.png',
                'assets/images/Slack/Order missing/5.png'
            ],
            quiz: null
        },
        'facility_feedback': {
            images: [
                'assets/images/POPS/feedback/1.png',
                'assets/images/POPS/feedback/2.png'
            ],
            quiz: null
        },
        'driver_list': {
            images: [
                'assets/images/POPS/list/1.png',
                'assets/images/POPS/list/2.png',
                'assets/images/POPS/list/3.png',
                'assets/images/POPS/list/4.png',
                'assets/images/POPS/list/5.png'
            ],
            quiz: null
        },
        'time_slots': {
            images: [
                'assets/images/COPS/slot/1.png',
                'assets/images/COPS/slot/2.png',
                'assets/images/COPS/slot/3.png'
            ],
            quiz: null
        },
        'swap_orders': {
            images: [
                'assets/images/COPS/swap/1.png',
                'assets/images/COPS/swap/2.png'
            ],
            quiz: null
        },
        'cops_queries': {
            images: [
                'assets/images/COPS/query/1.png',
                'assets/images/COPS/query/2.png'
            ],
            quiz: null
        },
        'how_tags_work': {
            images: [
                'assets/images/How Tags work/0.png',
                'assets/images/How Tags work/1.png',
                'assets/images/How Tags work/2.png',
                'assets/images/How Tags work/3.png',
                'assets/images/How Tags work/4.png',
                'assets/images/How Tags work/5.png',
                'assets/images/How Tags work/6.png',
                'assets/images/How Tags work/7.png',
                'assets/images/How Tags work/8.png',
                'assets/images/How Tags work/9.png',
                'assets/images/How Tags work/10.png',
                'assets/images/How Tags work/11.png',
                'assets/images/How Tags work/12.png',
                'assets/images/How Tags work/13.png'
            ],
            quiz: null
        }
    };

    let currentWorkflowId = null;
    let currentSlide = 0;
    let maxSlideReached = 0;
    let navigationStack = [];
    let currentCategoryContext = { title: 'LOGS', items: logsSubCategories };
    // --- Navigation & View Helpers ---
    function hideAllViews() {
        mainCardsContainer.classList.add('hidden');
        categoryView.classList.add('hidden');
        driverCancellationView.classList.add('hidden');
        quizView.classList.add('hidden');
        customAlertModal.classList.add('hidden');
        wrongAnswerModal.classList.add('hidden');
        hintModal.classList.add('hidden');
    }

    function showMainHome() {
        hideAllViews();
        mainCardsContainer.classList.remove('hidden');
        navigationStack = []; // Reset stack
    }

    // --- Card Interaction (Home) ---
    document.querySelectorAll('.cards-container > .card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            if (category === 'Template') {
                window.location.href = 'https://nikhilsk-lh.github.io/LH_Template/';
            } else if (category === 'LOGS') {
                showCategoryView('LOGS', logsSubCategories);
                navigationStack.push({ view: 'home' }); // Stack home before entering LOGS
            } else if (category === 'POPS') {
                showCategoryView('POPS', popsSubCategories);
                navigationStack.push({ view: 'home' }); // Stack home before entering POPS
            } else if (category === 'COPS') {
                showCategoryView('COPS', copsSubCategories);
                navigationStack.push({ view: 'home' }); // Stack home before entering COPS
            } else if (category === 'FinalQuiz') {
                customAlertModal.classList.remove('hidden');
            } else {
                alert('Feature coming soon!');
            }
        });
    });

    // --- Modal Logic ---
    modalBackBtn.addEventListener('click', () => {
        customAlertModal.classList.add('hidden');
    });

    modalProceedBtn.addEventListener('click', () => {
        customAlertModal.classList.add('hidden');
        alert("Final Quiz starting soon!"); // Placeholder for actual quick start
    });

    // --- Category View Logic ---
    function showCategoryView(title, items, isBackNavigation = false) {
        hideAllViews();
        categoryView.classList.remove('hidden');
        categoryTitle.textContent = title;
        categoryCardsContainer.innerHTML = '';

        currentCategoryContext = { title, items };

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<div class="icon">${item.icon}</div><h2>${item.title}</h2>`;
            card.addEventListener('click', () => {
                if (subCategories[item.id]) {
                    // Navigate deeper
                    navigationStack.push({ view: 'category', title: title, items: items });
                    showCategoryView(item.title, subCategories[item.id]);
                } else if (workflows[item.id]) {
                    startWorkflow(item.id);
                } else {
                    alert(`${item.title} workflow is coming soon!`);
                }
            });
            categoryCardsContainer.appendChild(card);
        });
    }

    backButton.addEventListener('click', () => {
        if (navigationStack.length > 0) {
            const previousState = navigationStack.pop();
            if (previousState.view === 'home') {
                showMainHome();
            } else if (previousState.view === 'category') {
                showCategoryView(previousState.title, previousState.items, true);
            }
        } else {
            showMainHome();
        }
    });

    // --- Workflow Logic (Carousel) ---
    function startWorkflow(workflowId) {
        currentWorkflowId = workflowId;
        const workflow = workflows[workflowId];

        hideAllViews();
        driverCancellationView.classList.remove('hidden'); // Reusing the carousel view container
        currentSlide = 0;
        maxSlideReached = 0;

        updateCarousel();
    }

    function updateCarousel() {
        const workflow = workflows[currentWorkflowId];
        const images = workflow.images;

        carouselImage.src = images[currentSlide];
        slideCounter.textContent = `${currentSlide + 1} / ${images.length}`;

        // Track progress
        if (currentSlide > maxSlideReached) {
            maxSlideReached = currentSlide;
        }

        // Enable Mark Complete when last slide is reached
        if (maxSlideReached === images.length - 1) {
            markCompleteBtn.disabled = false;
        } else {
            markCompleteBtn.disabled = true;
        }

        // Button States
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === images.length - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        const images = workflows[currentWorkflowId].images;
        if (currentSlide < images.length - 1) {
            currentSlide++;
            updateCarousel();
        }
    });

    carouselBackButton.addEventListener('click', () => {
        showCategoryView(currentCategoryContext.title, currentCategoryContext.items, true);
    });

    markCompleteBtn.addEventListener('click', () => {
        const workflow = workflows[currentWorkflowId];
        if (workflow.quiz) {
            showQuizView();
        } else {
            alert("Workflow Completed!");
            showCategoryView(currentCategoryContext.title, currentCategoryContext.items, true);
        }
    });

    // --- Quiz Logic ---
    function showQuizView() {
        hideAllViews();
        quizView.classList.remove('hidden');
        resetQuiz();
        renderQuiz();
    }

    function renderQuiz() {
        // Randomly show hint icon (50% chance)
        if (Math.random() < 0.5) {
            hintIconBtn.classList.remove('hidden');
        } else {
            hintIconBtn.classList.add('hidden');
        }

        const quizData = workflows[currentWorkflowId].quiz;
        quizQuestionEl.textContent = quizData.question;

        quizOptionsContainer.innerHTML = ''; // Clear previous options

        quizData.options.forEach(optionText => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = optionText;
            btn.addEventListener('click', () => handleOptionClick(btn));
            quizOptionsContainer.appendChild(btn);
        });
    }

    function handleOptionClick(clickedBtn) {
        const allOptions = quizOptionsContainer.querySelectorAll('.option-btn');
        allOptions.forEach(opt => opt.classList.remove('selected'));
        clickedBtn.classList.add('selected');
        submitQuizBtn.classList.remove('hidden');
    }

    function resetQuiz() {
        submitQuizBtn.classList.add('hidden');
        quizResult.classList.add('hidden');
        quizTopBackBtn.classList.add('hidden');
        quizResult.textContent = '';
    }

    submitQuizBtn.addEventListener('click', () => {
        const selected = quizOptionsContainer.querySelector('.option-btn.selected');
        if (!selected) return;

        const answerText = selected.textContent;
        const correctAnswer = workflows[currentWorkflowId].quiz.correctAnswer;

        quizResult.classList.remove('hidden');

        // Validation logic
        if (answerText === correctAnswer) {
            quizResult.classList.remove('hidden');
            quizResult.textContent = '✅ Correct!';
            quizResult.style.color = 'green';
            submitQuizBtn.classList.add('hidden');
            quizTopBackBtn.classList.remove('hidden');
        } else {
            wrongAnswerModal.classList.remove('hidden');
        }
    });

    quizTopBackBtn.addEventListener('click', () => {
        showCategoryView(currentCategoryContext.title, currentCategoryContext.items, true);
    });

    redoSessionBtn.addEventListener('click', () => {
        wrongAnswerModal.classList.add('hidden');
        startWorkflow(currentWorkflowId);
    });

    hintIconBtn.addEventListener('click', () => {
        hintModal.classList.remove('hidden');
    });

    hintOkBtn.addEventListener('click', () => {
        hintModal.classList.add('hidden');
        startWorkflow(currentWorkflowId);
    });
});
