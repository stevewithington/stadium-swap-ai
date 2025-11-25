# Stadium Swap AI

Stadium Swap AI is a modern web application that leverages Google's Gemini AI to seamlessly swap backgrounds of uploaded images with stadium environments. Built with React, TypeScript, and Vite, it offers a fast and interactive user experience.

## 🚀 Features

- **Smart Background Replacement**: Utilizes Google Gemini's advanced vision capabilities to identify subjects and replace backgrounds.
- **Interactive Configuration**: Fine-tune your results using the built-in configuration panel.
- **Drag & Drop Upload**: Easy-to-use image upload interface.
- **Real-time Preview**: Instantly view your generated stadium images.
- **Responsive Design**: Works seamlessly across different device sizes.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/)
- **Testing**: [Playwright](https://playwright.dev/)

## 🏁 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (usually comes with Node.js)

You will also need a **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/stevewithington/stadium-swap-ai.git
    cd stadium-swap-ai
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the root directory and add your Gemini API key:

    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

### 🏃‍♂️ Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to <http://localhost:5173>
3. If prompted, select or configure your Gemini API key
4. Upload an image by dragging and dropping or clicking select
5. Select from the configuration options
6. Click "Generate" to transform your image
7. View and download the result

## 🧪 Testing

This project uses Playwright for End-to-End (E2E) testing to ensure application stability.

**Run all tests:**

```bash
npx playwright test
```

**Run tests in UI mode:**

```bash
npx playwright test --ui
```

**View the HTML test report:**

```bash
npx playwright show-report
```

## 🔧 Build for Production

To build the applicationfor production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📂 Project Structure

```txt
stadium-swap-ai/
├── components/                 # React UI components
│   ├── ConfigurationPanel.tsx  # UI for configuring transformation settings
│   ├── ImageUpload.tsx         # Drag-and-drop image upload component
│   └── ResultView.tsx          # Display of original and transformed images
├── services/                   # API services and integrations
│   └── geminiService.ts        # Integration with Google Gemini AI
├── tests/                      # Playwright E2E tests
│   └── e2e.spec.ts             # End-to-end tests
├── App.tsx                     # Main application component
├── index.html                  # HTML template
├── index.tsx                   # Application entry point
├── vite.config.ts              # Vite configuration
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── types.ts                    # TypeScript type definitions
└── vite.config.ts              # Vite configuration
```

## 💙 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 🚨 Troubleshooting

- **API Key Issues**: Ensure your Google AI API key has the necessary permissions for image generation models
- **Large Images**: Images must be under 5MB; resize if necessary
- **Generation Failures**: Check your internet connection and API key validity
- **Browser Compatibility**: Ensure you're using a modern browser with WebGL support for optimal performance

## 🎗 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
