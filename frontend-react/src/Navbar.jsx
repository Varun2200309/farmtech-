function Navbar(props) {
  return (
    <nav>
      <h2>FARMTECH</h2>
      <p>Hello, {props.username}</p>
    </nav>
  )
}

export default Navbar