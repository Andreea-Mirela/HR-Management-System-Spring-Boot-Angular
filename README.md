# 📊 HRLink - Human Resource Management System | Spring Boot & Angular 

**🎓 Master's Thesis Project | June 2023**

HRLink is an advanced system designed to improve how companies manage their employees. It uses modern technology to simplify HR tasks, enhance user access, and boost engagement, ultimately improving business performance.

## 🌐 Overview

HRLink focuses on making employee training and development easier and more effective. The system supports two main user roles:

- **HR Specialists:** Manage employee profiles, assign user roles, and oversee training programs.
- **Employees:** Access training courses, participate in learning activities, and earn rewards.

### 🔑 Key Features

#### For HR Specialists:
- **Flexible Course Management:** Easily create, manage, and organize various training courses with text and video content.
- **Employee Profile Management:** Add, modify, and delete employee profiles, and assign user roles.
- **Video Conferencing:** Conduct video meetings directly within the app.
- **Training Program Customization:** Define key attributes for each training program, including a logo, theoretical content, video materials, and interactive quizzes.

#### For Employees:
- **Training Access:** View and complete various training programs with a mix of theoretical and video content.
- **Interactive Learning:** Take quizzes to test knowledge and understanding of training materials.
- **Rewards System:** Earn points for completing training courses, which can be redeemed for various rewards.
- **Personal Notes:** Use an integrated notes tool to write down thoughts, questions, or summaries while reviewing content, and download notes as PDFs for future reference.

## 💻 Technologies Used

- **Backend:** Spring Boot, Spring Data JPA, MySQL Driver, Lombok
- **Frontend:** Angular, Bootstrap
- **Database:** MySQL
- **Authentication:** Okta
- **Testing:** Postman

## 🌟 Additional Services Used

HRLink integrates with several external services to enhance functionality and user experience:

- **Elastic Email:** Integrated for automated email sending and management within HRLink.
- **Alan AI Studio:** Utilized to integrate a virtual learning assistant within the application.
- **Jitsi Meet:** Platform used for implementing video conferencing connections between users within HRLink.

---

## 🖥️ Application Design Overview

### 📄 Screen Maps and Mockups

1. **Application Screen Map**
   - Overview of the application's main screens and navigation flow.
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/26aa2efe-3ec6-4ba9-9208-7a8e08fbe4da" width="70%">


2. **Mockups of Key Screens**
   - Mockups showcasing the design and layout of important screens.
   <p style="text-align:center;">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/ad6ecf5a-8f0c-40b4-999b-6888232c9742" width="50%" style="display:block; margin:0 auto;">
   </p>
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/1b1e8660-cf98-45c5-b302-7cf0286b8c37" width="40%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/85ff99df-6523-419b-a256-e0c40c25fd88" width="40%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/ea21bb6f-b9b9-4b45-b695-f725225be3aa" width="40%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/17d574e5-f680-4983-94d1-5a48bd75b940" width="40%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/c26415e7-fadf-413c-b0ef-34ece412b1b4" width="40%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/5363a7bd-a343-4d1d-89a8-8df0b1f39949" width="40%">

---

### 🗄️ Database Schema Design

#### Database Schema Overview

1. **Entity Relationship Diagram (ERD)**
   - Diagram illustrating the structure and relationships in the database schema.
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/4ed09ba0-171a-4e37-b8b2-8d13d5510441" width="60%">

---

## 🔐 User Authentication and Authorization

### Authentication Screens and User Management

1. **Login Interface**
   - Screenshot of the login interface within HRLink.
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/7c7e9b0e-ff33-4a92-9082-2f906cfeca91" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/84b15751-2c53-4b4c-8055-39e7bafae1b9" width="28%">

2. **Okta User Administration**
   - Screenshot of the Okta dashboard for user administration.
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/86a2f0d5-0603-4a4a-ac38-21c0106e9a9c" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/10e6102e-3d1d-4fa9-b8ed-4b279bc2d762" width="60%">

---

## 👥 Employee Management

### Employee Management Module

1. **Employee Profiles**
   - Screenshots of how employee profiles are managed within the application.
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/f507ad36-c0e3-4b0f-be55-990562c54671" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/89b03d6a-10ea-4a1a-827f-034cd7c3246d" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/f4e0cd6e-d144-4c31-a2ee-77dbf966dc6b" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/366fce90-4bde-47eb-ae8b-a12ab5effc4a" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/40ac5959-d68d-4aec-9d92-84b2f5f08190" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/1041c511-2c8d-4fae-9454-9ba2c3df2e71" width="80%">

---

## 📘 Course Configuration and Deployment

### Training Course Configuration

1. **Course Management Interface**
   - Screenshots demonstrating how training courses are configured and deployed.
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/da518cc5-3712-4745-b0a6-d98a3e0a8cfa" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/7ae4c56a-719d-4b42-97d2-fed6d826317a" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/aba5b20e-275f-4e9e-9fd1-8a44da3f55d2" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/2671a818-421d-467f-ab44-9ffb1daf2e1f" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/61cb0481-56ed-451d-a041-dabbe335ac1a" width="20%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/fc12203d-498c-4eb9-9be1-3accc0ca5283" width="30%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/556cd7a0-c598-4ed7-bcdd-8942c039abee" width="30%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/e724f88e-42d9-4bc9-aa51-9e2fbc4c54f6" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/ad9ad594-2220-4d90-b85b-954199a09cac" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/15bff582-56fa-4bd9-91e5-89a8de11a960" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/0fe3007a-764c-4058-afac-2aac37225b50" width="80%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/b426148c-2608-401d-8430-2dfffb0fa19c" width="30%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/d4f8a2c9-1679-4f1d-a4c6-be82a4931ca8" width="50%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/a5041661-43b2-44ec-a57b-9e051fdfa0b3" width="25%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/9e90e01f-6011-474b-a19a-b01deeb5110d" width="25%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/a333a1af-3bc1-4986-9417-2fec1ca13315" width="25%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/46cfa9e9-26d5-49ad-a608-717c866c1f1a" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/ef4399f0-67b3-4416-b3ec-fbe4d92fe8c6" width="60%">
---

## 🏆 Employee Rewards Module

### Rewards and Points System

1. **Rewards Module Interface**
   - Screenshots showing how the rewards system works and how employees earn points.
   <p>
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/408d93f5-55c6-4563-a023-c8cf99d2ab49" width="30%">
   </p>
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/e639bdd7-5acf-48a6-b762-400d441ec71f" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/55f8729c-25d1-4cdb-b22c-747e88502f94" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/fff2253c-bea1-4869-8734-b641941c15d6" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/cd64275e-181b-4d13-ba99-6f3484436bcd" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/6d8c8b3d-8c9a-4adb-a016-a0147592f5a0" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/3c988889-74ba-45d5-a94f-dc6f06fa8d87" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/93c55579-6267-4f59-b190-c8af9010f47c" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/27f877fb-4a26-4e74-a7a2-027bbec6bad8" width="60%">
   <p>
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/f7201914-e685-48c6-93af-0b7e134cee92" width="30%">
     </p>
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/aae59575-4606-472d-8b5d-aefd8ada8141" width="60%">
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/60593790-3322-4c9a-b3be-86c34b08fbf9" width="60%">
   <p>
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/254792ae-c6de-4969-a9c0-0a80c9b12274" width="30%">
     </p>
   <img src="https://github.com/Andreea-Mirela/HR-Management-System-Spring-Boot-Angular/assets/111393279/b137d84e-2cfc-419c-a925-04f3c63ec0f1" width="60%">

---
