function Area_PvE(e){
  var encounter = e.Encounter;
   var combatants = e.Combatant;
   var template = $('#source li');
   var container = $('#overlay').clone();

   container.html('');
   var header = template.clone();
   var rdps = parseFloat(encounter.encdps);

   // sanity check
   if (!isNaN(rdps) && rdps != Infinity) {
   rdps_max = Math.max(rdps_max, rdps);
   }

   if (encounter.encdps.length <= 7) {
   header.find('.dps').text(encounter.encdps);
   } else {
   header.find('.dps').text(encounter.ENCDPS);
   }
   header.find('.job-icon').html('<img src="https://takoyaki313.github.io/Gorge-Overlay/images/glow/empty.png" width="20px" height="20px" hspace="1px">')
   header.find('.name').text(encounter.title);
   header.find('.data3').text(encounter.duration);
   header.find('.bar').css('width', ((rdps / rdps_max) * 100) + '%');

   // set inactive
   if (!e.isActive) {
   rdps_max = 0;
   $('body').addClass('inactive');
   } else {
   $('body').removeClass('inactive');
   }

   container.append(header);
   //
   //ヘッダー部終了
   //
   var limit = Math.max(combatants.length, rows);
   var names = Object.keys(combatants).slice(0,rows-1);
   var maxdps = false;

   for (var i = 0;i < DispMax && i < names.length; i++) {
     var combatant = combatants[names[i]];
     var icon =0;
     var row = template.clone();

     if (!maxdps) {
     maxdps = parseFloat(combatant.encdps);
     }
     //クリティカルの表示用
     var crit;
     crit = combatant.crithits / combatant.hits;
     crit = Math.round(crit*100);
     if(crit == 'NaN'){
       crit = 0;
     }
     if (combatant.name == ACTName) {
     row.addClass('me');
     }
     //Limit Break
     if (combatant.name == 'Limit Break') {
     icon = 4;
     }
     if (combatant.encdps.length > 7) {
     combatant.encdps = combatant.encdps.substring(0,combatant.encdps.length-1);
     }
     row.find('.dps').text(combatant.encdps);
     if(icon == 0){
       row.find('.job-icon').html('<img src="https://takoyaki313.github.io/Gorge-Overlay/images/glow/' + combatant.Job.toLowerCase() + '.png"  width="20px" onerror="$(this).attr(\'src\', \'https://takoyaki313.github.io/Gorge-Overlay/images/error.png\');">');
     }
     else if(icon == 4){
         row.find('.job-icon').html('<img src="https://takoyaki313.github.io/Gorge-Overlay/images/glow/lib.png"  width="20px" onerror="$(this).attr(\'src\', \'https://takoyaki313.github.io/Gorge-Overlay/images/error.png\');">');
     }
     row.find('.name').text(combatant.name);
     row.find('.data1').text(crit + '%');
     row.find('.data2').text(combatant.DirectHitPct);
     row.find('.data3').text(combatant.CritDirectHitPct);
     row.find('.Robot').css('height',0);
     row.find('.bar').css('width', ((parseFloat(combatant.encdps) / maxdps) * 100) + '%');
     container.append(row);
   }
   $('#overlay').replaceWith(container);
}
