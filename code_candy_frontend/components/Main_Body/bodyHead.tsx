import { LP_GRID_ITEMS } from "../../lp-items"
import { Button } from "../../components/Button/Button"
import { ClassNames } from "storybook/internal/theming"
export function BodyHead(){
    return (
        <div className="background-gradient">
            <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
            <div className="mx-auto place-self-center">
                <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
                Code Candy
                </h1>
                <p className="mb-6 max-w-2xl  md:text-lg lg:mb-8 lg:text-xl gradient-color-text">
                <span className="text-lg"> 	❝ </span>
                The ultimate developer's toolkit, brimming with delightful utilities for coding, image processing, mini-games, and much more. Sweeten your workflow with a sprinkle of fun and functionality!
                <span className="text-lg">  	❞ </span>
                </p>
                <Button href="" className="mr-3 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Get started
                </Button>
                <Button
                href="#"
                intent="secondary"
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                Play Game
                </Button>
                </div>
            </div>
        </div>
    )
}
