# 💚 HeartBids – Auctions for a Cause

![HeartBids Banner](https://github.com/user-attachments/assets/05522289-f876-4235-af27-0bca3377ca0d)

**HeartBids** is an auction platform built with **React**, where users can donate, bid, and win items to support charitable causes. Earn credits by listing auctions, use them to bid on exciting items, and make a difference with every transaction.

🌍 **Built to empower giving.** **Designed for seamless bidding.**

[💚 Live Demo](https://heartbids.netlify.app/) | [📂 Repository](https://github.com/taraolivia/heartbids-with-react)

---

## 📌 Features

✅ **User Authentication** – Secure login and registration with `stud.noroff.no` emails.  
✅ **Auctions & Bidding** – Create, browse, and bid on listings with real-time updates.  
✅ **Credit System** – Users start with 1000 credits and earn more by selling items.  
✅ **Profile Customization** – Upload avatars and track bidding history.  
✅ **Filtering & Search** – Find relevant auctions quickly using dynamic filters.  
✅ **Charity Integration** – Select a charity, and its logo appears on your profile.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context (User & Filter Contexts)
- **API Integration:**
  - **Noroff Auction API** – Manages auction-related data (listings, bids, profiles).  
  - **HeartBids Firebase API** – Stores additional user data, charity integrations, and custom features.  
- **Hosting:** Netlify

---

## 🔥 HeartBids API (Firebase-based)

In addition to integrating with the **Noroff Auction API**, HeartBids includes a **custom Firebase API** to enhance the user experience.

### **🔹 Features of the HeartBids API**
- **Stores additional user profile data** (beyond what the Noroff API provides).  
- **Handles charity integrations** (e.g., linking users to selected charities).  
- **Manages custom app features** that extend the Noroff API, such as:
  - Charity logos displayed on profiles.  
  - Additional auction metadata.
 
 ---

## 📂 Project Structure

```plaintext
📦 heartbids-with-react
 ┣ 📂 public               # Static assets (favicons, images, etc.)
 ┃ ┣ 📜 favicon.ico
 ┃ ┗ 📜 index.html
 ┣ 📂 src                  # Main source code
 ┃ ┣ 📂 components         # Reusable UI components
 ┃ ┃ ┣ 📂 layout          # Page layout components (Navbar, Footer, etc.)
 ┃ ┃ ┣ 📂 lots            # Components related to auction lots
 ┃ ┃ ┗ 📂 ui              # Generic UI components (buttons, modals, etc.)
 ┃ ┣ 📂 pages             # Page components (Login, Register, Profile, Listings, etc.)
 ┃ ┣ 📂 utilities         # Helper functions and API integrations
 ┃ ┣ 📂 hooks             # Custom React hooks
 ┃ ┣ 📂 config            # Configuration files (API, constants, headers, etc.)
 ┃ ┣ 📜 App.tsx           # Main app entry point
 ┃ ┣ 📜 main.tsx          # React app bootstrap
 ┃ ┗ 📜 firebaseConfig.ts # Firebase configuration
 ┣ 📂 styles              # Global styles and Tailwind configuration
 ┣ 📜 .gitignore          # Ignored files for Git
 ┣ 📜 README.md           # Project documentation
 ┣ 📜 package.json        # Dependencies and scripts
 ┣ 📜 tsconfig.json       # TypeScript configuration
 ┣ 📜 tailwind.config.js  # Tailwind CSS configuration
 ┗ 📜 vite.config.ts      # Vite configuration
```



## 🚀 Installation & Setup

1️⃣ **Clone the repository**

```bash
git clone https://github.com/taraolivia/heartbids-with-react.git
cd heartbids-with-react
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Run the development server**

```bash
npm run dev
```

🔗 The app will be available at `http://localhost:5173/`

---

## 🎯 User Stories

🔹 General User Actions

    A user with a stud.noroff.no email can register.
    A registered user can log in and log out.
    A registered user can update their avatar.

🔹 Auction Listings

    A registered user can create an auction listing with:
        Title, description, media gallery (images), and deadline date.
    A registered user can edit and delete their own listings.
    A registered user can view all active listings.
    A registered user can filter, sort, and search for listings.

🔹 Bidding System

    A registered user can place a bid on another user's listing.
    A registered user can see all bids placed on their listings.
    A registered user can view the highest bid on any listing.
    A registered user can track their bid history (past and active bids).

🔹 Profile & Account Features

    A registered user can view their profile and total credits.
    A registered user can see all listings they have created.
    A registered user can view listings they have bid on.
    A registered user can update their selected charity (custom HeartBids feature).

🔹 HeartBids Exclusive Features (Firebase API)

    A registered user can select a charity to support, and its logo appears on their profile.
    A registered user can browse and discover charities available on the platform.
    A registered user can see popular and featured listings (Firebase-powered filtering).
    A registered user can get a personalized dashboard with auction insights.

🔹 Guest Users (No Account Required)

    An unregistered user can browse and search for listings.
    An unregistered user can view listing details but cannot place bids.

---

## 🎨 Design & Planning Resources

📌 [Design Prototype](https://www.figma.com/design/IIqUTiScQluvKABlIR0kWT/HeartBids?node-id=1-2)  
📌 [Style Guide](https://www.figma.com/design/IIqUTiScQluvKABlIR0kWT/HeartBids?node-id=11-2663)  
📌 [Gantt Chart](https://www.notion.so/18f7168bd4d680c785c2eef835a7c903?v=18f7168bd4d680299075000c10cf2492&pvs=4)  
📌 [Kanban Board](https://www.notion.so/18f7168bd4d680c785c2eef835a7c903?v=1aa7168bd4d6807e9466000cff27441f&pvs=4)

---

## 📋 Exam Notes & Special Instructions

⚠️ **For exam submission:** Ensure the filter in the navbar is set to **"All Listings"**.  
🔎 Listings without the **HeartBids** tag will be removed post-exam.

---

## 🏁 Final Thoughts

HeartBids was built to **combine auction excitement with meaningful giving**. Whether you're looking to donate, bid, or win, every action supports a cause. 💚

Enjoy the platform, and **happy bidding!** 🎉

---

### 🔗 Connect

👩‍💻 **Developer:** [Tara Olivia](https://github.com/taraolivia)  
📧 **Contact:** tara.bjorheim@outlook.com

---

