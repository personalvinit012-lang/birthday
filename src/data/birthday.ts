export const birthday = {
  recipient: 'Aradhya',
  greeting: 'Happy Birthday',
  subtitle: 'A little world of love, memories and surprises is waiting for you…',
  letter: [
    'You bring so much light, love and happiness into the world.',
    'I hope your day is filled with the little things that make you smile, and all the big dreams you are chasing come true.',
    'You deserve all the love in the world. Today and always. ♡',
  ],
  closing: 'May your life be filled with love, happiness and all the beautiful things you deserve.',
};

export interface MemoryCard {
  icon: string;
  title: string;
  note: string;
  image: string;
}

export const memoryCards: MemoryCard[] = [
  { icon: '🌷', title: 'Little Things', note: 'The little things about you make life beautiful.', image: '/images/pose_1.png' },
  { icon: '🧸', title: 'Good Vibes Only', note: 'May you always find a reason to smile.', image: '/images/pose_2.png' },
  { icon: '🌅', title: 'Beautiful Moments', note: 'Here’s to all the lovely moments still to come.', image: '/images/pose_3.png' },
  { icon: '💌', title: 'A Note for You', note: 'You make ordinary days feel special.', image: '/images/pose_4.png' },
  { icon: '🌹', title: 'Always Blooming', note: 'Keep growing into the wonderful person you are.', image: '/images/pose_5.png' },
  { icon: '✨', title: 'Your Magic', note: 'The world is brighter with you in it.', image: '/images/pose_6.png' },
];

