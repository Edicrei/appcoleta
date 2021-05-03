import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

import Tutorial from "./tutorial.component";

import Container from '@material-ui/core/Container';


const style = {

  T1: {
    color: '#1DA64B', 
    fontWeight: 'bold'
    },
    T2: {
    color: '#0E1973'
    },
    Simg:{ 
    width: 50
    },
    B1:{
    borderRadius: 18, 
    color: '#fff', 
    backgroundColor: '#742699', 
    width: 137, 
    height: 36
    }
    

};




export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = TutorialDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let tutorials = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      tutorials.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    this.setState({
      tutorials: tutorials,
    });
  }

  refreshList() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  callPage(){
    this.props.history.push("/Informacao");
  }

  render() {
    const { tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <Container maxWidth="sm">
      <div className="list row">
        <div className="col-md-6">
          <h4></h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>
        </div>
        <div >
          {currentTutorial ? (
            <Tutorial
              tutorial={currentTutorial}
              refreshList={this.refreshList}
            />
          ) : (
            <div >

              <img   src="https://cdn.animaapp.com/projects/60874d0b3217b66d32be76c7/releases/60874dd2a7ec575273eb3984/img/limpurb3-1@2x.png"/>
              <br />
              <br />

              <h3 style={style.T1}>Local:<text style={style.T2}> Santuário São judas</text></h3>

              <br />

              <img  style = {style.Simg} src="https://cdn.animaapp.com/projects/60874d0b3217b66d32be76c7/releases/60874dd2a7ec575273eb3984/img/pilha-1@2x.png"/>

              <img  style = {style.Simg} src="https://cdn.animaapp.com/projects/60874d0b3217b66d32be76c7/releases/60874dd2a7ec575273eb3984/img/bateria-1@2x.png"/>

              <img style = {style.Simg} src="https://cdn.animaapp.com/projects/60874d0b3217b66d32be76c7/releases/60874dd2a7ec575273eb3984/img/celular-1@2x.png"/>


              <br />

              <br />

               <button style={style.B1} onClick={()=>this.callPage()}>Saiba Mais</button>
           
              
            </div>
          )}
        </div>
    
      </div>
      </Container>
    );
  }
}
