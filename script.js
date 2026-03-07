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

    // Final Quiz
    const finalQuizView = document.getElementById('finalQuizView');
    const finalQuizHomeBtn = document.getElementById('finalQuizHomeBtn');
    const finalQuizProgress = document.getElementById('finalQuizProgress');
    const finalQuizProgressText = document.getElementById('finalQuizProgressText');
    const finalQuizQuestion = document.getElementById('finalQuizQuestion');
    const finalQuizOptions = document.getElementById('finalQuizOptions');
    const finalQuizNextBtn = document.getElementById('finalQuizNextBtn');
    const finalQuizSubmitBtn = document.getElementById('finalQuizSubmitBtn');
    const finalQuizResultArea = document.getElementById('finalQuizResultArea');
    const finalQuizScore = document.getElementById('finalQuizScore');
    const finalQuizMessage = document.getElementById('finalQuizMessage');
    const finalQuizRestartBtn = document.getElementById('finalQuizRestartBtn');
    const finalQuizCard = document.getElementById('finalQuizCard');
    const finalQuizUserNameInput = document.getElementById('finalQuizUserName');

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
                'assets/images/driver_cancellation/1.jpg',
                'assets/images/driver_cancellation/2.jpg',
                'assets/images/driver_cancellation/3.jpg',
                'assets/images/driver_cancellation/4.jpg'
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
                'assets/images/Driver vehicle break down/1.jpg',
                'assets/images/Driver vehicle break down/2.jpg',
                'assets/images/Driver vehicle break down/3.jpg',
                'assets/images/Driver vehicle break down/4.jpg',
                'assets/images/Driver vehicle break down/5.jpg',
                'assets/images/Driver vehicle break down/6.jpg',
                'assets/images/Driver vehicle break down/7.jpg'
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
                'assets/images/Payment related query/1.jpg',
                'assets/images/Payment related query/2.jpg',
                'assets/images/Payment related query/3.jpg',
                'assets/images/Payment related query/4.jpg'
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
                'assets/images/Block swap between driver /1.jpg',
                'assets/images/Block swap between driver /2.jpg',
                'assets/images/Block swap between driver /3.jpg',
                'assets/images/Block swap between driver /4.jpg',
                'assets/images/Block swap between driver /5.jpg',
                'assets/images/Block swap between driver /6.jpg',
                'assets/images/Block swap between driver /7.jpg'
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
                'assets/images/WIW/1.jpg',
                'assets/images/WIW/2.jpg',
                'assets/images/WIW/3.jpg',
                'assets/images/WIW/4.jpg',
                'assets/images/WIW/5.jpg',
                'assets/images/WIW/6.jpg'
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
                'assets/images/Etiquette/1.jpg',
                'assets/images/Etiquette/2.jpg',
                'assets/images/Etiquette/3.jpg',
                'assets/images/Etiquette/4.jpg'
            ],
            quiz: null
        },
        'driver_feedback': {
            images: [
                'assets/images/Feedbacks/Driver/1.jpg',
                'assets/images/Feedbacks/Driver/2.jpg',
                'assets/images/Feedbacks/Driver/3.jpg',
                'assets/images/Feedbacks/Driver/4.jpg',
                'assets/images/Feedbacks/Driver/5.jpg',
                'assets/images/Feedbacks/Driver/6.jpg',
                'assets/images/Feedbacks/Driver/7.jpg',
                'assets/images/Feedbacks/Driver/8.jpg',
                'assets/images/Feedbacks/Driver/9.jpg',
                'assets/images/Feedbacks/Driver/10.jpg',
                'assets/images/Feedbacks/Driver/11.jpg'
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
                'assets/images/Feedbacks/Test/1.jpg',
                'assets/images/Feedbacks/Test/2.jpg',
                'assets/images/Feedbacks/Test/3.jpg',
                'assets/images/Feedbacks/Test/4.jpg',
                'assets/images/Feedbacks/Test/5.jpg'
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
                'assets/images/Feedbacks/Product/1.jpg',
                'assets/images/Feedbacks/Product/2.jpg',
                'assets/images/Feedbacks/Product/3.jpg',
                'assets/images/Feedbacks/Product/4.jpg',
                'assets/images/Feedbacks/Product/5.jpg'
            ],
            quiz: null
        },
        'driver_mapping': {
            images: [
                'assets/images/Driver mapping/1.jpg',
                'assets/images/Driver mapping/2.jpg',
                'assets/images/Driver mapping/3.jpg',
                'assets/images/Driver mapping/4.jpg',
                'assets/images/Driver mapping/5.jpg',
                'assets/images/Driver mapping/6.jpg',
                'assets/images/Driver mapping/7.jpg'
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
                'assets/images/communication/1.jpg',
                'assets/images/communication/2.jpg',
                'assets/images/communication/3.jpg',
                'assets/images/communication/4.jpg'

            ],
            quiz: null
        },
        'fleet_dashboard': {
            images: [
                'assets/images/Fleet dashboard/1.jpg',
                'assets/images/Fleet dashboard/2.jpg',
                'assets/images/Fleet dashboard/3.jpg',
                'assets/images/Fleet dashboard/4.jpg',
                'assets/images/Fleet dashboard/5.jpg',
                'assets/images/Fleet dashboard/6.jpg'
            ],
            quiz: {
                question: "How will we identify delayed tasks.",
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
                'assets/images/BO /Start time/1.jpg',
                'assets/images/BO /Start time/2.jpg',
                'assets/images/BO /Start time/3.jpg',
                'assets/images/BO /Start time/4.jpg',
                'assets/images/BO /Start time/5.jpg'
            ],
            quiz: {
                question: "What is the importance of Start time confirmation",
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
                'assets/images/BO /Address/1.jpg',
                'assets/images/BO /Address/2.jpg',
                'assets/images/BO /Address/3.jpg',
                'assets/images/BO /Address/4.jpg',
                'assets/images/BO /Address/5.jpg',
                'assets/images/BO /Address/6.jpg',
                'assets/images/BO /Address/7.jpg',
                'assets/images/BO /Address/8.jpg'
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
                'assets/images/BO /Looker/1.jpg',
                'assets/images/BO /Looker/2.jpg',
                'assets/images/BO /Looker/3.jpg',
                'assets/images/BO /Looker/4.jpg'
            ],
            quiz: {
                question: "IF a facility has hit capacity , what needs to be done",
                options: [
                    "Inform leads to close the market",
                    "Check if tasks can be moved to other FAC",
                    "Take additional driver",
                    "Inform POPS team to inform Facility"
                ],
                correctAnswer: "Check if tasks can be moved to other FAC"
            }
        },
        'backoffice_features': {
            images: [
                'assets/images/BO /BO feature/1.jpg',
                'assets/images/BO /BO feature/2.jpg',
                'assets/images/BO /BO feature/3.jpg',
                'assets/images/BO /BO feature/4.jpg',
                'assets/images/BO /BO feature/5.jpg',
                'assets/images/BO /BO feature/6.jpg',
                'assets/images/BO /BO feature/7.jpg',
                'assets/images/BO /BO feature/8.jpg',
                'assets/images/BO /BO feature/9.jpg',
                'assets/images/BO /BO feature/10.jpg',
                'assets/images/BO /BO feature/11.jpg',
                'assets/images/BO /BO feature/12.jpg',
                'assets/images/BO /BO feature/13.jpg',
                'assets/images/BO /BO feature/14.jpg',
                'assets/images/BO /BO feature/15.jpg'
            ],
            quiz: null
        },
        'rescheduling_tasks': {
            images: [
                'assets/images/BO /Reschedule/1.jpg',
                'assets/images/BO /Reschedule/2.jpg',
                'assets/images/BO /Reschedule/3.jpg',
                'assets/images/BO /Reschedule/4.jpg',
                'assets/images/BO /Reschedule/5.jpg'
            ],
            quiz: null
        },
        'facility_tasks': {
            images: [
                'assets/images/BO /FAC tasks/1.jpg',
                'assets/images/BO /FAC tasks/2.jpg',
                'assets/images/BO /FAC tasks/3.jpg',
                'assets/images/BO /FAC tasks/4.jpg',
                'assets/images/BO /FAC tasks/5.jpg'
            ],
            quiz: null
        },
        'driver_cancellation_thread': {
            images: [
                'assets/images/Slack/cancellation/1.jpg',
                'assets/images/Slack/cancellation/2.jpg',
                'assets/images/Slack/cancellation/3.jpg',
                'assets/images/Slack/cancellation/4.jpg',
                'assets/images/Slack/cancellation/5.jpg'
            ],
            quiz: null
        },
        'overutilisation': {
            images: [
                'assets/images/Slack/Over utilization thread/1.jpg',
                'assets/images/Slack/Over utilization thread/2.jpg',
                'assets/images/Slack/Over utilization thread/3.jpg',
                'assets/images/Slack/Over utilization thread/4.jpg',
                'assets/images/Slack/Over utilization thread/5.jpg'
            ],
            quiz: null
        },
        'start_time_checks': {
            images: [
                'assets/images/Slack/Start time checking/1.jpg',
                'assets/images/Slack/Start time checking/2.jpg',
                'assets/images/Slack/Start time checking/3.jpg',
                'assets/images/Slack/Start time checking/4.jpg',
                'assets/images/Slack/Start time checking/5.jpg'
            ],
            quiz: null
        },
        'order_missing': {
            images: [
                'assets/images/Slack/Order missing/1.jpg',
                'assets/images/Slack/Order missing/2.jpg',
                'assets/images/Slack/Order missing/3.jpg',
                'assets/images/Slack/Order missing/4.jpg',
                'assets/images/Slack/Order missing/5.jpg'
            ],
            quiz: null
        },
        'facility_feedback': {
            images: [
                'assets/images/POPS/feedback/1.jpg',
                'assets/images/POPS/feedback/2.jpg'
            ],
            quiz: null
        },
        'driver_list': {
            images: [
                'assets/images/POPS/list/1.jpg',
                'assets/images/POPS/list/2.jpg',
                'assets/images/POPS/list/3.jpg',
                'assets/images/POPS/list/4.jpg',
                'assets/images/POPS/list/5.jpg'
            ],
            quiz: null
        },
        'time_slots': {
            images: [
                'assets/images/Cops/slot/1.jpg',
                'assets/images/Cops/slot/2.jpg',
                'assets/images/Cops/slot/3.jpg'
            ],
            quiz: null
        },
        'swap_orders': {
            images: [
                'assets/images/Cops/swap/1.jpg',
                'assets/images/Cops/swap/2.jpg'
            ],
            quiz: null
        },
        'cops_queries': {
            images: [
                'assets/images/Cops/query/1.jpg',
                'assets/images/Cops/query/2.jpg'
            ],
            quiz: null
        },
        'how_tags_work': {
            images: [
                'assets/images/How Tags work/0.jpg',
                'assets/images/How Tags work/1.jpg',
                'assets/images/How Tags work/2.jpg',
                'assets/images/How Tags work/3.jpg',
                'assets/images/How Tags work/4.jpg',
                'assets/images/How Tags work/5.jpg',
                'assets/images/How Tags work/6.jpg',
                'assets/images/How Tags work/7.jpg',
                'assets/images/How Tags work/8.jpg',
                'assets/images/How Tags work/9.jpg',
                'assets/images/How Tags work/10.jpg',
                'assets/images/How Tags work/11.jpg',
                'assets/images/How Tags work/12.jpg',
                'assets/images/How Tags work/13.jpg'
            ],
            quiz: null
        }
    };

    let currentWorkflowId = null;
    let currentSlide = 0;
    let maxSlideReached = 0;
    let navigationStack = [];
    let currentCategoryContext = { title: 'LOGS', items: logsSubCategories };

    // --- Expandable Search Bar ---
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const searchResults = document.getElementById('searchResults');

    // Toggle expansion
    searchToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
            searchResults.classList.remove('active');
            setTimeout(() => { searchResults.innerHTML = ''; searchResults.classList.add('hidden'); }, 300);
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && searchInput.classList.contains('active')) {
            searchInput.classList.remove('active');
            searchInput.value = '';
            searchResults.classList.remove('active');
            setTimeout(() => { searchResults.innerHTML = ''; searchResults.classList.add('hidden'); }, 300);
        }
    });

    // Generate search index flat map
    const searchIndex = [];

    logsSubCategories.forEach(item => searchIndex.push({ ...item, parent: 'LOGS' }));
    popsSubCategories.forEach(item => searchIndex.push({ ...item, parent: 'POPS' }));
    copsSubCategories.forEach(item => searchIndex.push({ ...item, parent: 'COPS' }));

    Object.keys(subCategories).forEach(catKey => {
        const catName = searchIndex.find(i => i.id === catKey)?.title || catKey;
        subCategories[catKey].forEach(item => searchIndex.push({ ...item, parent: catName }));
    });

    Object.keys(workflows).forEach(workKey => {
        const workflow = workflows[workKey];
        const workName = searchIndex.find(i => i.id === workKey)?.title || workKey;
        // Quizzes have been strictly removed from the search index context
        // to prevent users from seeing questions ahead of time.
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length === 0) {
            searchResults.classList.remove('active');
            setTimeout(() => { searchResults.innerHTML = ''; searchResults.classList.add('hidden'); }, 300);
            return;
        }

        const filtered = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.parent.toLowerCase().includes(query)
        );

        renderSearchResults(filtered);
    });

    function renderSearchResults(results) {
        searchResults.innerHTML = '';
        searchResults.classList.remove('hidden');
        setTimeout(() => searchResults.classList.add('active'), 10);

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found for your search.</div>';
            return;
        }

        results.forEach(item => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'search-result-item';
            resultDiv.innerHTML = `
                <div class="search-result-icon">${item.icon}</div>
                <div class="search-result-text">
                    <span class="search-result-title">${item.title}</span>
                    <span class="search-result-parent">${item.parent}</span>
                </div>
            `;

            resultDiv.addEventListener('click', () => {
                showMainHome();
                searchInput.classList.remove('active');
                searchInput.value = '';
                searchResults.classList.remove('active');
                setTimeout(() => { searchResults.innerHTML = ''; searchResults.classList.add('hidden'); }, 300);

                if (subCategories[item.id]) {
                    navigationStack.push({ view: 'home' });
                    showCategoryView(item.title, subCategories[item.id]);
                } else if (workflows[item.id]) {
                    navigationStack.push({ view: 'home' });
                    startWorkflow(item.id);
                } else {
                    alert('Feature coming soon!');
                }
            });

            searchResults.appendChild(resultDiv);
        });
    }
    // --- Navigation & View Helpers ---
    function hideAllViews() {
        mainCardsContainer.classList.add('hidden');
        categoryView.classList.add('hidden');
        driverCancellationView.classList.add('hidden');
        quizView.classList.add('hidden');
        customAlertModal.classList.add('hidden');
        wrongAnswerModal.classList.add('hidden');
        hintModal.classList.add('hidden');
        finalQuizView.classList.add('hidden');
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
        const userName = finalQuizUserNameInput.value.trim();
        if (!userName) {
            alert('Please enter your name to proceed.');
            return;
        }
        customAlertModal.classList.add('hidden');
        startFinalQuiz(userName);
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

        // Preload all images for this workflow
        if (workflow.images && workflow.images.length > 0) {
            workflow.images.forEach(imgSrc => {
                const img = new Image();
                img.src = imgSrc;
            });
        }

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

    // --- Final Quiz Data & Logic ---
    const finalQuizQuestions = [
        {
            question: "1. While logging in for the day, what is the 1st thing to be done?",
            options: ["Check for drivers", "Update Log in on Slack Channel", "Reply to pending threads", "Plan the routes"],
            correctAnswerIndex: 1
        },
        {
            question: "2. What is the mail id for Fleet team?",
            options: ["scout@laundyheap.com", "scout@laundryheap.uk", "scout@laundryheap.com", "Scout@laundryheap.com"],
            correctAnswerIndex: 2
        },
        {
            question: "3. When is a block published on When I Work?",
            options: ["When a driver cancels", "When a driver approaches for a block", "When there is a requirement", "To get more orders"],
            correctAnswerIndex: 2
        },
        {
            question: "4. What is the importance of Start time confirmation?",
            options: ["To make sure Driver is operating the block for the booked time.", "To make sure driver start early", "To make sure API plans a route for driver", "To make sure Delays are reduced"],
            correctAnswerIndex: 0
        },
        {
            question: "5. What needs to be done if a driver behaves inappropriately?",
            options: ["Raise Feedback to Fleet team with evidence", "Cancel his slot", "Tell the driver to Quit the platform", "Call the driver"],
            correctAnswerIndex: 0
        },
        {
            question: "6. How to identify a delay on LMFS",
            options: ["Yellow icon next to driver", "Grey icon next to driver", "Number with yellow icon next to driver", "Red icon next to driver"],
            correctAnswerIndex: 2
        },
        {
            question: "7. If a facility has hit capacity , what needs to be done?",
            options: ["Inform leads to close the market", "Check if tasks can be moved to other FAC", "Take additional driver", "Inform POPS team to inform Facility about the surge."],
            correctAnswerIndex: 1
        },
        {
            question: "8. How to check if the test slot is a good fit to the platform?",
            options: ["By calling and understanding the driver", "If he is slow on the route", "Monitor punctuality, pace and photos taken", "If he is asking less fee compared to other drivers"],
            correctAnswerIndex: 2
        },
        {
            question: "9. What is LMFS?",
            options: ["Last Mile Fleet System", "Localised Mile Fleet Services", "Last Movement Freight System", "Last Mile Fleet Solution"],
            correctAnswerIndex: 3
        },
        {
            question: "10. What needs to be done when a last minute cancellation happens?",
            options: ["Split the route with other drivers", "Try to find the replacement if it’s busy", "Request leads to close the region", "Choose an option depending on the market situation"],
            correctAnswerIndex: 3
        },
        {
            question: "11. While rescheduling the orders, how do you decide the new time slot?",
            options: ["Assign the first time slot seen on the backend.", "Check the task location and assign a slot", "Consider the days business and assign a suitable slot", "Check with COPS"],
            correctAnswerIndex: 2
        },
        {
            question: "12. What is the important point in Route Reassignment?",
            options: ["Should be only done by Leads", "Driver should not have active tasks", "Route Reassignment should be done on LMFS", "All of the above"],
            correctAnswerIndex: 1
        },
        {
            question: "13. For System, what is the important data in a TAG?",
            options: ["Order ID", "Customer name", "QR Code", "Barcode"],
            correctAnswerIndex: 2
        },
        {
            question: "14. Why Feedbacks are raised for Product planning issues?",
            options: ["To increase workload of Product team", "To remove the bugs of product", "To improve planning logic", "To improve Customer Experience"],
            correctAnswerIndex: 2
        },
        {
            question: "15. Where do we publish slots?",
            options: ["Slack", "WhatsApp", "When I Work", "LMFS"],
            correctAnswerIndex: 2
        },
        {
            question: "16. What is the purpose of monitoring driver performance?",
            options: ["To reduce the number of drivers", "To ensure service quality and efficiency", "To reduce delays", "To increase customer rating"],
            correctAnswerIndex: 1
        },
        {
            question: "17. Why is route optimization important?",
            options: ["To reduce driver earnings", "To complete tasks efficiently and reduce travel time", "To control cost", "To increase system workload"],
            correctAnswerIndex: 1
        },
        {
            question: "18. While monitoring LMFS, you notice a driver moving in the opposite direction of the assigned task location. What should you do?",
            options: ["Immediately reassign the task to avoid delay.", "Contact the driver to confirm the reason for deviation", "Cancel the driver’s route", "Ignore it since GPS may be incorrect"],
            correctAnswerIndex: 1
        },
        {
            question: "19. A driver reports that the LMFS app is not updating task status even after completion. What should be the most appropriate response?",
            options: ["Ask the driver to ignore and continue", "Complete the order manually from Admin end.", "Ask the driver to try troubleshooting steps and report the issue if it persists", "Reassign all tasks immediately"],
            correctAnswerIndex: 2
        },
        {
            question: "20. A driver cancels a block 15 minutes before start time and the market demand is moderate. What should be done?",
            options: ["Immediately publish a new block on the platform", "Split the route between available active drivers if possible", "Cancel all orders assigned to that block", "Wait until customers complain"],
            correctAnswerIndex: 1
        }
    ];

    let finalQuizCurrentQuestionIndex = 0;
    let finalQuizScoreCount = 0;
    let finalQuizSelectedOptionIndex = null;
    let finalQuizUserName = "";
    let finalQuizUserResponses = [];

    // Assuming hideAllViews() exists elsewhere in the full script
    // Adding the required line to hideAllViews()
    // function hideAllViews() {
    //     homeView.classList.add('hidden');
    //     categoryView.classList.add('hidden');
    //     driverCancellationView.classList.add('hidden');
    //     quizView.classList.add('hidden');
    //     finalQuizView.classList.add('hidden'); // Added this line
    // }

    function startFinalQuiz(userName) {
        finalQuizUserName = userName;
        finalQuizUserResponses = [];
        hideAllViews();
        finalQuizView.classList.remove('hidden');
        finalQuizHomeBtn.classList.remove('hidden');
        finalQuizCard.classList.remove('hidden');
        finalQuizResultArea.classList.add('hidden');

        finalQuizCurrentQuestionIndex = 0;
        finalQuizScoreCount = 0;

        loadFinalQuizQuestion();
    }

    function loadFinalQuizQuestion() {
        const questionData = finalQuizQuestions[finalQuizCurrentQuestionIndex];
        finalQuizSelectedOptionIndex = null;

        // Reset animations
        finalQuizCard.classList.remove('fade-in');
        void finalQuizCard.offsetWidth; // trigger reflow
        finalQuizCard.classList.add('fade-in');

        // Update Progress
        finalQuizProgressText.textContent = `Question ${finalQuizCurrentQuestionIndex + 1} / ${finalQuizQuestions.length}`;
        const progressPercentage = ((finalQuizCurrentQuestionIndex) / finalQuizQuestions.length) * 100;
        finalQuizProgress.style.width = `${progressPercentage}%`;

        // Update Text
        finalQuizQuestion.textContent = questionData.question;
        finalQuizOptions.innerHTML = '';
        finalQuizNextBtn.classList.add('hidden');
        finalQuizSubmitBtn.classList.add('hidden');
        finalQuizNextBtn.disabled = false;
        finalQuizSubmitBtn.disabled = false;

        questionData.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => handleFinalQuizOptionSelect(index, btn));
            finalQuizOptions.appendChild(btn);
        });
    }

    function handleFinalQuizOptionSelect(index, selectedBtn) {
        // Clear previous selections visually
        const previouslySelected = finalQuizOptions.querySelector('.option-btn.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }

        selectedBtn.classList.add('selected');
        finalQuizSelectedOptionIndex = index;

        // Show contextually Next or Submit button
        if (finalQuizCurrentQuestionIndex === finalQuizQuestions.length - 1) {
            finalQuizSubmitBtn.classList.remove('hidden');
            finalQuizNextBtn.classList.add('hidden');
        } else {
            finalQuizNextBtn.classList.remove('hidden');
            finalQuizSubmitBtn.classList.add('hidden');
        }
    }

    function processFinalQuizAnswer() {
        if (finalQuizSelectedOptionIndex === null) return;

        const questionData = finalQuizQuestions[finalQuizCurrentQuestionIndex];
        const buttons = finalQuizOptions.querySelectorAll('.option-btn');

        // Disable all buttons to prevent double-clicking
        buttons.forEach(btn => btn.disabled = true);
        finalQuizNextBtn.disabled = true;
        finalQuizSubmitBtn.disabled = true;

        if (finalQuizSelectedOptionIndex === questionData.correctAnswerIndex) {
            finalQuizScoreCount++;
        }

        finalQuizUserResponses.push({
            question: questionData.question,
            selected: questionData.options[finalQuizSelectedOptionIndex],
            isCorrect: finalQuizSelectedOptionIndex === questionData.correctAnswerIndex
        });

        // Advance immediately without showing correct/wrong feedback
        finalQuizCurrentQuestionIndex++;
        if (finalQuizCurrentQuestionIndex < finalQuizQuestions.length) {
            loadFinalQuizQuestion();
        } else {
            showFinalQuizResult();
        }
    }

    finalQuizNextBtn.addEventListener('click', processFinalQuizAnswer);
    finalQuizSubmitBtn.addEventListener('click', processFinalQuizAnswer);

    function showFinalQuizResult() {
        finalQuizCard.classList.add('hidden');
        finalQuizHomeBtn.classList.remove('hidden');
        finalQuizResultArea.classList.remove('hidden');
        finalQuizProgress.style.width = '100%';

        const passMark = Math.ceil(finalQuizQuestions.length * 0.8); // 80% to pass
        const passed = finalQuizScoreCount >= passMark;

        finalQuizScore.textContent = `${finalQuizScoreCount} / ${finalQuizQuestions.length}`;

        if (passed) {
            finalQuizMessage.textContent = "Excellent work! Your submission has been recorded.";
            finalQuizMessage.style.color = "#28a745";
            finalQuizResultArea.querySelector('div').textContent = '✅';
        } else {
            finalQuizMessage.textContent = "Your submission has been recorded. Good try, but you need to refresh your knowledge.";
            finalQuizMessage.style.color = "#dc3545";
            finalQuizResultArea.querySelector('div').textContent = '📚';
        }

        submitToGoogleForms(finalQuizUserName, finalQuizScoreCount, finalQuizUserResponses);
    }

    function submitToGoogleForms(name, score, responses) {
        const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLScEMSH7bIZ01zUaFnAKLwD3Xvs3E02ksB_QizaCEb4mi4p1KA/formResponse';

        const nameEntryID = 'entry.140151157';
        const scoreEntryID = 'entry.286756535';
        const totalEntryID = 'entry.1147528875';
        const responsesEntryID = 'entry.950717047';

        const formData = new URLSearchParams();
        formData.append(nameEntryID, name);
        formData.append(scoreEntryID, score);
        formData.append(totalEntryID, finalQuizQuestions.length);

        // Convert responses array to a readable string format
        const responsesText = responses.length > 0 ? JSON.stringify(responses) : "Completed Quiz";
        formData.append(responsesEntryID, responsesText);

        console.log("Submitting directly to Google Forms...");

        // Note: Google Forms does not return a CORS-friendly response. 
        // We catch the opaque response and assume 'no-cors' success.
        fetch(formURL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
            .then(() => console.log('Form submitted successfully hidden in background.'))
            .catch(error => console.error('Form Submission Error:', error));
    }

    finalQuizRestartBtn.addEventListener('click', () => {
        // Hide quiz but potentially re-prompt for name if they want to retake differently,
        // or just let them retake under the same name.
        startFinalQuiz(finalQuizUserName);
    });

    finalQuizHomeBtn.addEventListener('click', () => {
        showMainHome();
    });
});
