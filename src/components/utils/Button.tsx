interface ButtonProps {
  text: string
  className?: string
}

const Button = ({ text, className = '' }: ButtonProps) => (
  <button
    className={`overflow-hidden group relative grid place-items-center bg-[black] text-[white] rounded-[20px] px-1 py-1     ${className}`}
  >
    <div className='pointer-events-none absolute group-hover:translate-y-[-200%] duration-500'>
      {text}
    </div>
    <div className='pointer-events-none translate-y-[200%] absolute group-hover:translate-y-[-5%] duration-500'>
      {text}
    </div>
  </button>
)

export default Button
