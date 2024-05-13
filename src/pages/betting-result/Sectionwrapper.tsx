/**
 * Section Wrapper
 * * Wrote by SJ
 * @param children children components
 * @returns children wrapped by wrapper
 *
 * TODO Design change needed
 */

export default function SectionWrapper({children} : {children : React.ReactNode}) {
  return (
    <div className="rounded-lg shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)] bg-slate-100 p-4">
      {children}
    </div>
  )
}