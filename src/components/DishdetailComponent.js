import React, { Component } from "react";
import { Card, CardText, CardTitle, CardImg, CardBody } from "reactstrap";
import dateFormat from 'dateformat'; 


class DishDetail extends Component {
  renderDish(dish) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  renderComments(comments) {
   
      return (
        <div className="col-12 col-md-5 m-1">
        <h4>Comment</h4>
         <ul className="list-unstyled">
         {comments.map((comment)=> {
           return (
              <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                  --{comment.author}, {dateFormat(comment.date, "dd/mm/yyyy")}
                </p>
              </li>
           );
         })}
         </ul> 
        </div>
      );
    } 
  

render() {
  if (this.props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          {this.renderDish(this.props.dish)}
          {this.renderComments(this.props.dish.comments)}
        </div>
      </div>
    )
  } else {
    return <div></div>;
  }
}
  
}

export default DishDetail;
