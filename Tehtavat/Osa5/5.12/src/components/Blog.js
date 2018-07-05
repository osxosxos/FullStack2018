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
          <div style={hideWhenVisible}>
            <a onClick={this.toggleVisibility}>{this.props.title}</a> <a>{this.props.author}</a>
          </div>
          <div style={showWhenVisible}>
            <a onClick={this.toggleVisibility}>{this.props.title}</a> <a>{this.props.author}</a>
            <p>{this.props.url} </p>
            <p>{this.props.likes} {'likes '} {}
              <button onClick={this.props.likeBlog(this.props.id)}>
                {'like'}
              </button>
            </p>
            <p>{'added by: '}{this.props.name}</p>
            <button onClick={this.props.removeBlog(this.props.id)}>
              {'delete'}
            </button>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div style={hideWhenVisible}>
          <a onClick={this.toggleVisibility}>{this.props.title}</a> <a>{this.props.author}</a>
        </div>
        <div style={showWhenVisible}>
          <a onClick={this.toggleVisibility}>{this.props.title}</a> <a>{this.props.author}</a>
          <p>{this.props.url} </p>
          <p>{this.props.likes} {'likes '} {}
            <button onClick={this.props.likeBlog(this.props.id)}>
              {'like'}
            </button>
          </p>
          <p>{'added by: '}{this.props.name}</p>
        </div>
      </div>
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