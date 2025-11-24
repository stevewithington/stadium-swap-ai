# Stadium Swap AI

Transform your photos into epic stadium fan moments using Gemini AI. Upload a photo, pick a sport, and watch yourself become the ultimate fan.

## Description

Stadium Swap AI is a web application that leverages Google's Gemini AI to creatively transform uploaded images. It replaces the background with a realistic stadium scene and modifies the subjects' clothing to match sports team colors, creating immersive fan experiences for various sports.

## Features

- **Image Upload**: Drag and drop or select images (up to 5MB)
- **Sport Selection**: Choose from multiple sports including Soccer, American Football, Basketball, Baseball, Ice Hockey, Tennis, Cricket, Rugby, and Esports Arena
- **Team Customization**: Specify team colors for jerseys, scarves, caps, and face paint
- **Atmosphere Options**: Select from different game atmospheres like Sunny Day Game, Electric Night Game, Rainy Intense Match, Championship Confetti, and Golden Hour
- **Intensity Levels**: Adjust the excitement level (Low, Medium, High)
- **AI-Powered Transformation**: Uses Google's Gemini 3 Pro Image Preview model for photorealistic results
- **Real-time Processing**: Instant transformation with loading states and error handling

## Technologies Used

- **Frontend**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **AI Integration**: Google Generative AI (@google/genai 1.30.0)
- **Styling**: CSS (built-in React styling)

## Prerequisites

- Node.js (version 18 or higher recommended)
- A Google AI Studio API key with access to Gemini models

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stevewithington/stadium-swap-ai.git
   cd stadium-swap-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Google AI API key:
   - Obtain an API key from [Google AI Studio](https://aistudio.google.com/)
   - Set the API key as an environment variable:
     ```bash
     export API_KEY=your_api_key_here
     ```
   - For development, you can also use the AI Studio wrapper if available in your environment.

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

3. If prompted, select or configure your API key

4. Upload an image by dragging and dropping or clicking to select

5. Configure your transformation:
   - Select a sport
   - Enter team colors (e.g., "red and blue")
   - Choose an atmosphere
   - Set intensity level

6. Click "Generate" to transform your image

7. View and download the result

## Build for Production

To build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
stadium-swap-ai/
├── components/
│   ├── ConfigurationPanel.tsx  # UI for configuring transformation settings
│   ├── ImageUpload.tsx         # Drag-and-drop image upload component
│   └── ResultView.tsx          # Display of original and transformed images
├── services/
│   └── geminiService.ts        # Integration with Google Gemini AI
├── types.ts                    # TypeScript type definitions
├── App.tsx                     # Main application component
├── index.tsx                   # Application entry point
├── index.html                  # HTML template
├── vite.config.ts              # Vite configuration
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## API Key Management

The application requires a Google AI API key to function. In production environments, ensure the `API_KEY` environment variable is set securely. For development, the app integrates with AI Studio for key selection when available.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## Troubleshooting

- **API Key Issues**: Ensure your Google AI API key has the necessary permissions for image generation models
- **Large Images**: Images must be under 5MB; resize if necessary
- **Generation Failures**: Check your internet connection and API key validity
- **Browser Compatibility**: Ensure you're using a modern browser with WebGL support for optimal performance

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
