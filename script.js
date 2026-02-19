document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const searchInput = document.getElementById('searchInput');
    const mainCardsContainer = document.querySelector('.cards-container');
    const searchResultsContainer = document.getElementById('searchResults');

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
    const quizHomeBtn = document.getElementById('quizHomeBtn');

    // --- State Variables ---
    const logsSubCategories = [
        { title: 'Driver cancellation', icon: '🚫', id: 'driver_cancel' },
        { title: 'Vehicle breakdown', icon: '🔧', id: 'vehicle_breakdown' },
        { title: 'Payment Queries', icon: '�', id: 'payment_query' },
        { title: 'When i Work', icon: '📅', id: 'when_i_work' },
        { title: 'Feedbacks', icon: '💬', id: 'feedbacks' },
        { title: 'Driver Mapping', icon: '🗺️', id: 'driver_mapping' },
        { title: 'Fleet Dashboard', icon: '�', id: 'fleet_dashboard' },
        { title: 'How Tags work', icon: '🏷️', id: 'how_tags_work' },
        { title: 'LH BackOffice', icon: '🏢', id: 'lh_backoffice' },
        { title: 'Slack & Threads', icon: '#️⃣', id: 'slack_threads' },
        { title: 'Communication', icon: '🗣️', id: 'communication' },
        { title: 'General Etiquette', icon: '🤝', id: 'general_etiquette' }
    ];

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
                    "check with another driver for delivery",
                    "check if the break down can be fixed for delivery",
                    "go to logistics tab and do route reassignment there while both drivers are having active task",
                    "go to logistics tab and do route reassignment there"
                ],
                correctAnswer: "go to logistics tab and do route reassignment there"
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
        }
    };

    let currentWorkflowId = null;
    let currentSlide = 0;
    let maxSlideReached = 0;

    // --- Mock Data for Global Search ---
    const templates = [
        { title: 'Payment Issue', category: 'LOGS', content: 'Customer initiated payment dispute...' },
        { title: 'Driver Late', category: 'COPS', content: 'Driver is running 15 mins late...' },
        { title: 'Partner Onboarding', category: 'POPS', content: 'New partner documents checklist...' },
        { title: 'General Refund', category: 'Template', content: 'Process for general refunds...' }
    ];

    // --- Search Functionality ---
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        if (query.length > 0) {
            displayResults(templates.filter(t =>
                t.title.toLowerCase().includes(query) ||
                t.content.toLowerCase().includes(query)
            ));
            hideAllViews();
            searchResultsContainer.classList.remove('hidden');
        } else {
            searchResultsContainer.classList.add('hidden');
            mainCardsContainer.classList.remove('hidden'); // Default back to home
        }
    });

    function displayResults(results) {
        searchResultsContainer.innerHTML = '';
        if (results.length === 0) {
            searchResultsContainer.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">No templates found.</p>';
            return;
        }
        results.forEach(item => {
            const card = document.createElement('div');
            card.className = 'result-item';
            card.innerHTML = `<h3>${item.title}</h3><span class="badge">${item.category}</span><p>${item.content}</p>`;
            searchResultsContainer.appendChild(card);
        });
    }

    // --- Navigation & View Helpers ---
    function hideAllViews() {
        mainCardsContainer.classList.add('hidden');
        categoryView.classList.add('hidden');
        driverCancellationView.classList.add('hidden');
        quizView.classList.add('hidden');
        searchResultsContainer.classList.add('hidden');
    }

    function showMainHome() {
        hideAllViews();
        mainCardsContainer.classList.remove('hidden');
        searchInput.value = '';
    }

    // --- Card Interaction (Home) ---
    document.querySelectorAll('.cards-container > .card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            if (category === 'Template') {
                window.location.href = 'https://nikhilsk-lh.github.io/LH_Template/';
            } else if (category === 'LOGS') {
                showCategoryView('LOGS', logsSubCategories);
            } else {
                alert('Feature coming soon!');
            }
        });
    });

    // --- Category View Logic ---
    function showCategoryView(title, items) {
        hideAllViews();
        categoryView.classList.remove('hidden');
        categoryTitle.textContent = title;
        categoryCardsContainer.innerHTML = '';

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<div class="icon">${item.icon}</div><h2>${item.title}</h2>`;
            card.addEventListener('click', () => {
                if (workflows[item.id]) {
                    startWorkflow(item.id);
                } else {
                    alert(`${item.title} workflow is coming soon!`);
                }
            });
            categoryCardsContainer.appendChild(card);
        });
    }

    backButton.addEventListener('click', showMainHome);

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
        showCategoryView('LOGS', logsSubCategories);
    });

    markCompleteBtn.addEventListener('click', () => {
        showQuizView();
    });

    // --- Quiz Logic ---
    function showQuizView() {
        hideAllViews();
        quizView.classList.remove('hidden');
        resetQuiz();
        renderQuiz();
    }

    function renderQuiz() {
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
        quizHomeBtn.classList.add('hidden');
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
            quizResult.textContent = '✅ Correct!';
            quizResult.style.color = 'green';
        } else {
            quizResult.textContent = '❌ Incorrect. Please try again.';
            quizResult.style.color = 'red';
        }

        submitQuizBtn.classList.add('hidden');
        quizHomeBtn.classList.remove('hidden');
    });

    quizHomeBtn.addEventListener('click', showMainHome);
});
