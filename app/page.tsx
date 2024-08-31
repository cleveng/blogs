import React from 'react'

export default function Home() {
    return (
        <div className="relative min-h-screen px-6 lg:px-8 dark:bg-gray-800">
            <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
                <div>
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl dark:text-gray-100">
                            Title of your website
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center dark:text-gray-200">
                            Long description of your website,
                            Long description of your website,
                            Long description of your website,
                            Long description of your website,
                            Long description of your website,
                        </p>
                        <div className="mt-8 flex gap-x-4 sm:justify-center">
                            <a href="#"
                               className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700">
                                Get started
                                <span aria-hidden="true" className="text-indigo-200">→</span>
                            </a>
                            <a href="#"
                               className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                Read the guide
                                <span aria-hidden="true" className="text-gray-400">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}