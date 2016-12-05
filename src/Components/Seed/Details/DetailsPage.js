import React, { Component } from 'react';
import SeedModel from '../../../Models/SeedModel.js';
import CommentModel from '../../../Models/CommentModel.js';
import CommentView from './CommentView';

export default class DetailsPage extends Component {
    constructor(props) {
         super(props);
         this.state = {
             name: '',
             description: '',
             location: '',
             price: '',
             imageUrl: '',
             comments: []
         };

         this.onLoadSuccess = this.onLoadSuccess.bind(this);
         this.onLoadComments = this.onLoadComments.bind(this);
     }

    render() {
        let comments = this.state.comments.map(function (comment, index) {
            return <CommentView key={index}
                                authorName={comment.authorName}
                                content={comment.content}
                                date={comment.date}
                   />
        });
          return (
              <div className="col-md-9">
                <div className="thumbnail">
                    <img className="img-responsive" src={this.state.imageUrl} alt="Seed" />
                    <div className="caption-full">
                        <h4 className="pull-right">${this.state.price}</h4>
                        <h1>{this.state.name}</h1>
                        <p>{this.state.description}</p>
                        {
                            sessionStorage.getItem('username') === 'admin' ?
                                <input
                                    type="button"
                                    value="Edit"
                                    className="btn btn-primary"
                                    onClick={() => this.context.router.push('/edit/' + this.state.seedId)}
                                />
                            :undefined}

                        {
                            sessionStorage.getItem('username') === 'admin'?
                                <input
                                    type="button"
                                    value="Delete"
                                    className="btn btn-danger"
                                    onClick={() => this.context.router.push('/delete/' + this.state.seedId)}
                                 />
                            :undefined
                        }
                    </div>
                </div>
                  <div className="comments">
                      <h1>Comments</h1>
                      {comments}
                  </div>
            </div>
        );
    }

    componentWillMount () {
        SeedModel.getSeedById(this.props.params.seedId, this.onLoadSuccess);
    }

    onLoadSuccess (response) {
        this.setState({
            seedId: response._id,
            name: response.name,
            location: response.location,
            description: response.description,
            price: response.price,
            imageUrl: response.imageUrl
        });

        CommentModel.loadComments(this.onLoadComments);
    }

    onLoadComments(response) {
            let sorted = response.filter(c => c.seedId === this.state.seedId).sort(function (a,b) {
                return new Date(b.dateCreated) - new Date(a.dateCreated);
            });
            let curr = [];
            for (let i = 0; i < sorted.length; i++) {
                curr.push(sorted[i]);
            }

            this.setState({
                comments: curr
            });
    }
}


 DetailsPage.contextTypes = {
     router: React.PropTypes.object
 };