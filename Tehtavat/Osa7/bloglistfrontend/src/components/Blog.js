import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {

    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    if (this.props.blogUserName === this.props.stateUserName) {
      return (
        <div>
          <div style={hideWhenVisible} onClick={this.toggleVisibility} className="limitedInfo">
            {this.props.title} {this.props.author}
          </div>
          <div style={showWhenVisible} onClick={this.toggleVisibility} className="allInfo">
            {this.props.title} {this.props.author}
            <li>{this.props.url}</li>
            <li>{this.props.likes} {'likes '}
              <button onClick={this.props.likeBlog(this.props.id)}>
                {'like'}
              </button>
            </li>
            {'added by: '}{this.props.name}
            <button onClick={this.props.removeBlog(this.props.id)}>
              {'delete'}
            </button>
          </div>
        </div >
      )
    }

    return (
      <div>
        <div style={hideWhenVisible} onClick={this.toggleVisibility} className="limitedInfo">
          {this.props.title} {this.props.author}
        </div>
        <div style={showWhenVisible} onClick={this.toggleVisibility} className="allInfo">
          {this.props.title} {this.props.author}
          <li>{this.props.url}</li>
          <li>{this.props.likes} {'likes '}
            <button onClick={this.props.likeBlog(this.props.id)}>
              {'like'}
            </button>
          </li>
          {'added by: '}{this.props.name}
        </div>
      </div >
    )
  }
}

Blog.propTypes = {
  blogUserName: PropTypes.string.isRequired,
  stateUserName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog