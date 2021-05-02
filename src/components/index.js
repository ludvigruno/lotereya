import '@babel/polyfill';
import React, {Component} from 'react';
//import ReactAudioPlayer from 'react-audio-player';

let intervalGo;
class WindowChat extends Component{
    constructor(props){
      super(props);
      this.rotateFunc = this.rotateFunc.bind(this);
      this.stop = this.stop.bind(this);
      this.phoneChange = this.phoneChange.bind(this);
      this.send = this.send.bind(this);
      this.openDisplay = this.openDisplay.bind(this);
      this.state={
          audio: false,
          rotate: 0,
          speed: [10, 50, 100, 500],
          lines: [
             {l:0, w:0}, 
             {l:36, w:0}, 
             {l:72, w:0},
             {l:108, w:0},
             {l:144, w:0}
            ],
          wordsRight: [
             {d:'Настил линолеума – 59 руб./м2',r:15, fontSize: '15px',position: 'absolute',top: '35px', right: '10px', width: '155px'}, 
             {d:'Скидка 10% – на комплексный ремонт квартиры.',r:21, fontSize: '15px',position: 'absolute',top: '28px', right: '12px', width: '191px'},
             {d:'Установка смесителя – В ПОДАРОК.',r:18, fontSize: '15px',position: 'absolute',top: '37px', right: '15px', width: '158px'},
             {d:'Установка розетки, выключателя (без штробления) – 149 руб.',r:20, fontSize: '15px',position: 'absolute',top: '22px', right: '17px', width: '155px'},
             {d:'Настил ламината на готовое основание – 109 руб./м2',r:14, fontSize: '15px',position: 'absolute',top: '27px', right: '6px', width: '160px'}
            ],
          wordsLeft: [
             {d:'Покраска потолка в 2 слоя – 59 руб./м2',r:-19, fontSize: '15px', width: '175px',position: 'absolute',top: '-96px', right: 0}, 
             {d:'Оклейка стен комбинированными обоями – 149 руб./м2',r:160, fontSize: '15px',position: 'absolute',top: '34px', left: '5px', width: '170px'},
             {d:'Оклейка стен обоями без подгонки рисунка – 99 руб./м2',r:158, fontSize: '15px',position: 'absolute',top: '31px', left: '13px', width: '164px'},
             {d:'Персональная скидка от директора',r:164, fontSize: '15px',position: 'absolute',top:"32px", left:"36px", width: '143px'},
             {d:'Укладка кафельной плитки на клей (прямая укладка, 20*30, 30*30) – 599 руб./м2',r:166, fontSize: '15px',position: 'absolute',top: '15px', left: '3px', width: '172px'},
            ],
          isOn:true,
          phone:'',
          placeholder: 'Номер телефона',
          input:true,
          borderInput: 'none',
          surprize: '',
          stopOf: true,
          endOpen: false,
          end: "Поздравляем!",
          end1: "Вы выиграли приз!",
          end2: "В ближайшее время мы с Вами свяжемся!",
          blur: 'blur(0px)'
          
      }
    }
    close(){
      document.querySelector("#fortunaMain").style.display = "none";
      this.setState({audio:false});
      clearInterval(intervalGo)
      if(this.state.endOpen == false){
         this.setState({rotate: 0, isOn: false, input:true, stopOf: false})
        }
      
    }
    openDisplay(){
      document.querySelector("#fortunaMain").style.display = "block";
    }
    send(object){
     //console.log(object);
     this.setState({endOn:true, stopOf:false, blur:'blur(4px)',surprize: object.surprize, endOpen: true})
     let data_body = "phone=" + object.phone +"&" +"surprize="+ object.surprize;

     let response = fetch('form2/fartunaSend.php',{
      method: 'POST',
      headers: {
         "content-type": "application/x-www-form-urlencoded"
      },
      body: data_body
  }).then((res)=>{
   if (res.status !== 200) {  
      return Promise.reject();
     }
     //setTimeout(()=>this.setState(prev=>prev.openDisplay = false),3000)
     setTimeout(()=>{
        document.querySelector("#fortunaMain").style.display = "none";
        this.setState({audio:false});
      },3000);
     
     return res.text()
  })
  //.then(i => console.log(i))
  .catch(() => console.log('ошибка fortuna')); 
    }
    phoneChange(e){
       //отражаеться в инруте
         if((e.target.value.split(/[a-z]/)[0].length) <= 11){
            if(/(\+7|7|8)/.test(e.target.value.split(/[a-z]/)[0]) == true){
               this.setState({
                  phone: e.target.value.split(/[a-z]/)[0],
                  borderInput: 'none'
               })
            }else{
               this.setState({
                  phone: '',
                  placeholder: '+7',
                  borderInput: '1px solid red'
               })
            }
          }
          /*console.log(new RegExp(/^(\+)?\d+[\d\(\)\ -]{7,14}\d$/).test(e.target.value.split(/[a-z]/)[0]))*/
    }
   rotateFunc(){
       //console.log(++this.state.rotate)
      
   }
   rotateFuncInterval(){
       for(let i =0;i<50;i++)
        intervalGo = setInterval(()=> this.setState(prev=>prev.isOn == true?prev.rotate < 360?prev.rotate++:prev.rotate = 0:false), 10)

   }
   go(){
      if(this.state.phone.length == 11){
            this.setState({isOn:true,borderInput: 'none', input:false,stopOf: true})
            this.rotateFuncInterval();
            this.setState({audio:true})
      }else if(this.state.phone.length < 11){
         this.setState({borderInput: '1px solid red'})
      }
      
     //this.rotateFuncInterval()
     //this.setState({isOn:true})
   }
   stop(){
    window.clearInterval(intervalGo)
    this.setState({isOn:false})
    if(this.state.rotate >= 0 && this.state.rotate < 36){
      this.send({phone: this.state.phone, surprize:'Покраска потолка в 2 слоя – 59 руб./м2'})
     }else if(this.state.rotate > 36 && this.state.rotate < 72){
      this.send({phone: this.state.phone, surprize:'Укладка кафельной плитки на клей (прямая укладка, 20*30, 30*30) – 599 руб./м2'})
     }else if(this.state.rotate > 72 && this.state.rotate < 108){
      this.send({phone: this.state.phone, surprize:'Персональная скидка от директора'})
     }else if(this.state.rotate > 108 && this.state.rotate < 144){
      this.send({phone: this.state.phone, surprize:'Оклейка стен обоями без подгонки рисунка – 99 руб./м2'})
     }else if(this.state.rotate > 144 && this.state.rotate < 180){
      this.send({phone: this.state.phone, surprize:'Оклейка стен комбинированными обоями – 149 руб./м2'})
     }else if(this.state.rotate > 180 && this.state.rotate < 216){
      this.send({phone: this.state.phone, surprize:'Настил ламината на готовое основание – 109 руб./м2'})
     }else if(this.state.rotate > 216 && this.state.rotate < 252){
      this.send({phone: this.state.phone, surprize:'Установка розетки, выключателя (без штробления) – 149 руб.'})
     }else if(this.state.rotate > 252 && this.state.rotate < 288){
      this.send({phone: this.state.phone, surprize:'Установка смесителя – В ПОДАРОК.'})
     }else if(this.state.rotate > 288 && this.state.rotate < 324){
      this.send({phone: this.state.phone, surprize:'Скидка 10% – на комплексный ремонт квартиры.'})
     }else if(this.state.rotate > 324 && this.state.rotate < 360){
      this.send({phone: this.state.phone, surprize:'Настил линолеума – 59 руб./м2'})
     }else{
        this.setState({endOn:false, stopOf:true,input:true, blur:'blur(0px)',surprize:'Попробуйте еще раз!'})
     }
 //0,30,60,90,120,150,180,210,240,270,300,330,360
 //  12 6  4   3  2,4  2  1,7 1,5 1,3 1,2  1,09 1
 //console.log(this.state.rotate)
   }
    render(){
        return(
           <div>
<div id="fortunaMain">
            <div style={{display: 'flex', justifyContent: 'center', height:' 100%',position: 'fixed',width: '100%',top: 0,background: '#00000096'}}>
               <p style={{height: 'max-content',position: 'fixed',right: 0,color: 'white',margin: '23px 0 0px 0',fontSize: '50px',fontWeight: 'bold',padding: '0px 41px 0 0px', cursor:'pointer'}} onClick={()=>this.close()}>&times;</p>
               {
                  this.state.endOn == true?
                  <div style={{position: 'absolute', top: 0, zIndex: 15,    marginTop: '6em', padding: '22px',borderRadius: '21px',background: 'aliceblue'}}>
                     <p style={{fontWeight: 'bold', padding: '16px', fontStyle: 'italic', fontSize: '38px', lineHeight: '44px',color: '#953333', textAlign: 'center'}}>{this.state.end}<br/>{this.state.end1}</p>
                     <p style={{fontWeight: 'bold', fontStyle: 'italic', fontSize: '31px',color: 'rgb(22 46 215)', textAlign: 'center'}}>{this.state.surprize}</p>
                     <p style={{fontWeight: 'bold', fontStyle: 'italic', fontSize: 'larger',color: '#953333', textAlign: 'center'}}>{this.state.end2}</p>
                     </div>
                  :false
               }
                <div style={{display:'flex',justifyContent: 'center',flexDirection: 'column',margin: '0 auto'}}>
                <div style={{position:'relative',width: '600px',borderRadius: '50%', background: '#ffc577',height: '600px',display: 'flex',justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 11px 0', margin: '0 auto',filter: this.state.blur,    boxShadow:' 0px 0px 25px 14px #f0a806'}}>
                <div className="text-center" style={{width: 'max-content'}}>
                    <div style={{width: "600px", height: '600px', borderRadius: '50%', position: 'relative', display: 'flex', alignItems: 'center',transform: `rotate(${this.state.rotate}deg)`}}>
                        {
                            this.state.lines.map((item,key)=>{
                               return (
<div key={key} style={{background: 'rgb(246 122 6)',boxShadow: '0px 0px 12px 10px rgb(246 122 6)',transform: `rotate(${item.l}deg)`,position:'absolute',width: 'inherit',height:'3px'}}>
                               <p style={{transform: `rotate(${this.state.wordsRight[key].r}deg)`,width: "max-content",fontSize:this.state.wordsRight[key].fontSize, width:this.state.wordsRight[key].width,position:this.state.wordsRight[key].position,top:this.state.wordsRight[key].top, right:this.state.wordsRight[key].right, left:this.state.wordsRight[key].left, fontWeight: 'bold'}}>{this.state.wordsRight[key].d}</p>
                               <p style={{transform: `rotate(${this.state.wordsLeft[key].r}deg)`,width: "max-content", fontSize:this.state.wordsLeft[key].fontSize, width:this.state.wordsLeft[key].width,position:this.state.wordsLeft[key].position,top:this.state.wordsLeft[key].top, right:this.state.wordsLeft[key].right, left:this.state.wordsLeft[key].left,fontWeight: 'bold'}}>{this.state.wordsLeft[key].d}</p>
                               </div>
                               )
                               
                            })
                        }
                    </div>
                </div>
                <div style={{position:'absolute', right:-9, top:'44%',height: '46px',width: '43px',background: 'red',clipPath: 'polygon(105.93% 36.2%, 83.29% 14.59%, 0px 18px, 86.43% 70.59%)'}}></div>
                </div>
                <div style={{width: 'max-content', margin: '12px auto',height: '30px'}}>
                   <div style={{width: 'max-content'}}>
                      {
                        this.state.input == true?
                     <div style={{border:'1px solid #a49393',display: 'flex'}}>
                        <input style={{border: this.state.borderInput, outline: 'none',verticalAlign: 'middle',width: '117px'}} name="phone" type="tel" value={this.state.phone}  onChange={this.phoneChange} placeholder={this.state.placeholder} />
                        <button onClick={()=>this.go()} style={{borderRadius: '5px', color: 'white',background: 'red', fontStyle: 'oblique'}}>Крутить<br/>барабан</button>
                     </div>
                        :
                        this.state.stopOf == true?
                        <button onClick={()=>this.stop()} style={{borderRadius: '5px', color: 'white',background: 'red', fontStyle: 'oblique'}}>Стоп</button>
                        :
                        false
                         }
                   </div>
                </div>
                </div>
                </div>
                </div>
                {
                   this.state.audio?
                  <audio autoPlay>
                     <source src="volchok.mp3" type="audio/mpeg" />
                  </audio>
                   :false
                }
                </div>
        )
    }
}

export default WindowChat;

// получить числа из строки
/*
var num = parseInt("a4r t 4r43 43a b345b 123 cc gaeg4".replace(/\D+/g,""));
2
alert(num);
3
alert(typeof num);

*/

/*
                <ReactAudioPlayer
  src="volchok.mp3"
  autoPlay
  controls
/>
*/