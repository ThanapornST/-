export interface Book {
  id: string;
  title: string;
  author: string;
  duration: string;
  cover: string;
  audioUrl: string;
  genre: string[];
}

export const books: Book[] = [
  {
    id: "1",
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    duration: "20 hrs 55 mins",
    cover: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?auto=format&fit=crop&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    genre: ["Fantasy", "Adventure"]
  },
  {
    id: "2",
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    duration: "20 hrs 55 mins",
    cover: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    genre: ["Fantasy", "Adventure"]
  },
  {
    id: "3",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    duration: "15 hrs 55 mins",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    genre: ["Self Help"]
  },
  {
    id: "4",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    duration: "20 hrs 55 mins",
    cover: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    genre: ["Biography"]
  },
];
