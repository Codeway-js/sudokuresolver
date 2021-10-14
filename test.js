const sudres = require("./index.js")
let l1 = "125378946"
let l2= "378964215"
let l3= "496125837"
let l4= "269453178"
let l5= "8417bb653"
let l6= "5378bb492"
let l7= "912587364"
let l8= "653249781"
let l9= "784631529"
let r =[]
let l = [l1,l2,l3,l4,l5,l6,l7,l8,l9]
for(let i = 0; i < 9;i++){
    let ar= l[i].split('')
    ar.forEach((el,i)=>{
        if(!isNaN(parseInt(el))){
            ar[i]=parseInt(el)
        }
    })
    r.push(ar)
}
let grille = sudres(r,'b')
for(let t=0;t<9;t++){
    let str =""
    for(let b = 0;b<9;b++){
        str+=grille[t][b]
        if((b+1)%3==0&&b != 8){
            str+="|"
        }
        else{
            str+=" "
        }
    }
    console.log(str)
    if((t+1)%3==0&&t!=8){
        console.log("_____|_____|______")
    }
}
