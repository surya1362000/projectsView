const ProjectItem = prop => {
  const {item} = prop
  const {name, imageUrl} = item

  return (
    <div>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </div>
  )
}

export default ProjectItem
