import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import ProjectItem from '../ProjectView'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Projects extends Component {
  state = {category: categoriesList[0].id, isLoading: 'INITIAL', projects: []}

  componentDidMount() {
    this.renderProjects()
  }

  changeCategory = event => {
    this.setState({category: event.target.value}, this.renderProjects)
  }

  renderProjects = async () => {
    this.setState({isLoading: 'INPROGRESS'})
    const {category} = this.state
    console.log(category)

    try {
      const url = `https://apis.ccbp.in/ps/projects?category=${category}`
      const options = {method: 'GET'}
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        let {projects} = data
        projects = projects.map(each => ({
          id: each.id,
          name: each.name,
          imageUrl: each.image_url,
        }))
        this.setState({isLoading: 'SUCCESS', projects})
      }
    } catch (error) {
      this.setState({isLoading: 'FAILURE'})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderProj = () => {
    const {projects} = this.state
    return (
      <ul>
        {projects.map(each => (
          <li key={each.id}>
            <ProjectItem item={each} />
          </li>
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div>
      <img
        className="fail-image"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.renderProjects} type="button">
        Retry
      </button>
    </div>
  )

  renderView = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case 'INPROGRESS':
        return this.renderLoader()

      case 'SUCCESS':
        return this.renderProj()

      case 'FAILURE':
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    const {category} = this.state

    return (
      <div>
        <div>
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
          />
        </div>
        <select onChange={this.changeCategory} value={category}>
          {categoriesList.map(each => (
            <option key={each.id} value={each.id}>
              {each.displayText}
            </option>
          ))}
        </select>
        {this.renderView()}
      </div>
    )
  }
}

export default Projects
