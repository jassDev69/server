/* eslint-disable react/no-direct-mutation-state */
import React from 'react';

// const result = [{qusname:'what is you firstname' , option:'jassi,jaskaran,karan,prabh' , correct:'jassi'},
//                 {qusname:'what is you lastname' , option:'singh,kaur,lake,wheat' , correct:'singh'}
//                 ]

export default  class Studentqus extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: [],
        len : 0 ,
        option : "" ,
        selectedoption : ''
      };
    }
         
  //calling the api to get favourite list data
    componentDidMount() {
      const url = 'https://backend-quiz.herokuapp.com/api/user/questions'
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              userData: result
            });
          },
        )   
    }
    nextQuestion (e)
    {    
      let insertData = {
        optionSelected : this.state.selectedoption,
        selectedID : e
        }
        const url = 'https://backend-quiz.herokuapp.com/api/user/submitQuestion'
        fetch(url,{
          method: 'POST',
          body: JSON.stringify(insertData),
          headers: {
              'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
          .then(
            (result) => {
             if(result.status ===200){
              this.forceUpdate()
              this.state.len+=1
              this.setState({
                selectedoption: ''
              });
             }
            },
          )
    }

    callnull()
    {
      this.setState({selectedoption:''})
    }

    calloptions()
    {
      this.state.option = this.state.userData[this.state.len].options.split(",")
    }
   
    handleOptionChange = (changeEvent) => {
      this.setState({
        selectedoption: changeEvent.target.value
      });
      console.log(this.state.selectedoption)
    }
  
    render() {
      // eslint-disable-next-line no-lone-blocks
      // {this.state.userData.map((item,i) => (this.state.option = item.options.split(",")))}
        return (     
        <div>
          <h1>Quiz</h1>
            {this.state.len < this.state.userData.length &&
                <div>
                    {this.calloptions()}
                    <h1>{this.state.userData[this.state.len].question_text}</h1>
                                                    
                    {this.state.option.map((opt,key) =>(
                      <div key={key}>
                        <input type="radio" name={opt} value={opt} onChange={this.handleOptionChange} checked={opt ===this.state.selectedoption} /> {opt}
                      </div>
                    ))}

                    {this.state.len < this.state.userData.length-1 ? <button className="btn" type="button" onClick={()=>{this.nextQuestion(this.state.userData[this.state.len].id)}}>next</button> : <button className="btn" type="button" onClick={()=>{this.nextQuestion()}}>finish</button>}
                    {this.state.selectedoption}
                </div>
            }
        </div>
        );
    }
  }
  