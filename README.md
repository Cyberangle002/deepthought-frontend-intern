# DeepThought - Dynamic Learning Dashboard

A modern, interactive learning dashboard designed for students to track progress, explore courses, and manage achievements. Built using **HTML, CSS, and JavaScript**.

---

## 📁 Project Structure



deepthought-frontend/
│
├── index.html # Main dashboard HTML
├── style.css # Main CSS styles
├── script.js # JavaScript functionality
├── README.md # Project documentation
├── assets/ # Images, icons, and other static assets
│ ├── logo.png
│ ├── bg-orbs/
│ └── ...
└── data/ # Optional JSON data for dynamic elements
└── courses.json


---

## 💻 Features

- 🎯 Interactive Dashboard
- 📚 Course filtering by category (Frontend, Backend, Database, DevOps)
- 📊 Dynamic learning statistics
- 🏆 Achievement tracking
- 🌈 Animated backgrounds and modern UI
- 💌 Newsletter subscription section
- 🌐 Footer with social links, stats, badges, and gradient text

---

## ⚡ How to Run Locally

1. **Download / Clone the repository**

```bash
git clone <repository_url>


Navigate to the project folder

cd deepthought-frontend


Open index.html in your browser

Double-click index.html

Or right-click → Open with → Browser

No server required since this is a static frontend project.

🛠️ Optional Setup for Dynamic Data

If you want to make it dynamic using JSON data:

Place your JSON files in the data/ folder.

Update script.js to fetch and render data dynamically:

fetch('data/courses.json')
  .then(res => res.json())
  .then(data => {
      // Populate courses grid dynamically
  });


This will allow you to add/edit courses without modifying HTML.

🌐 Browser Compatibility

Tested on Chrome, Edge, and Firefox

Fully responsive for desktop, tablet, and mobile

🎨 Styling

Modern gradient backgrounds

Glassmorphism cards

Gradient text with background-clip and -webkit-background-clip

Hover animations for cards and buttons

Animated social icons and badges

📝 Notes

Emojis are used in the dashboard headings and section titles for UI engagement

Footer and copyright text is emoji-free

The project is frontend only. Backend integration can be added separately using Node.js or any API server.

🚀 Contribution

Fork the repository

Create your feature branch (git checkout -b feature-name)

Commit changes (git commit -m 'Add feature')

Push to the branch (git push origin feature-name)

Open a Pull Request

📞 Contact

Developer: Aditi Shyam Pandit
Email: aditipandit1331@gmail.com

LinkedIn: https://www.linkedin.com/in/aditipandit002/
