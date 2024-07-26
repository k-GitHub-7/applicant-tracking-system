import React, { useState } from 'react'
import './Rating.css'
import { useCalculateRating } from '../../hooks/useCalculateRating'
import emptyIcon from '../../assets/empty.svg'
import filledIcon from '../../assets/filled.svg'
import halfFilledIcon from '../../assets/half.svg'

type TProps = {
  value: number
  steps: number
}

const getIcon = (j: number) => {
  if (j === 0) {
    return emptyIcon
  }
  if (j === 0.5) {
    return halfFilledIcon
  }
  if (j === 1) {
    return filledIcon
  }
}

const isLessThanHalf = (event: any) => {
  const { target } = event
  const boundingClientRect = target.getBoundingClientRect()
  let mouseAt = event.clientX - boundingClientRect.left
  mouseAt = Math.round(Math.abs(mouseAt))
  return mouseAt <= boundingClientRect.width / 2
}

const Rating = (props: TProps) => {
  const [newRating, setNewRating] = useState<number>(props.value)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const onClick = (e: any, ind: number) => {
    let val = null
    if (isLessThanHalf(e)) {
      val = ind + 0.5
    } else {
      val = ind + 1
    }

    if (newRating === val) {
      setNewRating(0)
      return
    }

    setNewRating(val)
  }
  const onMouseOver = (e: any, ind: number) => {
    let val = null
    if (isLessThanHalf(e)) {
      val = ind + 0.5
    } else {
      val = ind + 1
    }
    setHoveredRating(val)
  }

  const { newArr } = useCalculateRating({
    newRating: hoveredRating ?? newRating,
    steps: props.steps,
  })

  const renderSymbol = (newArr: number[]) => {
    return newArr.map((v, ind) => (
      <img
        src={getIcon(v)}
        onClick={(e) => onClick(e, ind)}
        onMouseMove={(e) => onMouseOver(e, ind)}
        onMouseOut={() => setHoveredRating(null)}
        className="rating-image"
        data-testid="rating-icon"
        alt="Rate"
      />
    ))
  }

  return (
    <div
      className="star-rating"
      data-testid="star-rating-container"
    >
      {renderSymbol(newArr)}
    </div>
  )
}

export default Rating
