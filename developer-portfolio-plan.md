# 🚀 Developer Portfolio Plan (Next.js)

**Features: GitHub-authenticated Reactions & Comments on Projects + MDX Blog System**

---

## 🔑 1. GitHub Authentication

### Purpose:
Allow users to log in with GitHub to react and comment on projects.

### Requirements:
- Implement GitHub OAuth using **NextAuth.js**
- After login, retrieve:
  - GitHub user ID
  - GitHub username
  - GitHub avatar URL
- Persist login session across site for user interaction.

---

## 🧠 2. Project System

### Display:
Each project should include:
- 📌 Title
- 📝 Description
- 🖼️ Images (gallery or carousel)
- 🎥 Embedded videos (optional)
- 🌐 "Live Preview" link (if available)
- 🧑‍💻 GitHub Repo link (opens in new tab)

### GitHub Repo Display:
- "View on GitHub" button should:
  - Open the GitHub repo in a **new tab**
  - Use stored repo URL

---

## ❤️ 3. Reaction System (Like)

### Functionality:
- Show Like button for each project:
  - Logged-out users: Prompt GitHub login
  - Logged-in users: Toggle like/unlike
- Display live count of likes on the project

### Backend:
- Store likes in Firebase Firestore under:

```bash
/projects/{projectId}/likes/{userId}: true
```

---

## 💬 4. Comment System

### UI:
- Comments section under each project:
  - Input box for comment (logged-in only)
  - Display of past comments (user pic, name, text, time)

### Backend:
- Store comments in Firestore under:

```bash
/projects/{projectId}/comments/{commentId}: {
  userId,
  userName,
  avatarUrl,
  content,
  timestamp
}
```

---

## 📚 5. Blog System (Using MDX)

### Goal:
Create daily or regular blogs using Markdown + JSX (MDX)

### Features:
- Write blogs in `.mdx` format
- Support:
  - Headings (`#`, `##`, etc.)
  - Paragraphs
  - Bold, Italic
  - Links
  - Images
  - Code blocks
- Developer writes `.mdx` files manually in `/content/blogs`
- Render blog pages dynamically via file-based routing

### Bonus:
- Use `gray-matter` to extract metadata like:

```md
---
title: "My First Blog"
date: "2025-05-16"
summary: "This is a sample blog post."
coverImage: "/images/blog1.png"
---
```

---

## 🗃️ 6. Firestore Database Structure

```bash
users/
  githubUser123/
    name, avatar, etc.

projects/
  projectId1/
    title, desc, repoUrl, liveUrl, images, etc.
    likes/
      githubUser123: true
    comments/
      commentId789: {
        userId: 'githubUser123',
        userName: 'octocat',
        avatarUrl: 'https://github.com/octocat.png',
        content: 'Loved this!',
        timestamp: ...
      }
```

---

## 🛠️ Tools & Tech Stack

- **Frontend**: React / Next.js
- **Auth**: GitHub via NextAuth.js
- **Backend**: Firebase Firestore (for reactions & comments)
- **Markdown/MDX Blog**: `.mdx` files rendered in frontend

---

## ✅ Final Checklist

| Feature                         | Status |
|----------------------------------|--------|
| GitHub Login                     | ✅     |
| Show Project with Repo + Preview | ✅     |
| Like Button + Count              | ✅     |
| Comment System                   | ✅     |
| MDX Blog Support                 | ✅     |
| Firebase Setup                   | ✅     |