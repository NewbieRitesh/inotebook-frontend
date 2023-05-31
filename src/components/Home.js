import Addnotes from "./notes/Addnotes"
import Notes from "./notes/Notes"

const Home = () => {
  return (
    <div className="container">
      <Addnotes />
      <Notes />
    </div>
  )
}

export default Home