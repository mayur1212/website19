"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItem = {
  title: string;
  content: string;
};

const AccordionData: AccordionItem[] = [
  {
    title: "Catch the Trending Blockbusters: Get Your Movie Tickets Now!",
    content: `Want to catch the biggest blockbusters? We’ve curated the Top 20 movies currently showing across theatres near you. 
    From thrillers to dramas, lots of new releases like Tere Ishk Mein, Andhra King Taluka, De De Pyaar De 2 and many more!`,
  },
  {
    title: "Discover Trending Films in Popular Cities & Grab Tickets!",
    content: `Discover films trending in your city and stay updated with new releases playing near you.`,
  },
  {
    title: "Explore the Best Movies Currently Showing in Popular Cities!",
    content: `Browse movies now showing across top theatres and book tickets instantly.`,
  },
  {
    title: "Top Movie Genres You’ll Love – Action, Comedy, Romance & More!",
    content: `Explore movies by genre such as action, comedy, romance, thriller, sci-fi and more.`,
  },
  {
    title: "Explore & Book Tickets for Your Favorite Movie Genres!",
    content: `Find movies by your favorite genres and book tickets for the best shows around you.`,
  },
  {
    title: "Dive into Your Favorite Movie Genres in More Amazing Cities!",
    content: `Choose your preferred genre and explore movies available across more cities.`,
  },
  {
    title: "Explore Movies in Your Language Across More Cities!",
    content: `Browse movies by language like Hindi, Marathi, Telugu, Tamil, Kannada and more.`,
  },
  {
    title: "Find the Best Cinemas in Popular Cities!",
    content: `Discover top-rated cinemas near you and enjoy an amazing movie experience.`,
  },
  {
    title: "Trending Events and Top Activities to Explore!",
    content: `Find trending events, concerts, stand-up shows, sports events and more happening near you.`,
  },
  {
    title: "Your Complete Guide to This Week’s Top Movie Picks!",
    content: `Check out this week's top picks recommended by experts, critics and movie lovers.`,
  },
];

export default function InfoAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full bg-[#f1f1f2] py-10">
    <div className="w-[85%] mx-auto px-4 md:px-6 lg:px-0 space-y-4">
        {AccordionData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition"
          >
            {/* Header — items-start so wrapped title stays top-left */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-start px-6 py-4 cursor-pointer"
              aria-expanded={openIndex === index}
              aria-controls={`accordion-content-${index}`}
            >
              <p className="text-lg font-semibold text-gray-900 text-left leading-snug">
                {item.title}
              </p>

              {/* chevron gets a small top margin so it visually centers beside multi-line title */}
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-300 mt-1 ${openIndex === index ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>

            {/* Content */}
            <div
              id={`accordion-content-${index}`}
              className={`px-6 transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"} overflow-hidden`}
            >
              <p className="text-gray-700 leading-relaxed text-left">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
