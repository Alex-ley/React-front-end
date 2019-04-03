import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addContent } from '../../store/actions/contentActions'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

class AddContent extends Component {
  state = {
    type: '',
    title: '',
    description: ''
    // upload_status: false,
    // upload_progress: 0
  }
  handleChange = (e) => {
    if (e.target.id === "file_input") {
      this.setState({
        'type': e.target.files[0].type,
        'title' : e.target.files[0].name,
        // 'files' : e.target.files
      })

      if (e.target.files[0].type.slice(0,5) === "image" || e.target.files[0].type.slice(0,5) === "video") {
        // const valid = "valid"
        document.querySelector('#add_file').disabled = false
      } else {
        document.querySelector('#add_file').disabled = true
        document.querySelector('#file_valid').setAttribute("class", "file-path validate invalid")
      }
      // console.log(e.target.files[0]);
      document.querySelector('#type').value = e.target.files[0].type;
      document.querySelector('#type_label').setAttribute("class", "active")
      // document.querySelector('#type').focus();
      document.querySelector('#title').value = e.target.files[0].name;
      document.querySelector('#title_label').setAttribute("class", "active")
      // document.querySelector('#title').focus();
      document.querySelector('#description').focus();
    }
    this.setState({
      [e.target.id]: e.target.value
    })
    // console.log(this.state);
  }
  handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    // console.log(this.state);
    const files = document.querySelector('#file_input').files;
    // console.log(files, files[0]);
    this.props.addContent(this.state, files);

    e.target.reset()
    if (this.props.location.pathname !== "/") {
      this.props.history.push('/');
    }
  }
  render() {
    const { auth } = this.props;
    const divType = this.props.divType ? this.props.divType : "container"
    // console.log(divType);
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className={divType}>
        <div className="card z-depth-2 no-bottom-margin">

            <form className="white" onSubmit={this.handleSubmit}>
              <h5 className="grey-text text-darken-3">Add your content</h5>

              <div className="file-field input-field">
                <div className="btn teal lighten-1">
                  <span>File</span>
                  <input onChange={this.handleChange} type="file" id="file_input" name="file_input" accept="image/*,video/*"/>
                </div>
                <div className="file-path-wrapper">
                  <input id="file_valid" className="file-path validate" type="text"/>
                </div>
              </div>
              <div className="input-field">
                <input type="text" id='type' onChange={this.handleChange} />
                <label htmlFor="type" id='type_label'>Content Type</label>
              </div>
              <div className="input-field">
                <input type="text" id='title' onChange={this.handleChange} />
                <label htmlFor="title" id='title_label'>Content Title</label>
              </div>
              <div className="input-field">
                <textarea id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>
                <label htmlFor="description" id='description_label'>Description</label>
              </div>
              <div className="input-field">
                <div className="row">
                  <div className="col s2">
                    <button id="add_file" className="btn teal lighten-1">Add</button>
                  </div>
                  <div id="upload_status" hidden={!this.props.content_status.upload_status}>
                    <div className="col s3 offset-s1 valign-wrapper" style={{height: "36px"}}>
                      Uploading...
                    </div>
                    <div className="col s6 valign-wrapper" style={{height: "36px"}}>
                      <div className="progress" style={{marginTop: "15px"}}>
                          <div id="upload_progress" className="determinate" style={{width: this.props.content_status.upload_progress}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    content_status: state.content
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addContent: (content,files) => dispatch(addContent(content,files))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddContent))
