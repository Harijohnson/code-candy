"use client"; // Mark this file as a client component

import React, { useState } from 'react';
import { LP_GRID_ITEMS } from "../../lp-items";
import "./body_styles/body_style.css";

interface LPItem {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export function BodyCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [animationDirection, setAnimationDirection] = useState<string>('');

  const handleMouseEnter = (index: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { offsetWidth: width, offsetHeight: height } = e.currentTarget;
    const { clientX: x, clientY: y } = e;
    const { left, top } = e.currentTarget.getBoundingClientRect();

    const offsetX = x - left;
    const offsetY = y - top;

    let direction = '';
    if (offsetX < width / 2 && offsetY < height / 2) {
      direction = 'top-left';
    } else if (offsetX >= width / 2 && offsetY < height / 2) {
      direction = 'top-right';
    } else if (offsetX < width / 2 && offsetY >= height / 2) {
      direction = 'bottom-left';
    } else {
      direction = 'bottom-right';
    }

    setHoveredCard(index);
    setAnimationDirection(direction);
  };

  const handleMouseLeave = (index: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Delay the de-growth effect
    // setTimeout(() => {
      setHoveredCard(null);
      setAnimationDirection('');
    // }, 500); // Adjust the delay time as needed
  };

  return (
    <div className="background-gradient-card">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          {LP_GRID_ITEMS.map((singleItem, index) => (
            <div
              key={singleItem.title}
              className={`card-container w-full max-w-sm  border border-gray-200 rounded-lg shadow  shadow-2xl  ${
                hoveredCard === index ? 'entered' : hoveredCard === null ? 'exited' : ''
              } ${animationDirection}`}
              onMouseEnter={handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave(index)}
            >
              {/* <div className="flex justify-end px-4 pt-4">
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span className="sr-only">Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                <div
                  id="dropdown"
                  className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Export Data
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="card-content flex flex-col items-center px-8 py-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 p-1.5 text-black dark:bg-primary-900 lg:h-12 lg:w-12">
                  {singleItem.icon}
                </div>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black px-6">
                  {singleItem.title}
                </h5>
                <span className="text-sm text-gray-500 dark:text-black px-6">
                  {singleItem.description}
                </span>
                <div className="flex mt-4 md:mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-white-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    View
                  </a>
                  <a
                    href="#"
                    className="py-2 px-4 ms-2 text-sm font-medium text-white-100 outline-none bg-white rounded-lg border  hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-400 dark:text-black-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Learn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
