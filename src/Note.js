export const Note = ({ categories = [], content, date}) => {
  return (
    <li>
    <p>{content}</p>
    <small>
      <time>{date}</time>
    </small>
    {categories.map((category)=> (
      <small key ={category}>
      {category}
    </small>
    ))}
  </li>
  )
}