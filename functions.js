document.addEventListener('DOMContentLoaded',()=>{
	var eResultElement=document.getElementById('result'),
		eButtonHolder=document.getElementById('button'),
		sOperand='',
		sFirstNumber='',
		sSecondNumber='',
		sResult='',
		bContinuesOperand=false,
		setterResult=function(){
			eResultElement.innerText=sFirstNumber+sOperand+sSecondNumber
		};
	eButtonHolder.querySelectorAll('button').forEach((button)=>{
		button.addEventListener('click',function(){
			var char=this.innerText;
			if(char=='C'){
				eResultElement.innerText='';
				sOperand='';
				sFirstNumber='';
				sSecondNumber='';
			}
			else if('+-*/'.includes(char)){
				if(sSecondNumber || !sFirstNumber) return;
				sOperand=char;
				bContinuesOperand=false;
				setterResult()
			}
			else if(char=='<'){
				if(sSecondNumber) sSecondNumber=sSecondNumber.slice(0,-1)
				else if(sOperand) sOperand='';
				else if(sFirstNumber) sFirstNumber=sFirstNumber.slice(0,-1)
				setterResult()
			}
			else if(char=='='){
				if(sFirstNumber==='' || sSecondNumber==='') return;
				var iFirstNumber=Number(sFirstNumber),
					iSecondNumber=Number(sSecondNumber)
				switch(sOperand){
					case '-':sResult=iFirstNumber-iSecondNumber;break;
					case '+':sResult=iFirstNumber+iSecondNumber;break;
					case '*':sResult=iFirstNumber*iSecondNumber;break;
					case '/':sResult=iFirstNumber/iSecondNumber;break;
				}
				eResultElement.innerText=sResult;
				sFirstNumber=sResult;
				bContinuesOperand=true;
				sSecondNumber='';
				sOperand=''
			}
			else{
				if(bContinuesOperand){
					sFirstNumber='';
					sOperand='';
					bContinuesOperand=false;
				}
				var sTemp=!sOperand ? sFirstNumber : sSecondNumber;
				if(char!=='.' || !sTemp.includes('.')){
					if(sTemp==='' && char==='.') char='0.';
					sTemp+=char;
				}
				if(!sOperand) sFirstNumber=sTemp;
				else sSecondNumber=sTemp;
				setterResult()
			}
		})
	})
})