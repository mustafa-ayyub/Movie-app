import React from 'react'

const PaginationButton = ({ label, disabled, onClick }) => {
  return (
     <button
      className={`text-white font-medium rounded-full text-lg px-5 py-2.5 text-center mb-2
        ${
          disabled
            ? "bg-purple-400 cursor-not-allowed opacity-50"
            : "bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
        }
        focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default PaginationButton
