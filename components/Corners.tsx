type BaseProps = {
  className?: string
  text?: string
  color?: string
  variant?: 'solid' | 'outlined'
  size?: 'small' | 'large'
  showArrows?: boolean
}

export function Corners({ size = 'large', color = 'white', ...props }: BaseProps) {
  const unitValue = { small: 12, large: 16 }[size]

  return (
    <>
      {/* top left */}
      <svg
        className="absolute top-0 left-0"
        width={unitValue}
        height={unitValue}
        viewBox={`0 0 ${unitValue} ${unitValue}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill={color}>
          <rect width="2" height={unitValue} />
          <rect
            x={unitValue}
            width="2"
            height={unitValue}
            transform={`rotate(90 ${unitValue} 0)`}
          />
        </g>
        <defs>
          <clipPath id="clip0_48_12887">
            <rect width={unitValue} height={unitValue} fill="white" />
          </clipPath>
        </defs>
      </svg>

      {/* bottom left */}
      <svg
        className="absolute bottom-0 left-0"
        width={unitValue}
        height={unitValue}
        viewBox={`0 0 ${unitValue} ${unitValue}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill={color}>
          <rect width="2" height={unitValue} transform={`matrix(1 0 0 -1 0 ${unitValue})`} />
          <rect
            width="2"
            height={unitValue}
            transform={`matrix(-3.49691e-08 -1 -1 5.46392e-08 ${unitValue} ${unitValue})`}
          />
        </g>
        <defs>
          <clipPath id="clip0_48_12888">
            <rect
              width={unitValue}
              height={unitValue}
              fill="white"
              transform={`rotate(90 ${unitValue} 0)`}
            />
          </clipPath>
        </defs>
      </svg>
      {/* top right */}
      <svg
        className="absolute top-0 right-0"
        width={unitValue}
        height={unitValue}
        viewBox={`0 0 ${unitValue} ${unitValue}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill={color}>
          <rect width="2" height={unitValue} transform={`matrix(-1 0 0 1 ${unitValue} 0)`} />
          <rect
            width={`2`}
            height={unitValue}
            transform={`matrix(3.49691e-08 1 1 -5.46392e-08 0 0)`}
          />
        </g>
        <defs>
          <clipPath id="clip0_48_12889">
            <rect
              width={unitValue}
              height={unitValue}
              fill="white"
              transform={`matrix(-1 0 0 1 ${unitValue} 0 )`}
            />
          </clipPath>
        </defs>
      </svg>
      {/* bottom right */}
      <svg
        className="absolute bottom-0 right-0"
        width={unitValue}
        height={unitValue}
        viewBox={`0 0 ${unitValue} ${unitValue}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill={color}>
          <rect
            x={unitValue}
            y={unitValue}
            width="2"
            height={unitValue}
            transform={`rotate(-180 ${unitValue} ${unitValue})`}
          />
          <rect
            y={unitValue}
            width="2"
            height={unitValue}
            transform={`rotate(-90 0 ${unitValue})`}
          />
        </g>
        <defs>
          <clipPath id="clip0_48_12890">
            <rect
              width={unitValue}
              height={unitValue}
              fill="white"
              transform={'translate(${unitValue} ${unitValue}) rotate(-180)'}
            />
          </clipPath>
        </defs>
      </svg>
    </>
  )
}
