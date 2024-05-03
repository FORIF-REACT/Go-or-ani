/**
 * Divider for dividing different sections
 * * Wrote by SJ
 * @param height height of divider
 * @returns gap like divider
 *
 * TODO None
 */

export default function Divider({height = '1.5rem'} : {height?:string}) {
  return (
    <div style={{height: height}} className="w-full"/>
  )
}