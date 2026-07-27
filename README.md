# CraftIQ – AI Business Companion for Handmade Entrepreneurs

## Overview

**CraftIQ** is an AI-powered web application designed to help handmade entrepreneurs build and grow their businesses. It acts as a virtual business companion by providing intelligent assistance with branding, pricing, customer analysis, and marketing planning.

Many small handmade businesses create high-quality products but struggle with branding, pricing strategies, identifying their ideal customers, and promoting their products effectively. CraftIQ addresses these challenges by providing AI-generated business insights and personalized recommendations.

The application is designed for entrepreneurs selling crochet products, handmade bouquets, greeting cards, stickers, jewelry, personalized gifts, and other handmade products.

---

## Live Demo

**Application URL:**  
https://craftiq-ai-business-companion-for-handmade-entrep.ai.studio

---

## Problem Statement

Small handmade businesses often face several challenges, including:

- Creating a unique brand identity
- Determining appropriate product pricing
- Understanding their target customers
- Planning effective marketing campaigns
- Writing compelling product descriptions
- Growing their business with limited resources

These challenges often make it difficult for small entrepreneurs to compete in the online marketplace.

---

## Solution

CraftIQ is an AI-powered business assistant that helps handmade entrepreneurs make better business decisions by generating personalized recommendations for branding, pricing, customer analysis, and marketing.

Unlike a basic AI chatbot, CraftIQ performs multiple business-focused tasks that support entrepreneurs throughout different stages of their business journey.

---

# Features

## AI Product Branding Generator

Generate a complete brand identity for handmade products.

### User Inputs

- Product Name
- Product Category
- Materials Used
- Target Audience
- Occasion
- Brand Style

### AI Generates

- Creative Product Names
- Product Tagline
- Brand Story
- Product Description
- Unique Selling Points
- Packaging Suggestions

---

## AI Pricing Assistant

Estimate an appropriate selling price using:

- Material Cost
- Time Required
- Difficulty Level
- Desired Profit Margin
- Product Category

### AI Provides

- Suggested Selling Price
- Minimum Selling Price
- Premium Price Option
- Pricing Explanation
- Tips to Increase Product Value

---

## AI Customer Persona Generator

Analyze the ideal customer for a handmade product.

### AI Generates

- Customer Persona
- Age Group
- Lifestyle
- Buying Motivation
- Pain Points
- Marketing Approach
- Recommended Social Media Platform

---

## AI Marketing Planner

Generate marketing strategies for handmade businesses.

### AI Provides

- Monthly Content Calendar
- Social Media Campaign Ideas
- Promotional Captions
- Festival Marketing Campaigns
- Discount Strategies
- Engagement Ideas
- Relevant Hashtags

---

## AI Business Consultant

An interactive AI assistant that answers business-related questions, including:

- How can I increase product sales?
- What products should I launch next?
- How should I market handmade gifts?
- How can I attract more customers?

---

## Additional Features

- Responsive Design
- Professional Dashboard
- Loading Indicators
- Copy Generated Content
- Clear Form Inputs
- Error Handling
- Mobile-Friendly Interface

---

# AI Feature

CraftIQ uses **Google Gemini** to provide personalized business recommendations and content generation.

The AI analyzes user input and generates customized branding, pricing, customer insights, and marketing strategies specifically for handmade businesses.

## System Prompt

```text
You are CraftIQ, an AI business consultant specialized in helping handmade entrepreneurs.

Your role is to help small creative businesses grow by providing practical, creative, and realistic business advice.

You assist users with:

• Product branding
• Pricing strategies
• Customer analysis
• Marketing planning
• Business growth ideas

Your responses should be:

- Creative
- Professional
- Personalized
- Easy to understand
- Action-oriented

Always consider the handmade nature of products, emotional value, craftsmanship, and customer connection.

Avoid generic responses.

Provide personalized recommendations based on user inputs.

For pricing suggestions, consider:

- Material costs
- Labor time
- Product difficulty
- Perceived value

Never guarantee profits or financial success.
```

---

# Technologies Used

## Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

## Styling

- Tailwind CSS

## Artificial Intelligence

- Google Gemini API

## Development Tools

- Google AI Studio
- Visual Studio Code
- GitHub

## Deployment

- ai studio

---

# Screenshots

## Home Page

![Home](screenshots/home.png)

---

## Pricing Assistant

![Pricing](screenshots/pricing.png)

---

## Marketing Planner

![Marketing](screenshots/marketing.png)

---

# Installation and Setup

Clone the repository:

```bash
git clone https://github.com/yourusername/craftiq.git
```

Navigate to the project folder:

```bash
cd craftiq
```

Install project dependencies:

```bash
npm install
```

Create a `.env` file and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=YOUR_API_KEY
```

Run the development server:

```bash
npm run dev
```

Open the application in your browser:

```
http://localhost:5173
```

---

# Project Structure

```
craftiq/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   └── App.jsx
│
├── public/
├── screenshots/
├── package.json
├── vite.config.js
└── README.md
```
---

# Author

**Maheen Tariq**

Bachelor of Science in Software Engineering  
National University of Modern Languages (NUML)

---

# License

This project was developed as an academic final project and is intended for educational and demonstration purposes.
