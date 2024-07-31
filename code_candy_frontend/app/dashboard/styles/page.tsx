import Image from "next/image";
import Link from "next/link";
export default function Style() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image
          src="/android-chrome-512x512.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Gradient</div>
          <p className="text-gray-700 text-base">
            This is a gradient selector. It allows you to select any color
            combination from a gradient by picking a color from the gradient.
          </p>
        </div>
        <div className="px-6 py-4 text-center flex">
          <Link
            href="/"
            type="button"
            className="w-64 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Start
          </Link>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image
          src="/android-chrome-512x512.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            Gradient Garden
          </div>
          <p className="text-gray-700 text-base">
            This is a gradient selector. It allows you to select any color
            combination from pre-set gradients. You can find a wide range of
            gradients in the Gradient Garden.
          </p>
        </div>
        <div className="px-6 py-4 text-center flex">
          <Link
            href="/"
            type="button"
            className="w-64 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Start
          </Link>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image
          src="/android-chrome-512x512.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Color Picker</div>
          <p className="text-gray-700 text-base">
            A color palette is a collection of colors that are grouped together
            for a specific purpose or theme.
          </p>
        </div>
        <div className="px-6 py-4 text-center flex">
          <Link
            href="/"
            type="button"
            className="w-64 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Start
          </Link>
        </div>
      </div>

      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image
          src="/android-chrome-512x512.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Color Picker</div>
          <p className="text-gray-700 text-base">
            A color picker is an interactive element that allows users to select a
            color from a palette or spectrum.
          </p>
        </div>
        <div className="px-6 py-4 text-center flex">
          <Link
            href="/"
            type="button"
            className="w-64 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Start
          </Link>
        </div>
      </div>

      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image
          src="/android-chrome-512x512.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Color Garden</div>
          <p className="text-gray-700 text-base">
            Color Garden is a color palette generator that creates a harmonious set of colors from a single base color. It also provides options to adjust the palette's brightness, saturation and contrast.
          </p>
        </div>
        <div className="px-6 py-4 text-center flex">
          <Link
            href="/gradient"
            type="button"
            className="w-64 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Start
          </Link>
        </div>
      </div>
    
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image
          src="/android-chrome-512x512.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Grid</div>
          <p className="text-gray-700 text-base">
            A grid is a set of lines that form a specific pattern. It provides a basis for arranging and aligning elements on a web page. The Grid system in Code Candy allows you to create preset grids or customize your own grid layouts.
          </p>
        </div>
        <div className="px-6 py-4 text-center flex">
          <Link
            href="/"
            type="button"
            className="w-64 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Start
          </Link>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image
          src="/android-chrome-512x512.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Cards</div>
          <p className="text-gray-700 text-base">
             You can choose from various card styles such as text-only cards, image cards, and cards with multiple sections. The Cards preset in Code Candy allows you to easily customize the layout and content of your cards.
            
          </p>
        </div>
        <div className="px-6 py-4 text-center flex">
          <Link
            href="/"
            type="button"
            className="w-64 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Start
          </Link>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image
          src="/android-chrome-512x512.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Box Shadow</div>
          <p className="text-gray-700 text-base">
            Code Candy provides a variety of box shadow presets that you can use to add depth and visual interest to your UI components. From subtle to dramatic, these presets will help you create a professional looking design.
          </p>
        </div>
        <div className="px-6 py-4 text-center flex">
          <Link
            href="/"
            type="button"
            className="w-64 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
}
