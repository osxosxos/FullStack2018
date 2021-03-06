import React from 'react'

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
}

export default Blog