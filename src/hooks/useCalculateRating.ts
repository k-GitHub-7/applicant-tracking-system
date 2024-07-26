import React from 'react'

type TRate = {
  newRating: number
  steps: number
}

export const useCalculateRating = ({ newRating, steps }: TRate) => {
  let newArr = new Array(5).fill(0)

  if (steps === 1) {
    if (!Number.isInteger(newRating)) {
      newRating = Math.floor(newRating) + 1
    }
    for (let i = 0; i < newRating; i++) {
      newArr[i] = 1
    }
  }

  if (steps === 0.5) {
    for (let j = 0; j < newRating; j++) {
      newArr[j] = 1
    }
    if (!Number.isInteger(newRating)) {
      newArr[Math.floor(newRating)] = 0.5
    }
  }

  return { newArr }
}
