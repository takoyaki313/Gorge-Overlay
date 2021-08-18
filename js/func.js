        function AreaCheck(encounter){
          if(encounter.CurrentZoneName.indexOf('Crystal Tower Training Grounds')!== -1
          ||encounter.CurrentZoneName.indexOf('Lichenweed')!== -1
          ||encounter.CurrentZoneName.indexOf('Astragalos')!== -1
          ||encounter.CurrentZoneName.indexOf('Hidden Gorge')!== -1
          ||encounter.CurrentZoneName.indexOf('Wolves')!== -1
          ||encounter.CurrentZoneName == 'Middle La Noscea'
          ||encounter.CurrentZoneName.indexOf('Carteneau Flats:Bourderland Ruins')!== -1
          ||encounter.CurrentZoneName.indexOf('Seal Rock')!== -1
          ||encounter.CurrentZoneName.indexOf('the Fields of Glory (Shatter)')!== -1
          ||encounter.CurrentZoneName.indexOf('Onsal Hakair')!== -1){
            if(encounter.CurrentZoneName.indexOf('Carteneau Flats:Bourderland Ruins')!== -1
            ||encounter.CurrentZoneName.indexOf('Seal Rock')!== -1
            ||encounter.CurrentZoneName.indexOf('the Fields of Glory (Shatter)')!== -1
            ||encounter.CurrentZoneName.indexOf('Onsal Hakair')!== -1){
            pvpzone = 8;
            }
            pvpzone = 4;
          }
          else{
            pvpzone = 0;
          }
          return pvpzone;
        }

        function RoborImage(low){
          var data = '';
          var num = low.length/3;
          var che = '<img src="images/glow/che.png"  height="15px" hspace="1px"> ';
          var jas = '<img src="images/glow/jas.png"  height="15px" hspace="1px"> ';
          var opp = '<img src="images/glow/opp.png"  height="15px" hspace="1px"> ';

          //console.log(num);
          for(var c = 0;c < num; c++){
            if('che' == low.substr(0,3)){
              //console.log('che');
              data = data + che;
              //console.log(data);
              low = low.substr(3,low.length);
            }
            if('jas' == low.substr(0,3)){
              //console.log('jas');
              data = data + jas;
              //console.log(data);
              low = low.substr(3,low.length);
            }
            if('opp' == low.substr(0,3)){
              //console.log('opp');
              data = data + opp;
              //console.log(data);
              low = low.substr(3,low.length);
            }
          }
          //console.log('RoborImage →' + data);
          return data;
        }