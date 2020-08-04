import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Work from './WorkComponent';
import { actions } from 'react-redux-form';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect} from 'react-redux';

import {postWorkdata, fetchWorkdata } from '../redux/ActionCreator';
const mapStateToProps = state => {
    return {
      workdata: state.workdata
    }
}

const mapDispatchToProps = (dispatch) => ({
    resetFeedbackForm: () => { dispatch(actions.reset('workdata'))},
    postWorkdata: (workname, worktime) => dispatch(postWorkdata(workname, worktime)),
    fetchWorkdata: () => { dispatch(fetchWorkdata())}
    
  });

class Main extends Component {
    componentDidMount() {
        this.props.fetchWorkdata();
      }
    render(){
        return(
            <div>
                <Header />
                <Work resetFeedbackForm={this.props.resetFeedbackForm} postWorkdata={this.props.postWorkdata} workdata={this.props.workdata.workdata} />
                <Footer />
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
