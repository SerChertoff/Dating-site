export interface User {
  id: number;
  name: string;
  age: number;
  location: string;
  gender: 'male' | 'female' | 'other';
  photo: string;
  about: string;
  interests: string[];
  lookingFor: string;
  ageRange: string;
  distance: string;
  email?: string;
  password?: string;
  matches?: number;
  conversations?: number;
}

export interface Message {
  text: string;
  time: string;
  sent: boolean;
}

export interface Conversation {
  id: number;
  userId: number;
  name: string;
  photo: string;
  lastMessage: string;
  time: string;
  messages: Message[];
}

export interface Testimonial {
  id: number;
  image: string;
  text: string;
  author: string;
}
