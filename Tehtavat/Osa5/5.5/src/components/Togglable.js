import React from 'react'

class Togglable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        console.log('nappia toggleVisible painettu!')
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }

        console.log('hideWhenVisible: ', hideWhenVisible)
        console.log('showWhenVisible:', showWhenVisible)

        console.log('props: ', this.props)
        console.log('props.children: ', this.props.children)

        return (
            <div>
                <div style={hideWhenVisible}>                    
                    <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
                </div>
                <div style={showWhenVisible}>
                    {this.props.children}
                    <button onClick={this.toggleVisibility}>{'Cancel'}</button>
                </div>
            </div>
        )
    }
}

export default Togglable