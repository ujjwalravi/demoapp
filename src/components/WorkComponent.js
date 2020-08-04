import React, {Component} from 'react';
import { Button, ModalBody, ModalHeader, FormGroup, Label, Col, Row, Input,Modal } from 'reactstrap';
import { Control, Form, Errors} from 'react-redux-form';

function RenderComments({workdata, postWorkdata}) {
    if (workdata!=null) {
        const wrkd = workdata.map((i) => {
            return (
                <li key={i.id}>
                    <p>{i.workname}</p>
                    <p>--{i.worktime}</p>
                </li>
            );
        });
        return(
            <div className="col-md-5 m-0">
                <h4>To-Do Work</h4>
                <ul className="list-unstyled">
                    {wrkd}
                    <Work  postWorkdata={postWorkdata}/>
                </ul>
            </div>
            
        );
    }
    else {
        return(
            <div>
                <h3>The if block didn't execute :( </h3>
            </div>
        );
    }
}

class Work extends Component {
    constructor(props){
        super(props); {
            this.state = {
                isModalOpen: false
            };

            this.toggleModal =this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current is: " + JSON.stringify(values));
        alert("Current is: " + JSON.stringify(values));
        this.props.postWorkdata(values.workname, values.worktime);
        this.props.resetFeedbackForm();
        this.toggleModal();
    }

   render(){
       return(
            <div className="container">
                <div className="row">
                    <div>
                    <RenderComments workdata={this.props.workdata} postWorkdata={this.props.postWorkdata}/>
                        <Button color="warning" onClick={this.toggleModal}>Press</Button>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>To-Do Form</ModalHeader>
                            <ModalBody>
                                <Form model="workdata" onSubmit={(values) => this.handleSubmit(values)} >
                                    <Row className="form-group">
                                        <Label htmlFor="workname" md={3}>Work Name</Label>
                                        <Col md={9}>
                                            <Control.text model=".workname" id="workname" name="workname" placeholder="Work Name" className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="worktime" md={3}>Work Time</Label>
                                        <Col md={9}>
                                            <Control.text model=".worktime" id="worktime" name="worktime" placeholder="Work Time" className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={{size: 9, offset: 3}}>
                                            <Button type="submit" color="primary">Add Work</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}
export default Work;