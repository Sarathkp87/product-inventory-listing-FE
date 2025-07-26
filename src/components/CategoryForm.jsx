"use client"

import { useState, useEffect } from "react"

export default function CategoryForm({ onSubmit, initialName = "", isLoading = false }) {
  const [name, setName] = useState(initialName)
  const [error, setError] = useState("")
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    setName(initialName)
    setError("")
    setTouched(false)
  }, [initialName])

  const validateName = (value) => {
    if (!value.trim()) {
      return "Category name is required"
    }
    if (value.trim().length < 2) {
      return "Category name must be at least 2 characters"
    }
    if (value.trim().length > 50) {
      return "Category name must be less than 50 characters"
    }
    return ""
  }

  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)
    if (touched) {
      setError(validateName(value))
    }
  }

  const handleBlur = () => {
    setTouched(true)
    setError(validateName(name))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched(true)

    const validationError = validateName(name)
    if (validationError) {
      setError(validationError)
      return
    }

    setError("")
    onSubmit({ name: name.trim() })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <div className="relative">
            <input
              id="categoryName"
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                error && touched ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300"
              }`}
              value={name}
              onChange={handleNameChange}
              onBlur={handleBlur}
              placeholder="Enter category name..."
              disabled={isLoading}
            />
            {error && touched && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            )}
          </div>
          {error && touched && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || (touched && !!error)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Category
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
