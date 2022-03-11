export const Note = ({ body, title}) => {
  return (
    <li>
    <p>{title}</p>
    <small>{body}</small>
  </li>
  )
}