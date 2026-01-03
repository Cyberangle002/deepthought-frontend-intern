// ================= JSON DATA =================
const coursesData = {
    courses: [
        {
            id: 1,
            title: "React Native Mastery",
            description: "Build powerful cross-platform mobile applications with React Native. Learn navigation, state management, and native modules.",
            category: "frontend",
            difficulty: "medium",
            duration: "8 weeks",
            progress: 65,
            icon: "📱",
            lessons: 42,
            enrolled: 1850,
            instructor: "Sarah Chen",
            rating: 4.8
        },
        {
            id: 2,
            title: "Node.js & Express Deep Dive",
            description: "Master backend development with Node.js and Express. Build RESTful APIs, authentication systems, and microservices.",
            category: "backend",
            difficulty: "medium",
            duration: "10 weeks",
            progress: 40,
            icon: "🚀",
            lessons: 56,
            enrolled: 2340,
            instructor: "Michael Rodriguez",
            rating: 4.9
        },
        {
            id: 3,
            title: "MongoDB Database Design",
            description: "Learn NoSQL database design patterns, indexing strategies, aggregation pipelines, and performance optimization.",
            category: "database",
            difficulty: "easy",
            duration: "6 weeks",
            progress: 85,
            icon: "🗄️",
            lessons: 38,
            enrolled: 1560,
            instructor: "Priya Sharma",
            rating: 4.7
        },
        {
            id: 4,
            title: "Advanced JavaScript Patterns",
            description: "Master design patterns, closures, prototypes, async programming, and modern ES6+ features in vanilla JavaScript.",
            category: "frontend",
            difficulty: "hard",
            duration: "12 weeks",
            progress: 25,
            icon: "⚡",
            lessons: 68,
            enrolled: 2890,
            instructor: "Alex Turner",
            rating: 4.9
        },
        {
            id: 5,
            title: "Apache Kafka Streaming",
            description: "Build real-time data pipelines and streaming applications with Apache Kafka. Learn producers, consumers, and stream processing.",
            category: "devops",
            difficulty: "hard",
            duration: "8 weeks",
            progress: 15,
            icon: "🔄",
            lessons: 45,
            enrolled: 980,
            instructor: "David Kim",
            rating: 4.6
        },
        {
            id: 6,
            title: "Nginx Configuration & Optimization",
            description: "Master web server configuration, load balancing, caching strategies, and security best practices with Nginx.",
            category: "devops",
            difficulty: "medium",
            duration: "5 weeks",
            progress: 92,
            icon: "🌐",
            lessons: 32,
            enrolled: 1230,
            instructor: "Emma Watson",
            rating: 4.8
        },
        {
            id: 7,
            title: "Full Stack JavaScript",
            description: "Complete full-stack development with MERN stack. Build production-ready applications from scratch.",
            category: "frontend",
            difficulty: "hard",
            duration: "16 weeks",
            progress: 50,
            icon: "💻",
            lessons: 92,
            enrolled: 3450,
            instructor: "John Smith",
            rating: 4.9
        },
        {
            id: 8,
            title: "REST API Design",
            description: "Learn RESTful API architecture, versioning, authentication, documentation, and best practices.",
            category: "backend",
            difficulty: "easy",
            duration: "4 weeks",
            progress: 70,
            icon: "🔌",
            lessons: 28,
            enrolled: 1780,
            instructor: "Lisa Anderson",
            rating: 4.7
        }
    ]
};

// ================= STATE MANAGEMENT =================
let currentFilter = 'all';
let searchQuery = '';
let sortBy = 'default';

// ================= CALCULATE STATISTICS =================
function calculateStats() {
    const total = coursesData.courses.length;
    const completed = coursesData.courses.filter(c => c.progress >= 90).length;
    const inProgress = coursesData.courses.filter(c => c.progress > 0 && c.progress < 90).length;
    const totalHours = coursesData.courses.reduce((sum, c) => {
        const weeks = parseInt(c.duration);
        return sum + (weeks * 5);
    }, 0);

    return { total, completed, inProgress, totalHours };
}

// ================= RENDER STATISTICS =================
function renderStats() {
    const stats = calculateStats();
    const statsGrid = document.getElementById('statsGrid');

    const statsData = [
        { icon: '📚', number: stats.total, label: 'Total Courses' },
        { icon: '✅', number: stats.completed, label: 'Completed' },
        { icon: '🔥', number: stats.inProgress, label: 'In Progress' },
        { icon: '⏱️', number: stats.totalHours, label: 'Learning Hours' }
    ];

    statsGrid.innerHTML = statsData.map((stat, index) => `
        <div class="stat-card" style="animation-delay: ${index * 0.1}s">
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join('');
}

// ================= FILTER & SORT COURSES =================
function filterAndSortCourses() {
    let filtered = coursesData.courses.filter(course => {
        const matchesFilter = currentFilter === 'all' || course.category === currentFilter;
        const matchesSearch = 
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Sort courses
    if (sortBy === 'progress') {
        filtered.sort((a, b) => b.progress - a.progress);
    } else if (sortBy === 'difficulty') {
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    } else if (sortBy === 'enrolled') {
        filtered.sort((a, b) => b.enrolled - a.enrolled);
    }

    return filtered;
}

// ================= RENDER COURSES =================
function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    const filteredCourses = filterAndSortCourses();

    if (filteredCourses.length === 0) {
        coursesGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h2>No courses found</h2>
                <p>Try adjusting your filters or search query</p>
            </div>
        `;
        return;
    }

    coursesGrid.innerHTML = filteredCourses.map((course, index) => `
        <div class="course-card" onclick="openModal(${course.id})" style="animation-delay: ${index * 0.1}s">
            <div class="course-header">
                ${course.icon}
            </div>
            <div class="course-body">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                
                <div class="course-meta">
                    <span class="difficulty-badge difficulty-${course.difficulty}">
                        ${course.difficulty}
                    </span>
                    <span class="course-lessons">📖 ${course.lessons} lessons</span>
                </div>

                <div class="progress-container">
                    <div class="progress-label">
                        <span>Progress</span>
                        <span>${course.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                </div>

                <div class="course-footer">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); startCourse(${course.id})">
                        ${course.progress > 0 ? '▶️ Continue' : '🚀 Start Course'}
                    </button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); viewDetails(${course.id})">
                        📋 Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ================= OPEN MODAL =================
function openModal(courseId) {
    const course = coursesData.courses.find(c => c.id === courseId);
    const modal = document.getElementById('courseModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="modal-header">
            <span class="modal-icon">${course.icon}</span>
            <div>
                <h2>${course.title}</h2>
            </div>
        </div>

        <p class="modal-description">${course.description}</p>

        <div class="modal-details">
            <div class="detail-item">
                <div class="detail-label">Duration</div>
                <div class="detail-value">${course.duration}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Lessons</div>
                <div class="detail-value">${course.lessons}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Difficulty</div>
                <div class="detail-value">${course.difficulty}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Students Enrolled</div>
                <div class="detail-value">${course.enrolled.toLocaleString()}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Instructor</div>
                <div class="detail-value">${course.instructor}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Rating</div>
                <div class="detail-value">⭐ ${course.rating}</div>
            </div>
        </div>

        <div class="progress-container">
            <div class="progress-label">
                <span>Your Progress</span>
                <span>${course.progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
        </div>

        <div class="course-footer">
            <button class="btn btn-primary" onclick="startCourse(${course.id})">
                ${course.progress > 0 ? '▶️ Continue Learning' : '🚀 Start Course'}
            </button>
            <button class="btn btn-secondary" onclick="closeModal()">
                ❌ Close
            </button>
        </div>
    `;

    modal.classList.add('active');
}

// ================= CLOSE MODAL =================
function closeModal() {
    document.getElementById('courseModal').classList.remove('active');
}

// ================= START COURSE =================
function startCourse(courseId) {
    const course = coursesData.courses.find(c => c.id === courseId);
    alert(`🚀 Launching "${course.title}"!\n\n✨ Get ready to start learning with ${course.instructor}\n📚 ${course.lessons} lessons await you!`);
    closeModal();
}

// ================= VIEW DETAILS =================
function viewDetails(courseId) {
    openModal(courseId);
}

// ================= EVENT LISTENERS =================

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderCourses();
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        renderCourses();
    });
});

// Sort dropdown
document.getElementById('sortCourses').addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderCourses();
});

// Modal close button
document.getElementById('modalClose').addEventListener('click', closeModal);

// Click outside modal to close
document.getElementById('courseModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Keyboard support - ESC to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ================= HEADER ACTION BUTTONS =================

// Refresh button
document.getElementById('btnRefresh').addEventListener('click', () => {
    // Animation effect
    const btn = document.getElementById('btnRefresh');
    btn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        btn.style.transform = 'rotate(0deg)';
    }, 500);
    
    // Refresh data
    renderStats();
    renderCourses();
    alert('🔄 Dashboard refreshed successfully!');
});

// Add Course button
document.getElementById('btnAddCourse').addEventListener('click', () => {
    alert('➕ Add New Course\n\nThis feature will allow you to enroll in new courses.\n\n🚀 Coming soon!');
});

// ================= NEWSLETTER SUBSCRIPTION =================
document.getElementById('newsletterBtn').addEventListener('click', function() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    
    if (email && email.includes('@')) {
        alert(`🎉 Thank you for subscribing!\n\n✉️ Welcome email sent to: ${email}\n\n🎓 Stay tuned for updates!`);
        emailInput.value = '';
    } else {
        alert('⚠️ Please enter a valid email address');
    }
});

// Newsletter input - Enter key support
document.getElementById('newsletterEmail').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('newsletterBtn').click();
    }
});

// ================= USER AVATAR INTERACTION =================
document.querySelector('.user-avatar').addEventListener('click', () => {
    alert('👤 User Profile\n\nName: DeepThought Student\nEmail: student@deepthought.edu\nCourses Enrolled: 8\n\n⚙️ Profile settings coming soon!');
});

// ================= SMOOTH SCROLL FOR NAVIGATION =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================= ACHIEVEMENT CARDS CLICK =================
document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        const description = this.querySelector('p').textContent;
        alert(`🏆 Achievement Unlocked!\n\n${title}\n${description}\n\n🎉 Keep up the great work!`);
    });
});

// ================= INITIALIZE DASHBOARD =================
function initializeDashboard() {
    console.log('🚀 DeepThought Dashboard Initialized');
    console.log(`📊 Total Courses: ${coursesData.courses.length}`);
    
    renderStats();
    renderCourses();
    
    // Welcome message
    setTimeout(() => {
        console.log('✨ Welcome to DeepThought Learning Dashboard!');
    }, 1000);
}

// ================= PAGE LOAD =================
window.addEventListener('load', () => {
    initializeDashboard();
    console.log('✅ Page loaded successfully!');
    console.log('⏱️ Load time:', performance.now().toFixed(2), 'ms');
});

// ================= PERFORMANCE MONITORING =================
window.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded');
});

// ================= CONSOLE STYLING (Optional) =================
console.log('%c🎓 DeepThought Learning Dashboard', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c✨ Built with HTML, CSS, and Vanilla JavaScript', 'font-size: 14px; color: #764ba2;');
console.log('%c💡 Task 2: Dynamic Elements with JSON', 'font-size: 12px; color: #f093fb;');