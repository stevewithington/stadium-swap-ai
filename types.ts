export interface FanConfig {
  sport: string;
  teamColors: string;
  atmosphere: string;
  intensity: 'Low' | 'Medium' | 'High';
}

export enum ProcessingStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface GeneratedImage {
  imageUrl: string;
}

// Helper options for the UI
export const SPORTS = [
  'Soccer',
  'American Football',
  'Basketball',
  'Baseball',
  'Ice Hockey',
  'Tennis',
  'Cricket',
  'Rugby',
  'Esports Arena'
];

export const ATMOSPHERES = [
  'Sunny Day Game',
  'Electric Night Game',
  'Rainy Intense Match',
  'Championship Confetti',
  'Golden Hour'
];